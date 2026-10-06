<script setup lang="ts">
  import axiosInstance from '@/lib/axios'
  import { ref } from 'vue'

  const user = ref({
    name: '',
    email: ''
  })

  const getUser = async () => {
    try {
      const response = await axiosInstance.get('/user')
      user.value = response.data
      console.log(response)
      return response.data

    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const logout = async () => {
  try {
await axiosInstance.post('/logout')
user.value = {
  name: '',
  email: ''
}
  } catch (error) {
    console.error(error)
    throw error
  }
  }

getUser()
</script>

<template>
  <main>
    <h1 class="text-3xl text-slate-200">Dashboard</h1>
    <div class="flex items-center justify-between">
      <div class="flex-1">
              <p class="text-slate-200">Welcome, {{ user?.name }}</p>
              <p class="text-slate-200">{{ user?.email }}</p>
      </div>
      <button @click="logout" class="text-white bg-brand box-border border hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Logout</button>
    </div>
  </main>
</template>
