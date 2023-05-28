const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: "http://e-commerce-nozama-server-1:9000",
            changeOrigin: true
        })
    )
}