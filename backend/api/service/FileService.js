const { request, response } = require("express");
const File = require("../model/FileSchema");
const User = require("../model/UserSchema");
const FileDTO = require("../dtos/FileDTO");
const path = require("path");
const Response = require("../model/Response");

class FileService {
  // GETS
  async get_files(req = request, res = response) {
    try {
      let files = await File.find();
      new Response(res).reply("Archivos", files);
    } catch (err) {
      new Response(res).reply(
        "Error",
        "Ocurrio un error al obtener los archivos"
      );
    }
  }

  async get_user_files(req = request, res = response) {
    try {
      let user = req.user;
      new Response(res, "Archivos", user.list_files).reply();
    } catch (err) {
      new Response(res).reply(
        "Error",
        "Ocurrio un error al obtener los archivos"
      );
    }
  }

  // POSTS
  async upload_file(req = request, res = response) {
    try {
      let file = req.body.body;
      let upload_path = path.join(__dirname, "../upload_files/");

      let file_to_upload = new File({
        title: file.title,
        file: file.file,
        path: `${upload_path}${file.file}`,
      });

      await file_to_upload.save();

      res.json({
        msg: "Archivo Subido",
        body: file_to_upload,
      });
    } catch (err) {
      return new Response(res).reply(
        "Error",
        `Ocurrio un error al intentar subir el archivo: ${err}`
      );
    }
  }

  // DELETEDS
  async remove_file(req = request, res = response) {
    try {
      let { file_id } = req.body;
      let user = req.user;

      if (!user)
        return new Response(res).reply(
          "No Encontrado",
          "No se encontro el usuario"
        );

      let file = await File.findOne({ _id: file_id });

      if (!file)
        return new Response(res).reply(
          "No Encontrado",
          "No se encontro el archivo"
        );

      await Promise.all([
        user.updateOne({ $pull: { list_files: file_id } }),
        file.deleteOne(),
      ]);
      new Response(res).reply(
        "Eliminado correctamente",
        "El archivo se elimino correctamente"
      );
    } catch (err) {
      new Response(res).reply(
        "Error",
        "Ocurrio un error al intentar eliminar el archivo"
      );
    }
  }

  // VALIDATES
  validate_file(data) {
    let file = FileDTO.validate(data);
    if (file.error) return file.error.details[0];
    return file.value;
  }
}

module.exports = new FileService();
