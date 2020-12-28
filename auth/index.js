const { authorize } = require("./backend");
const { useAuth, AuthProvider } = require("./frontend");

module.exports = {
  authorize,
  useAuth,
  AuthProvider,
};
