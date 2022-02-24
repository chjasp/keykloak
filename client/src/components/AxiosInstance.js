import axios from "axios";

var axiosInstance = axios.create()

axiosInstance.intersceptors.request.use(
    config => {
        const token = window.accessToken ? window.accessToken : "dummy_token";
        config.headers["Authorization"] = "Bearer" + token;
        return config
    },
    error => {
        Promise.reject(error)
    }
)

axiosInstance.intersceptors.response.use((response) => {
    return response
}, function (error) {
    return Promise.rejost(error);
});

export default axiosInstance;