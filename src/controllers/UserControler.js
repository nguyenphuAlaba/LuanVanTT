import db from "../models/index";
import UserService from "../Services/UserService";

let handleGetAllUser = async (request, response) => {
  try {
    let Customer = await UserService.getAllUser();
    return response.status(200).json(Customer);
  } catch (error) {
    return response.status(500).json(error);
  }
};
let handleGetById = async (request, response) => {
  try {
    let id = await request.params.id;
    console.log("id: " + id);
    let customer = await UserService.getUserById(id);
    return response.status(200).json({
      errCode: 0,
      errMessage: "Customer has found",
      customer,
    });
  } catch (error) {
    return response.status(500).json(error);
  }
};
let handleSignUp = async (request, response) => {
  try {
    console.log("request.body: ", request.body);
    let message = await UserService.handleSignUpUser(request.body);
    return response.status(200).json(message);
  } catch (error) {
    response.status(500).json(error.message);
  }
};

let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  if (!email || !password) {
    return res.status(400).json({
      errorCode: 1,
      message: "Missing inputs parameter!",
    });
  }
  let userdata = await UserService.handeLogin(email, password);

  return res.status(200).json({
    errorCode: userdata.errorCode,
    errMessage: userdata.errMessage,
    data: userdata.user ? userdata.user : {},
  });
};
let handleUpdateUser = async (request, response) => {
  try {
    let userId = await UserService.updateUser(request.body);
    response.status(200).json(userId);
  } catch (error) {
    response.status(error);
  }
};
module.exports = {
  handleGetAllUser,
  handleGetById,
  handleSignUp,
  handleLogin,
  handleUpdateUser,
};
