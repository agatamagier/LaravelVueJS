<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axiosInstance from '@/lib/axios'
import type { Post, LaravelData } from '@/types'
import { TailwindPagination } from 'laravel-vue-pagination';
  import { EyeIcon, PencilSquareIcon } from '@heroicons/vue/24/solid';
  const laravelData = ref<LaravelData>({data: [], links:{}, meta:{} });

const getResults = async (page = 1) => {
  const { data } = await axiosInstance.get(`/dashboard/posts?page=${page}`)
    laravelData.value = await data
}


const posts = ref<Post[]>([])


onMounted(async () => {
  await getResults();
})
</script>
<template>
    <div class="flex p-4 justify-end text-white">
      <RouterLink :to="{ name: 'PosteCreate' }">Create Post</RouterLink>
    </div>
    <section class="p-4">
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
            <template v-if="laravelData.data?.length > 0">
            <tr
              v-for="post in laravelData.data"
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
            <TailwindPagination
        :data="laravelData"
        @pagination-change-page="getResults"
    />
      </div>
    </section>
</template>
