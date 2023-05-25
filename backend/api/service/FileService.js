const { request, response } = require("express");
const File = require("../model/FileSchema");
const User = require("../model/UserSchema");
const FileDTO = require("../dtos/FileDTO");

class FileService {
  // GETS

  async get_files(req = request, res = response) {
    try {
      let files = await File.find();
      res.json({ msg: "Files", body: files });
    } catch (err) {
      res.json({
        msg: "Error",
        body: "Ocurrio un error al obtener los archivos",
      });
    }
  }

  async get_user_files(req = request, res = response) {
    try {
      let { id } = req.params;

      let user = await User.findOne({ _id: id });
      if (!user)
        return res.json({
          msg: "No Encontrado",
          body: "El usuario no encontro",
        });

      res.json({ msg: "Archivos", body: user.list_files });
    } catch (err) {
      res.json({
        msg: "Error",
        body: "Ocurrio un error al obtener los archivos",
      });
    }
  }

  // POSTS
  async upload_file(req = request, res = response) {
    try {
      let { id } = req.params;

      let user = await User.findOne({ _id: id });
      if (!user)
        return res.json({
          msg: "No Encontrado",
          body: "El usuario no se encontro",
        });

      if (req.file) {
        const file = req.file;
        let file_dto = this.validate_file(req.body);
        if (file_dto.message) return res.json({ msg: file_dto.message });

        let file_to_upload = new File({
          title: file_dto.title,
          file: file.originalname,
          path: file.path,
        });

        let start = Date.now();
        await Promise.all([
          await file_to_upload.save(),
          await user.updateOne({
            $push: { list_files: file_to_upload["_id"] },
          }),
        ]);
        let end = Date.now();
        const durationMillis = end - start;
        const durationMicros = durationMillis * 1000;
        const durationSeconds = durationMillis / 1000;

        res.json({
          msg: "Archivo Subido",
          body: "El archivo se subio correctamente",
          response_time: `milisegundos: ${durationMillis} - microsegundos: ${durationMicros} - segundos: ${durationSeconds}
          `,
        });
      } else {
        return res.json({
          msg: "Archivo Incorrecto",
          body: "El archivo seleccionado es incorrecto, no es un PDF",
        });
      }
    } catch (err) {
      res.json({
        msg: "Error",
        body: "Ocurrio un error al intentar subir el archivo",
      });
    }
  }

  async remove_file(req = request, res = response) {
    try {
      let { user_id, file_id } = req.body;

      let user = await User.findOne({ _id: user_id });

      if (!user)
        return res.json({
          msg: "No Encontrado",
          body: "No se encontro el usuario",
        });
      let file = await File.findOne({ _id: file_id });

      if (!file)
        return res.json({
          msg: "No Encontrado",
          body: "No se encontro el archivo",
        });

      await Promise.all([
        user.updateOne({ $pull: { list_files: file_id } }),
        file.deleteOne(),
      ]);
      res.json({
        msg: "Eliminado Correctamente",
        body: "El archivo se elimino correctamente",
      });
    } catch (err) {
      res.json({
        msg: "Error",
        body: "Ocurrio un error al intentar eliminar el archivo",
      });
    }
  }

  validate_file(data) {
    let file = FileDTO.validate(data);
    if (file.error) return file.error.details[0];
    return file.value;
  }
}

module.exports = new FileService();
