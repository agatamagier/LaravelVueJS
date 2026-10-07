<script setup lang="ts">
import { useAuthStore } from '@/store/auth'
const { login } = useAuthStore()

</script>

<template>
  <main>
    <h1 class="text-3xl text-slate-200 m-4">Login</h1>
    <div class="max-w-md mx-auto bg-slate-700 rounded-lg p-4">
      <FormKit type="form" submit-label="Login" @submit="login">
        <FormKit type="email" label="Email" name="email"/>
        <FormKit type="password" label="Password" name="password"/>
      </FormKit>
    </div>
  </main>
</template>
