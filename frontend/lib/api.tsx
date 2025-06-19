import axios from "axios"

const API = axios.create({
  baseURL: process.env.BACKEND_URL, // your Go backend
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
})

export default API