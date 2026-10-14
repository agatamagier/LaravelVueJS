<script setup lang="ts">
import { useRoute } from 'vue-router'
  import { watch } from 'vue'
import { storeToRefs } from 'pinia'
  import { usePostStore } from '@/store/post'


  const postStore = usePostStore()
    const { getPost } = postStore
  const { post } = storeToRefs(postStore)
const route = useRoute()


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
