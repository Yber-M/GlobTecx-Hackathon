const User = require("../model/UserSchema");
const Response = require("../model/Response");

const verify_user = async (req, res, next) => {
  let { id } = req.params;
  let user = await User.findOne({ _id: id });
  if (!user)
    return new Response(res).reply(
      "No Encontrado",
      "El usuario buscado no existe"
    );
  req.user = user;
  next();
};

module.exports = {
  verify_user,
};
