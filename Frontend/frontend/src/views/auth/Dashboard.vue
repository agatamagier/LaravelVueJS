<script setup lang="ts">
  import axiosInstance from '@/lib/axios'

  const user = async () => {
    try {
      const response = await axiosInstance.get('/user')
      console.log(response)
      return response.data

    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const logout = async () => {
  try {
    const response = await axiosInstance.post('/logout')
    console.log(response)
  } catch (error) {
    console.error(error)
    throw error
  }
  }

user()
</script>

<template>
  <main>
    <h2>Dashboard</h2>
  </main>
</template>
