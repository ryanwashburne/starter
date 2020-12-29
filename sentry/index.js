const Sentry = require("@sentry/node");
require("@sentry/tracing");

class SentryClient {
  isDevelopment;
  constructor({ apiKey, isDevelopment }) {
    this.isDevelopment = String(isDevelopment);
    Sentry.init({
      dsn: apiKey,
      tracesSampleRate: 1.0,
    });
  }
  async log(event) {
    if (typeof event === "string") {
      console.log(event);
      if (isDevelopment !== "true") {
        Sentry.captureMessage(event, "info");
      }
    } else {
      console.error(event);
      if (isDevelopment !== "true") {
        Sentry.captureException(event);
      }
    }
  }
}

module.exports = SentryClient;
