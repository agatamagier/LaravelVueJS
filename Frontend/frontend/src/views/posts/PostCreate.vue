<script setup lang="ts">
import { usePostStore } from '@/store/post'

  const { createPost } = usePostStore()
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
