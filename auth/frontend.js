const { createContext, useContext } = require("react");
const { useIdentityContext } = require("react-netlify-identity-widget");

const AuthContext = createContext();

exports.useAuth = () => useContext(AuthContext);
exports.AuthProvider = ({ children }) => {
  const identity = useIdentityContext();
  return (
    <AuthContext.Provider
      value={{
        ...identity,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
