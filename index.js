const auth = require("./auth/index");
const tailwindcss = require("./tailwind/tailwind.css");
const NetlifyClient = require("./netlify/index");
const AWSClient = require("./aws/index");
const SentryClient = require("./sentry/index");
const GraphQLServer = require("./graphql/index");

module.exports = {
  ...auth,
  tailwindcss,
  NetlifyClient,
  AWSClient,
  SentryClient,
  GraphQLServer,
};
