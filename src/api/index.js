import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "development"
    ? "/api"
    : "https://uat-api.51cheyaoshi.com";

console.log(
  "process.env",
  process.env.ENV,
  process.env.NODE_ENV,
  process.env.VUE_APP_BASE_URL
);
const instance = axios.create({
  //baseURL: 'http://test.51cheyaoshi.com:6999/',
  //baseURL: 'https://uat-api.51cheyaoshi.com',
  baseURL: "https://api.51cheyaoshi.com",
  //baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 20000,
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    if (localStorage.getItem("token")) {
      config.headers.authorization = localStorage.getItem("token");
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (res) => {
    switch (res.data.code) {
      case 301:
        this.$message.error(res.data.msg);
        break;
      case 404:
        this.$message.error(res.data.msg);
        break;
      case 500:
        this.$message.error(res.data.msg);
        break;
    }
    return res.data;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
