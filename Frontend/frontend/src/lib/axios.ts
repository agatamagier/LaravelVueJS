import axios from 'axios'
import router from '@/router'
import { useAuthStore } from '@/store/auth'
import { useToast } from 'vue-toast-notification';


const axiosInstance = axios.create({
  withCredentials: true,
  withXSRFToken: true,
  baseURL: 'http://localhost:8000/api'
})

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    const auth = useAuthStore()
    const $toast = useToast();
  switch (error.response?.status) {
    case 401:
      auth.cleanState()
      $toast.error('Unauthorized. Please log in again.');
      router.push('/login')
      break
    case 404:
      $toast.error('Resource not found.');
      router.push('/404')
      break
    case 419:
      auth.cleanState()
      $toast.error('Session expired. Please log in again.');
      router.push('/login')
      break
    case 500:
      $toast.error('Internal Server Error. Please try again later.');
      router.push('/500')
      break
  }
  return Promise.reject(error)
  }
)

export default axiosInstance
