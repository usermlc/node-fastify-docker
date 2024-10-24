const fastify = require('fastify')({ logger: true });

const storage = []; // Array to hold resource data
let idCounter = 1; // Counter for assigning unique IDs

// Schema for validating resource data
const schema = {
    type: 'object',
    required: ['name', 'description'], // Fields that are mandatory
    properties: {
        name: { type: 'string' }, // Name field must be a string
        description: { type: 'string' }, // Description field must be a string
    },
};

// GET /api/resources - Retrieve all resources
fastify.get('/api/resources', async (request, reply) => {
    return storage; // Return the list of all resources
});

// GET /api/resources/:id - Retrieve a single resource by ID
fastify.get('/api/resources/:id', async (request, reply) => {
    const resource = storage.find(item => item.id === parseInt(request.params.id)); // Find resource by ID
    if (!resource) {
        return reply.status(404).send({ message: 'Resource not found' }); // Return 404 if not found
    }
    return resource; // Return the found resource
});

// POST /api/resources - Add a new resource
fastify.post('/api/resources', {
    schema: {
        body: schema, // Validate incoming request body against schema
    },
}, async (request, reply) => {
    const newItem = { id: idCounter++, ...request.body }; // Create a new resource with unique ID
    storage.push(newItem); // Add the new resource to the array
    return reply.status(201).send(newItem); // Return 201 status and the new resource
});

// PUT /api/resources/:id - Update an existing resource
fastify.put('/api/resources/:id', {
    schema: {
        body: schema, // Validate incoming request body against schema
    },
}, async (request, reply) => {
    const index = storage.findIndex(item => item.id === parseInt(request.params.id)); // Find index of resource by ID
    if (index === -1) {
        return reply.status(404).send({ message: 'Resource not found' }); // Return 404 if not found
    }
    storage[index] = { id: parseInt(request.params.id), ...request.body }; // Update resource at the found index
    return storage[index]; // Return updated resource
});

// DELETE /api/resources/:id - Delete a resource by ID
fastify.delete('/api/resources/:id', async (request, reply) => {
    const index = storage.findIndex(item => item.id === parseInt(request.params.id)); // Find index of resource by ID
    if (index === -1) {
        return reply.status(404).send({ message: 'Resource not found' }); // Return 404 if not found
    }
    storage.splice(index, 1); // Remove resource from the array
    return reply.status(204).send(); // Return 204 status with no content
});

// Start the Fastify server
const startServer = async () => {
    try {
        await fastify.listen(3000, '0.0.0.0'); // Start server on port 3000
        fastify.log.info('Server listening on http://0.0.0.0:3000'); // Log server start
    } catch (err) {
        fastify.log.error(err); // Log error if server fails to start
        process.exit(1); // Exit process on error
    }
};

startServer();
