import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { auth } from "db";
import { cors } from 'hono/cors';
import { sessionValidation } from './controllers/auth-controller.js';

const app = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
}>();

app.use('/*',
  cors({
    origin: ['http://localhost:5173', 'http://localhost:8080'],
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

serve({
  fetch: app.fetch,
  port: 8080
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`);
});
