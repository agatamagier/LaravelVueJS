<script setup lang="ts">
  import axiosInstance from '@/lib/axios'
import { reactive } from 'vue'

interface RegisterForm {
  name: string
  email: string
  password: string
  password_confirmation: string
}

const form = reactive<RegisterForm>({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
})

  const register = async (payload: RegisterForm) => {
  await axiosInstance.get('/sanctum/csrf-cookie', {baseURL: 'http://localhost:8000'})
  try {
    const response = await axiosInstance.post('/register', payload)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
</script>

<template>
  <main>
    <h1 class="text-3xl text-slate-200 m-4">Register</h1>

<form @submit.prevent="register(form)" class="max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
  <div class="mb-5">
    <label for="email" class="block mb-2.5 text-sm font-medium text-heading">Your email</label>
    <input v-model="form.email" type="email" id="email" class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="name@flowbite.com" />
  </div>
  <div class="mb-5">
    <label for="name" class="block mb-2.5 text-sm font-medium text-heading">Your name</label>
    <input v-model="form.name" type="text" id="name" class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="name"  />
  </div>
  <div class="mb-5">
    <label for="password" class="block mb-2.5 text-sm font-medium text-heading">Your password</label>
    <input v-model="form.password" type="password" id="password" class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="••••••••"  />
  </div>
    <div class="mb-5">
    <label for="password_confirmation" class="block mb-2.5 text-sm font-medium text-heading">Password confirmation</label>
    <input v-model="form.password_confirmation" type="password" id="password_confirmation" class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="••••••••" />
  </div>
  <button type="submit" class=" bg-brand box-border border hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Submit</button>
</form>

  </main>
</template>
