import { Context, Hono, Next } from "hono";
import UploadRoutes from "@routes/UploadRoutes";
import AuthRoutes from "@routes/AuthRoutes";
import { VerifyAuth } from "@middleware/AuthVerify";

const app = new Hono();

app.route('/auth', AuthRoutes)

app.use(VerifyAuth as unknown as (ctx: Context, next: Next) => Promise<void>)
app.route('/upload', UploadRoutes);

export default app;