const { request, response } = require("express");
const file_service = require("../service/FileService");

class FileController {
  get_files(req = request, res = response) {
    return file_service.get_files(req, res);
  }

  get_user_files(req = request, res = response) {
    return file_service.get_user_files(req, res);
  }

  upload_file(req = request, res = response) {
    return file_service.upload_file(req, res);
  }

  remove_file(req = request, res = response) {
    return file_service.remove_file(req, res);
  }
}

module.exports = FileController;
