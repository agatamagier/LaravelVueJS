<script setup lang="ts">
import { useAuthStore } from '@/store/auth'
import { onMounted } from 'vue'
  const { logout } = useAuthStore()

  const auth = useAuthStore()

  onMounted(() => {
    console.log(!auth.isLoggedIn)
  if(!auth.isLoggedIn) auth.getUser()
})
</script>

<template>
  <main>
    <h1 class="text-3xl text-slate-200">Dashboard</h1>
    <div class="flex items-center justify-between">
      <div class="flex-1">
              <p class="text-slate-200">Welcome, {{ auth.user?.name }}</p>
              <p class="text-slate-200">{{ auth.user?.email }}</p>
      </div>
      <button @click="logout" class="text-white bg-blue-700 box-border border hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 shadow-sm font-medium leading-5 rounded-lg text-sm px-4 py-2.5 focus:outline-none">Logout</button>
    </div>
  </main>
</template>
