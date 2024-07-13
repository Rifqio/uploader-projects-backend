import { Hono } from "hono";
import UploadController from '../controller/UploadController';

const app = new Hono();

app.get('/', UploadController.GetUploadedFile);
app.post('/', UploadController.UploadFile);

export default app;