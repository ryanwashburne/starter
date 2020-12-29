exports.authorizeNetlify = (fn) => {
  return async (event, context) => {
    try {
      const user = context?.clientContext?.user;
      if (!user) {
        throw new Error("Invalid authorization");
      }
      const body = event.body ? JSON.parse(event.body) : {};
      return await fn({ ...event, body }, { user });
    } catch (e) {
      return {
        statusCode: 401,
        body: JSON.stringify({
          message: e.message,
        }),
      };
    }
  };
};

exports.authorizeFirebase = (fn) => {
  return async function (event) {
    try {
      if (
        !event?.headers?.authorization ||
        event.headers.authorization.length === 0
      ) {
        throw new Error("No authorization header");
      }
      try {
        const body = event.body ? JSON.parse(event.body) : {};
        const token = event.headers.authorization.split(" ")[1];
        const { uid } = await admin.auth().verifyIdToken(token);
        const user = await usersCol.doc(uid).get();
        return await fn({ ...event, body }, { user });
      } catch (_) {
        throw new Error("Invalid authorization");
      }
    } catch (e) {
      console.error(e);
      return {
        statusCode: 401,
        body: JSON.stringify({
          message: e.message,
        }),
      };
    }
  };
};
