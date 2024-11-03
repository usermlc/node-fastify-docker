const { receiptRepository } = require("./../../repositories/receipt.repo");

module.exports = {
    /**
     * @type {import('fastify').RouteOptions}
     */
    getRecipe: {
        url: "/receipts/:id",
        method: "GET",
        schema: {
            params: {
                type: "object",
                properties: {
                    id: { type: "string" },
                },
                required: ["id"],
            },
        },
        handler: async (request, reply) => {
            try {
                // @ts-ignore - We know that the params is defined
                const targetId = request.params.id;

                const found = await receiptRepository.findById(targetId);

                if (!found) {
                    return reply.code(404).send({
                        message: "Resource not found",
                    });
                }

                return reply.code(200).send(found);
            } catch (error) {
                request.log.error(error);
                return reply.code(500).send({ error: "Failed to fetch resource" });
            }
        },
    },
};
