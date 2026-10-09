import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '@/types'
import axiosInstance from '@/lib/axios'
import router from '@/router'
import type { RegisterForm } from '@/types'
import type { LoginForm } from '@/types'
import type { FormKitNode } from '@formkit/core'
import axios from 'axios'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isLoggedIn = ref<boolean>(false)

    const register = async (payload: RegisterForm, node?: FormKitNode) => {
    try {
      await axiosInstance.get('/sanctum/csrf-cookie', { baseURL: 'http://localhost:8000' })
      await axiosInstance.post('/register', payload)
      await getUser()
      router.push('/dashboard')
    } catch (error) {
      if (error instanceof axios.AxiosError && error.response?.status === 422) {
        node?.setErrors([], error.response?.data.errors)
      } else {
        console.error(error)
      }
    }
  }

    const login = async (payload: LoginForm, node?: FormKitNode) => {
    try {
      await axiosInstance.get('/sanctum/csrf-cookie', { baseURL: 'http://localhost:8000' })
      await axiosInstance.post('/login', payload)
      await getUser()
      router.push('/dashboard')
    } catch (error) {
      if (error instanceof axios.AxiosError && error.response?.status === 422) {
        node?.setErrors([], error.response?.data.errors)
      } else {
        console.error(error)
      }
    }
  }

    const getUser = async () => {
    try {
      const response = await axiosInstance.get('/user')
      user.value = response.data
      isLoggedIn.value = true
      console.log(response)
      return response.data

    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const logout = async () => {
    try {
      await axiosInstance.get('/sanctum/csrf-cookie', { baseURL: 'http://localhost:8000' })
      await axiosInstance.post('/logout')
      router.push('/login')
    } catch (error) {
      console.error(error)
    } finally {
      user.value = null
      isLoggedIn.value = false
      router.push('/login')
    }
  }

  const cleanState = () => {
    user.value = null
    isLoggedIn.value = false
  }
  return {
    user,
    isLoggedIn,
    register,
    login,
    getUser,
    logout,
    cleanState
  }
}, {
  persist: {
    storage: localStorage,
    pick: ['user', 'isLoggedIn']
 }})
