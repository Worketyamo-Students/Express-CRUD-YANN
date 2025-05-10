import { Router } from "express";
import controller from "../controllers/controller.js";

const route = Router();


route.get("/", controller.getdog);
route.post("/newdog", controller.newdog);
route.put("/updatedog/:id", controller.updatedog);
route.delete("/deletedog/:id", controller.deletedog);

export default route