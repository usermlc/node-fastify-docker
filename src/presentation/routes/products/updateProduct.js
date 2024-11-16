const {
  UpdateProductAction,
} = require('../../../app/actions/product/UpdateProduct');

/**
 *
 * @param {import('fastify').FastifyInstance} fastify
 * @returns {import('fastify').RouteOptions}
 */
module.exports.updateProduct = (fastify) => ({
  url: '/products/:id',
  method: 'PUT',
  preValidation: fastify.auth([
    fastify.authPipeFactory(),
    fastify.authGuardFactory(),
  ]),
  handler: async (request, reply) => {
    // @ts-ignore - This is a valid reference
    const { id } = request.params;

    const updateData = request.body;

    const updateProduct = new UpdateProductAction(request.server.domainContext);

    const product = await updateProduct.execute(id, updateData);

    return reply.code(200).send(product);
  },
  schema: {
    tags: ['Products'],
    headers: {
      type: 'object',
      properties: {
        'x-auth-token': {
          type: 'string',
          description: 'Session access token',
        },
      },
      required: ['x-auth-token'],
    },
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'string' },
      },
    },
    body: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        price: { type: 'number', minimum: 0 },
        releaseDate: { type: 'string', format: 'date-time' },
      },
      required: ['name', 'description', 'price', 'releaseDate'],
      additionalProperties: false, // Prevents extra properties
    },
    response: {
      200: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' }, // UUID for the ID
          name: { type: 'string' },
          description: { type: 'string' },
          price: { type: 'number', minimum: 0 },
          releaseDate: { type: 'string', format: 'date-time' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
        required: [
          'id',
          'name',
          'description',
          'price',
          'releaseDate',
          'createdAt',
          'updatedAt',
        ],
      },
    },
  },
});
