<script setup lang="ts">
import { useRoute } from 'vue-router'
import { watch } from 'vue'
import { storeToRefs } from 'pinia'
import type { FormKitNode } from '@formkit/core'
import type { PostForm } from '@/types'
import { usePostStore } from '@/store/post'

const postStore = usePostStore()
const { getPost, updatePost } = postStore
const { post } = storeToRefs(postStore)
const route = useRoute()

const submit = (payload: PostForm, node: FormKitNode) =>
  updatePost(String(route.params.slug), payload, node)

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
      <FormKit type="form" submit-label="Update post" @submit="submit">
        <FormKit type="text" label="Title" name="title" :value="post?.title"/>
        <FormKit type="textarea" label="Body" name="body" :value="post?.body"/>
      </FormKit>
    </div>
 </section>
</template>
