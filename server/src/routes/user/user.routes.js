import express from "express";
import {
  getUsersByNameReg,
  updateUserData,
  createUser,
  deleteUser,
} from "../../controllers/user.controller.js";

const routes = express.Router();

routes.get("/get/name/:name", getUsersByNameReg);

routes.post("/create", createUser);

routes.put("/update/:uid", updateUserData);

routes.delete("/delete/:uid", deleteUser);


export default routes;
