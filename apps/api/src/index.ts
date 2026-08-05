import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { auth } from "db";
import { cors } from 'hono/cors';
import { sessionReturn, sessionValidation } from './controllers/auth-controller.js';
import { driveRouter } from './routers/drive-router.js';

const app = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
}>();

app.use('/*',
  cors({
    origin: [process.env.WEB_URL!, process.env.API_URL!],
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true
  }));

app.use("/*", sessionValidation);

app.on(["POST", "GET"], "/api/auth/*", (c) => {
  return auth.handler(c.req.raw);
});

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

// Request to return valid session
app.get('/api/auth-user', sessionValidation, sessionReturn);

// Fallback route
app.get('/*', (c) => {
  return c.text("404 - Cannot access requested resource");
});

// Define router for all drive-related routes
app.route('/drive', driveRouter);

serve({
  fetch: app.fetch,
  port: Number(process.env.API_PORT)
}, (info) => {
  console.log(`Server is running on ${process.env.API_URL}`);
});
