const { fetchSingleResource } = require("./getResource");
const { fetchAllResources } = require("./getResources");
const { addResource } = require("./createResource");
const { modifyResource } = require("./updateResource");
const { removeResource } = require("./deleteResource");

const { purchaseResources } = require("./buyResource");

module.exports.initializeResourceRoutes = async function (fastify, options) {
    fastify.route(addResource);
    fastify.route(fetchAllResources);
    fastify.route(fetchSingleResource);
    fastify.route(purchaseResources);
    fastify.route(modifyResource);
    fastify.route(removeResource);
};
