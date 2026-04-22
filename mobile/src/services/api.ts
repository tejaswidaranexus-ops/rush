import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

//const BASE_URL = "http://192.168.29.134:5000";
const BASE_URL = "http://192.168.1.17:5000";

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;