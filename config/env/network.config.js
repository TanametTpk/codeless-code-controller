const application_host = process.env.APP_HOST || "http://localhost:9001";
const template_host = process.env.TEMPLATE_HOST || "http://localhost:9002";
const generator_host = process.env.GENERATOR_HOST || "http://localhost:9003";

module.exports = {
    application_host,
    template_host,
    generator_host
}
