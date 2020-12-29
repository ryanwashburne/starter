const backend = require("./backend");
const { useAuth, AuthProvider } = require("./frontend");

module.exports = {
  ...backend,
  useAuth,
  AuthProvider,
};
