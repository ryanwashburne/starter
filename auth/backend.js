exports.authorize = (fn) => {
  return async (event, context) => {
    try {
      const user = context?.clientContext?.user;
      if (!user) {
        throw new Error("Invalid authorization");
      }
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
