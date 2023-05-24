const { request, response } = require("express");
const File = require("../model/FileSchema");
const fs = require("fs");
const User = require("../model/UserSchema");
const path = require("path");
const FileDTO = require("../dtos/FileDTO");

class FileService {
  async upload_file(req = request, res = response) {
    try {
      let { id } = req.params;

      let user = await User.findOne({ _id: id });
      if (!user)
        return res.json({
          msg: "No Encontrado",
          body: "El usuario no se encontro",
        });

      if (req.files && req.files.file) {
        const file = req.files.file;
        const ext = path.extname(file.name);
        if (ext === ".pdf") {
          let upload_path = path.join(__dirname, "../upload_files/");

          if (!fs.existsSync(upload_path)) fs.mkdirSync(upload_path);
          let new_file_name = `${Date.now()}-${file.name}`;
          upload_path += new_file_name;

          file.mv(upload_path, async (err) => {
            if (err)
              return res.json({
                msg: "Error de Guardado",
                body: `El archvio no se pudo subir correctamente: ${err}`,
              });

            let file_dto = this.validate_file(req.body);
            if (file_dto.message) return res.json({ msg: file_dto.message });

            let file_to_upload = new File({
              title: file_dto.title,
              file: new_file_name,
              path: upload_path,
            });

            await Promise.all([
              await file_to_upload.save(),
              await user.updateOne({
                $push: { list_files: file_to_upload["_id"] },
              }),
            ]);

            res.json({
              msg: "Archivo Subido",
              body: "El archivo se subio correctamente",
            });
          });
        } else {
          return res.json({
            msg: "Archivo Incorrecto",
            body: "El archivo seleccionado es incorrecto, no es un PDF",
          });
        }
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
