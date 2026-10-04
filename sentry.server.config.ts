// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://befc15f22af54889792b1408ae87de90@o4512180882112512.ingest.us.sentry.io/4512180892270592",
  integrations:[
      Sentry.vercelAIIntegration({
        recordInputs:true,
        recordOutputs:true,
      }),
      Sentry.consoleLoggingIntegration({levels:["log","warn","error"]})
    ],
  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,

  dataCollection: {
    // To disable sending user data and HTTP bodies, uncomment the lines below. For more info visit:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#dataCollection
    // userInfo: false,
    // httpBodies: [],
  },
});
