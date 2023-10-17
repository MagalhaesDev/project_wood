import cors from '@fastify/cors';
import fastify from 'fastify';
import { activesRoutes } from './routes/active';
import { registerRoutes } from './routes/register';

const app = fastify()

app.register(cors, {
  origin: true,
});

app.register(activesRoutes)
app.register(registerRoutes)

app
  .listen({
    port: 3000,
  })
  .then(() => {
    console.log('HTTP server running on http://localhost:3000')
  })