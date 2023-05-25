const { Router } = require("express");
const FileController = require("../controller/FileController");
const { validate_validations } = require("../middlewares/validate_validations");
const { body } = require("express-validator");
const { upload } = require("../middlewares/multer_configuration");

class FileRoute {
  constructor() {
    this.router = Router();
    this.file_ctrl = new FileController();
    this.routes();
  }

  routes() {
    // GETS
    this.router.get("/", this.file_ctrl.get_files);
    this.router.get("/:id", this.file_ctrl.get_user_files);

    // POSTS
    this.router.post("/:id", upload.single("file"), this.file_ctrl.upload_file);

    // DELETE
    this.router.delete(
      "/",
      [
        body("user_id")
          .isMongoId()
          .withMessage("El 'id' ingresado no corresponde a un 'mongo id'"),
        body("file_id")
          .isMongoId()
          .withMessage("El 'id' ingresado no corresponde a un 'mongo id'"),
        validate_validations,
      ],
      this.file_ctrl.remove_file
    );
  }
}

module.exports = new FileRoute().router;
