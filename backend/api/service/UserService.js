const UserDTO = require("../dtos/UserDTO");
const User = require("../model/UserSchema");
const Account = require("../model/AccountSchema");
const { request, response } = require("express");
const Response = require("../model/Response");

class UserService {
  // GETS
  async get_all_users(req = request, res = response) {
    try {
      let users = await User.find({});
      new Response(res).reply("Users", users);
    } catch (err) {
      new Response(res).reply("Error", "No se pudo obtener los usuarios");
    }
  }

  async get_user(req = request, res = response) {
    try {
      let user = req.user;
      return res.json({ msg: "user", body: user });
    } catch (err) {
      new Response(res).reply("Error", "No se pudo obtener al usuario");
    }
  }

  // POSTS
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
      new Response(res).reply("Usuario Creado", new_user);
    } catch (err) {
      new Response(res).reply("Error", "No se pudo crear un usuario");
    }
  }

  // PUTS
  async update_user(req, res) {
    try {
      let new_data = UserDTO.validate(req.body);
      let user = req.user;

      if (new_data.error)
        return new Response(res).reply(
          "Valor Incorrecto",
          new_data.error.details.map((detail) => detail.message)
        );

      let user_data = { ...user["_doc"], ...new_data.value };
      await user.updateOne(user_data, { new: true });
      res.json({ msg: "Actualizado", body: user_data });
    } catch (err) {
      new Response(res).reply("Error", "No se pudo actualizar el usuario");
    }
  }

  async remove_user(req = request, res = response) {
    try {
      let user = req.user;
      let account = await Account.findOne({ _id: user.account._id });
      await Promise.all([await user.deleteOne(), await account.deleteOne()]);
      new Response(res).reply("Eliminado", "Usuario eliminado correctamente");
    } catch (err) {
      new Response(res).reply("Error", "No se pudo eliminar el usuario");
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
