const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://oncology-api.itrtechsystems.com",
      changeOrigin: true,
      secure: true,
    })
  );
};
