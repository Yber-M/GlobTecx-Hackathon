const UserDTO = require("../dtos/UserDTO");
const User = require("../model/UserSchema");
const Account = require("../model/AccountSchema");
const { request, response } = require("express");

class UserService {
  async get_all_users(req = request, res = response) {
    try {
      let users = await User.find({});
      res.json({ msg: "users", body: users });
    } catch (err) {
      res.json({ msg: "error", body: "No se pudo obtener los usuarios" });
    }
  }

  async get_user(req = request, res = response) {
    try {
      let { id } = req.params;
      let user = await User.findOne({ _id: id });
      if (!user)
        return res.json({
          msg: "No encontrado",
          body: "El usuario no se pudo encontrar",
        });
      else return res.json({ msg: "user", body: user });
    } catch (err) {
      res.json({ msg: "error", body: "No se pudo obtener al usuario" });
    }
  }

  async create_user(req = request, res = response) {
    try {
      const user = UserDTO.validate(req.body);

      if (user.error)
        return res.json({
          msg: "Valor Incorrecto",
          body: user.error.details.map((detail) => detail.message),
        });

      let { email, password } = user.value;

      let exists_email = await this.verify_email(email);
      if (exists_email)
        return res.json({
          msg: "Email Incorrecto",
          body: "El email ya se encuentra en uso",
        });

      let new_account = Account({ email, password });
      let new_user = User({ ...user.value, account: new_account["_id"] });

      await Promise.all([new_account.save(), new_user.save()]);
      res.json({ msg: "Usuario Creado", body: new_user });
    } catch (err) {
      console.log(err);
      res.json({ msg: "error", body: "No se pudo crear un usuario" });
    }
  }

  async update_user(req, res) {
    try {
      let { id } = req.params;
      let new_data = UserDTO.validate(req.body);
      let user = await User.findOne({ _id: id });

      if (new_data.error)
        return res.json({
          msg: "Valor Incorrecto",
          body: user.errors.details.map((detail) => detail.message),
        });

      if (!user)
        return res.json({
          msg: "No Encontrado",
          body: "El usuario no fue encontrado",
        });

      let user_data = { ...user["_doc"], ...new_data.value };
      await user.updateOne(user_data, { new: true });
      res.json({ msg: "Actualizado", body: user_data });
    } catch (err) {
      res.json({ msg: "error", body: "No se pudo actualizar el usuario" });
    }
  }

  async remove_user(req = request, res = response) {
    try {
      let { id } = req.params;
      let user = await User.findOne({ _id: id });

      if (!user)
        return res.json({
          msg: "No Encontrado",
          body: "El usuario no se encontro",
        });

      let account = await Account.findOne({ _id: user.account._id });

      await Promise.all([await user.deleteOne(), await account.deleteOne()]);
      res.json({ msg: "Eliminado", body: "Usuario eliminado correctamente" });
    } catch (err) {
      res.json({ msg: "error", body: "No se pudo eliminar el usuario" });
    }
  }

  async verify_email(email) {
    try {
      let exists_email = await Account.findOne({ email });
      return exists_email;
    } catch (err) {
      return err;
    }
  }
}

module.exports = new UserService();
