import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:3000/api",
});

// Attribue le header Authorization avec le token à toutes les requêtes axios
http.interceptors.request.use(function (config)
{
  let token = false;
  if(localStorage.getItem('groupo')){
    token = JSON.parse(localStorage.getItem('groupo'));
  }
  config.headers.Authorization = token ? `Bearer ${token}` : ' ';
  return config;
});

 export default http;