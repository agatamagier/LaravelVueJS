<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'
import axiosInstance from '@/lib/axios'
  import type { Post } from '@/types'
import router from '@/router';
  import type { FormKitNode } from '@formkit/core';
  import axios from 'axios'

const route = useRoute()
const post = ref<Post | null>(null)

const getPost = async (slug: string) => {
  const { data } = await axiosInstance.get(`/dashboard/posts/${slug}`)
  post.value = data.data
  console.log(post.value)
}

const updatePost = async (payload: Post, node?: FormKitNode) => {
try {
  if (!post.value) return
await axiosInstance.put(`/dashboard/posts/${post.value?.slug}`, payload)

  await router.push({ name: 'PostView', params: { slug: post.value?.slug } })
  console.log(post.value)
} catch (error) {
  if(error instanceof axios.AxiosError && error.response?.status === 422)
  node?.setErrors([], error.response?.data?.errors || [])
}
}

watch(() => route.params.slug, async (newSlug) => {
  if (newSlug) {
    await getPost(String(newSlug))
  }
}, { immediate: true })
</script>

<template>
 <section v-if="post" class="p-4">
    <h1 class="text-2xl text-white font-bold mb-4">Update {{ post?.title }}</h1>
      <div class="max-w-md mx-auto rounded-lg p-4">
      <FormKit type="form" submit-label="Update post" @submit="updatePost">
        <FormKit type="text" label="Title" name="title" :value="post?.title"/>
        <FormKit type="textarea" label="Body" name="body" :value="post?.body"/>
      </FormKit>
    </div>
 </section>
</template>
