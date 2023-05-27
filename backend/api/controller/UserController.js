const { request, response } = require("express");

const user_service = require("../service/UserService");

class UserController {
  get_all_users(req = request, res = response) {
    return user_service.get_all_users(req, res);
  }

  get_user(req = request, res = response) {
    return user_service.get_user(req, res);
  }

  get_user_by_username(req = request, res = response) {
    return user_service.get_user_by_username(req, res);
  }

  create_user(req = request, res = response) {
    return user_service.create_user(req, res);
  }

  update_user(req = request, res = response) {
    return user_service.update_user(req, res);
  }

  remove_user(req = request, res = response) {
    return user_service.remove_user(req, res);
  }
}

module.exports = UserController;
