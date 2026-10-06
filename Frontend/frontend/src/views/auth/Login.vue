<script setup lang="ts">
  import axiosInstance from '@/lib/axios'
import { reactive } from 'vue'

interface LoginForm {
  email: string,
  password: string
}

const form = reactive<LoginForm>({
  email: '',
  password: ''
})

  const login = async (payload: LoginForm) => {
  await axiosInstance.get('/sanctum/csrf-cookie', {baseURL: 'http://localhost:8000'})
  try {
    const response = await axiosInstance.post('/login', payload)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
</script>

<template>
  <main>
    <h1 class="text-3xl text-slate-200 m-4">Login</h1>

<form @submit.prevent="login(form)" class="max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
  <div class="mb-5">
    <label for="email" class="text-white block mb-2.5 text-sm font-medium text-heading">Your email</label>
    <input v-model="form.email" type="email" id="email" class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="name@flowbite.com" />
  </div>
  <div class="mb-5">
    <label for="password" class="text-white block mb-2.5 text-sm font-medium text-heading">Your password</label>
    <input v-model="form.password" type="password" id="password" class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="••••••••"  />
  </div>
  <button type="submit" class="text-white bg-brand box-border border hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Login</button>
</form>

  </main>
</template>
