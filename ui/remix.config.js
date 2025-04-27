const { netlify } = require("@remix-run/netlify");

/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  appDirectory: "app",
  assetsBuildDirectory: "public/build",
  publicPath: "/build/",
  serverBuildPath: "netlify/functions/server.js",
  serverModuleFormat: "cjs",
  serverPlatform: "node",
  future: {
    v2_routeConvention: true,
  },
  ...netlify(),
};
