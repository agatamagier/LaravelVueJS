import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { LaravelResponseCollection, PostForm, User } from '@/types'
import axiosInstance from '@/lib/axios'
import router from '@/router'
import type { RegisterForm } from '@/types'
import type { Post } from '@/types'
import type { LoginForm } from '@/types'
import type { FormKitNode } from '@formkit/core'
import axios from 'axios'

export const usePostStore = defineStore('post', () => {
  const postsCollections = ref<LaravelResponseCollection<Post | null>[]>([])
  const post = ref<Post | null>(null)
  const isLoading = ref<boolean>(false)

  const getPosts = async (page: number) => {
    isLoading.value = true
    try {
      const {data} = await axiosInstance.get<LaravelResponseCollection<Post | null>[]>(`/dashboard/posts?page=${page}`)
      postsCollections.value = data
    } catch (error) {
      console.error(error)
    } finally {
      isLoading.value = false
    }
  }

  const getPost = async (slug: string) => {
    isLoading.value = true
    try {
      const {data} = await axiosInstance.get<{ data: Post }>(`/dashboard/posts/${slug}`)
      post.value = data.data
    } catch (error) {
      console.error(error)
    } finally {
      isLoading.value = false
    }
  }

  const createPost = async (payload: PostForm, node?: FormKitNode) => {
    isLoading.value = true
    try {
      await axiosInstance.post<Post | null>('/dashboard/posts', payload)
await router.push('/dashboard/posts')
    } catch (error) {
      if(error instanceof axios.AxiosError && error.response?.status === 422) {
        node?.setErrors([], error.response?.data?.errors)
      }
      console.error(error)
    } finally {
      isLoading.value = false
    }
  }

  const updatePost = async (slug: string, payload: PostForm, node?: FormKitNode) => {
    isLoading.value = true
    try {
     await axiosInstance.put<Post | null>(`/dashboard/posts/${slug}`, payload)
      await router.push('/dashboard/posts')
    } catch (error) {
      if(error instanceof axios.AxiosError && error.response?.status === 422) {
        node?.setErrors([], error.response?.data?.errors)
      }
      console.error(error)
    } finally {
      isLoading.value = false
    }
  }
  return {
    postsCollections,
    post,
    isLoading,
    getPosts,
    getPost,
    createPost,
    updatePost
  }
}, {
  persist: {
    storage: localStorage,
    pick: ['user', 'isLoggedIn']
 }})
