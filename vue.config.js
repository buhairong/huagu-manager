const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === "development" ? './' : './',
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    open: true,
    host: 'localhost',
    port: 8081,
    proxy: {
      // 代理
      "/api": {
        // http://test.51cheyaoshi.com:6999/ 测试
        target: "http://uat-api.51cheyaoshi.com/",     //要代理访问的路径
        // target: "https://api.51cheyaoshi.com/",     //要代理访问的路径
        ws: false,// 是否启用websockets
        changeOrigin: true,//开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRewrite: {
          "^/api": ""//这里理解成用'/api'代替target里面的地址,比如我要调用'http://192.168.0.45:8088/user/getuserlist'，直接写'/api/user/getuserlist'即可
        }
      }
    }
  }
})