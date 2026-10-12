<script setup lang="ts">
import type { FormKitNode } from '@formkit/core';
import axiosInstance from '@/lib/axios'
import axios from 'axios'
import router from '@/router';

  type PostForm = {
    title: string;
    body: string;
};
  const createPost = async (payload: PostForm, node?: FormKitNode) => {
    try {
      await axiosInstance.get('/sanctum/csrf-cookie', { baseURL: 'http://localhost:8000' })
      await axiosInstance.post('/dashboard/posts', payload);
      router.push('/dashboard/posts');
    } catch (error) {
            if (error instanceof axios.AxiosError && error.response?.status === 422) {
        node?.setErrors([], error.response?.data.errors)
      } else {
        console.error(error)
      }
    }
  }
</script>
<template>
    <h1 class="text-3xl dark:text-white m-4">Create post</h1>
    <div class="max-w-md mx-auto rounded-lg p-4">
      <FormKit type="form" submit-label="Create post" @submit="createPost">
        <FormKit type="text" label="Title" name="title"/>
        <FormKit type="textarea" label="Body" name="body"/>
      </FormKit>
    </div>

</template>
