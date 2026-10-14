<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'
import axiosInstance from '@/lib/axios'
import type { Post } from '@/types'

const route = useRoute()
const post = ref<Post | null>(null)

const getPost = async (slug: string) => {
  const { data } = await axiosInstance.get(`/dashboard/posts/${slug}`)
  post.value = data.data
  console.log(post.value)
}

// onMounted(async () => {
//   await getPost(Number(route.params.id))
// })
watch(() => route.params.slug, async (newSlug) => {
  if (newSlug) {
    await getPost(String(newSlug))
  }
}, { immediate: true })
</script>

<template>
  <section>
    <h1 class="text-2xl text-white font-bold mb-4">{{ post?.title }}</h1>
    <span class="text-gray-400">{{ post?.createdAt }}</span>
    <p class="text-white">{{ post?.body }}</p>
  </section>
</template>
