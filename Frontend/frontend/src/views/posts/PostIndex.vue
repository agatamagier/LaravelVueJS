<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import axiosInstance from '@/lib/axios'
import type { Post, LaravelData } from '@/types'
import { TailwindPagination } from 'laravel-vue-pagination';
  import { EyeIcon, PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/solid';
  import { usePostStore } from '@/store/post'
import { useRouter } from 'vue-router'

  const route = useRouter()
  const postStore = usePostStore()
  const router = useRouter()
const page= ref<number>(route.currentRoute.value.query.page || 1)

const posts = ref<Post[]>([])


onMounted(async () => {
  await postStore.getPosts(page.value);
})

watch(page, async () => {
  await postStore.getPosts(page.value);
await router.push({ query: { page: page.value } })
})
</script>
<template>
    <div class="flex p-4 justify-end text-white">
      <RouterLink :to="{ name: 'PosteCreate' }">Create Post</RouterLink>
    </div>
    <section class="p-4">
      <template v-if="postStore.isLoading">
        <Loading />
      </template>
      <template v-else>
      <div class="relative overflow-x-auto bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-sm text-gray-700 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
            <tr>
                            <th scope="col" class="px-6 py-3 font-medium">ID</th>
              <th scope="col" class="px-6 py-3 font-medium">Title</th>
              <th scope="col" class="px-6 py-3 font-medium">Body</th>
              <th scope="col" class="px-6 py-3 font-medium">Published</th>
              <th scope="col" class="px-6 py-3 font-medium">Created</th>
                            <th scope="col" class="px-6 py-3 font-medium">Slug</th>
              <th scope="col" class="px-6 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="postStore.postsCollection">
            <tr
              v-for="post in postStore.postsCollection.data"
              :key="post.id"
              class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 last:border-0"
            >
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                {{ post.id }}
              </th>
                      <td class="px-6 py-4">{{ post.title }}</td>
              <td class="px-6 py-4">{{ post.body }}</td>
              <td class="px-6 py-4">{{ post.published ? 'Yes' : 'No' }}</td>
              <td class="px-6 py-4">{{ post.createdAt}}</td>
              <td class="px-6 py-4">{{ post.slug }}</td>
              <td class="px-6 py-4">
                <div class="flex space-x-4">
                  <RouterLink :to="{ name: 'PostView', params: { slug: post.slug }}">
                  <EyeIcon class="w-6 h-6 text-blue-500 hover:text-blue-700 cursor-pointer" />
                  </RouterLink>
                           <RouterLink :to="{ name: 'PostEdit', params: { slug: post.slug }}">
                  <PencilSquareIcon class="w-6 h-6 text-green-500 hover:text-green-700 cursor-pointer" />
                  </RouterLink>
                  <TrashIcon class="w-6 h-6 text-red-500 hover:text-red-700 cursor-pointer" @click="postStore.deletePost(page,post.slug)" />
                </div>
              </td>
            </tr>
            </template>
            <template v-else>
            <tr v-if="posts.length === 0">
              <td colspan="4" class="px-6 py-4 text-center">No posts yet.</td>
            </tr>
            </template>
          </tbody>

        </table>
<template v-if="postStore.postsCollection">
  <TailwindPagination
      :data="postStore.postsCollection"
      @pagination-change-page="page = $event"
  />
</template>
      </div>
      </template>
    </section>
</template>
