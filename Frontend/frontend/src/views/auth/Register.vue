<script setup lang="ts">
import { useAuthStore } from '@/store/auth'
const { register } = useAuthStore()
</script>

<template>
  <main>
    <h1 class="text-3xl text-slate-200 m-4">Register</h1>
        <div class="max-w-md mx-auto bg-slate-700 rounded-lg p-4">
          <FormKit type="form" submit-label="Register" @submit="register">
            <FormKit type="text" label="Name" name="name"/>
            <FormKit type="email" label="Email" name="email"/>
            <FormKit type="password" label="Password" name="password"/>
            <FormKit type="password" label="Confirm Password" name="password_confirmation"/>
          </FormKit>
        </div>
  </main>
</template>
