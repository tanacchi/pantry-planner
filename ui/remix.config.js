/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  appDirectory: "app",
  assetsBuildDirectory: "public/build", // ブラウザ用のJS出力先
  publicPath: "/build/",
  serverBuildPath: "build/index.js",    // SSR用サーバビルドファイル
  serverModuleFormat: "cjs",             // NetlifyではCommonJS
  future: {
    v2_routeConvention: true,
  },
  server: "./server.js",                // これを追加（後述）
};
