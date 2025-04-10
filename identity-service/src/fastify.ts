import { FastifyAdapter } from '@nestjs/platform-fastify';
import fastifyMultipart from 'fastify-multipart';

import opts from './uploads/fastify-multipart.opts';

const fastifyAdapter = new FastifyAdapter({
  // http2: true,
  logger: true,
});

fastifyAdapter.register(fastifyMultipart, opts);

export { fastifyAdapter };
