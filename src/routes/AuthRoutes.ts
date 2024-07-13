import { Hono } from "hono";
import AuthController from "../controller/AuthController";
import { ResponseContext } from "@interface/ResponseContext";
const app = new Hono();

app.post('/register', (ctx) => AuthController.Register(ctx as ResponseContext));
app.post('/login', (ctx) => AuthController.Login(ctx as ResponseContext));

export default app;