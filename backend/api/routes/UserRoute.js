const { Router } = require("express");
const UserController = require("../controller/UserController");
const { check, body } = require("express-validator");
const { validate_validations } = require("../middlewares/validate_validations");
const { verify_user } = require("../middlewares/exists_user");

class UserRoute {
  constructor() {
    this.router = Router();
    this.user_ctrl = new UserController();

    this.routes();
  }

  routes() {
    // GETS
    this.router.get("/", this.user_ctrl.get_all_users);
    this.router.get(
      "/:id",
      [
        check("id")
          .isMongoId()
          .withMessage("El 'id' ingresado no corresponde a un 'mongo id'"),
        validate_validations,
        verify_user,
      ],
      this.user_ctrl.get_user
    );

    // POSTS
    this.router.post(
      "/",
      [
        body("email").isEmail().withMessage("El 'email' es incorrecto"),
        validate_validations,
      ],
      this.user_ctrl.create_user
    );

    // DELETES
    this.router.delete(
      "/:id",
      [
        check("id")
          .isMongoId()
          .withMessage("El 'id' ingresado no corresponde a un 'mongo id'"),
        validate_validations,
        verify_user,
      ],
      this.user_ctrl.remove_user
    );

    // PUTS
    this.router.put(
      "/:id",
      [
        check("id")
          .isMongoId()
          .withMessage("El 'id' ingresado no corresponde a un 'mongo id'"),
        body("email")
          .optional()
          .isEmail()
          .withMessage("El email ingresado es incorrecto, Verifiquelo"),
        validate_validations,
        verify_user,
      ],
      this.user_ctrl.update_user
    );
  }
}

module.exports = new UserRoute().router;
