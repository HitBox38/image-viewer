<script lang="ts" setup>
import type { Image } from "../stores/imageStore";

// Define props for the component
defineProps<{
  image: Image | null;
}>();
</script>

<template>
  <div
    v-if="image"
    class="bg-zinc-800 p-4 w-1/2 h-1/2 flex flex-col items-center justify-center rounded-lg shadow-lg"
  >
    <img :src="image.url" class="w-4/5 h-3/4 object-scale-down rounded-lg" />
    <div class="flex flex-row items-center justify-center gap-3 mt-4">
      <div
        v-for="(tag, index) in image.tags"
        :key="index"
        class="flex flex-row flex-wrap items-center gap-2 px-4 py-1 text-sm text-gray-800 bg-gray-200 rounded-lg"
      >
        <span class="text-gray-400">#</span>
        <span>{{ tag }}</span>
      </div>
    </div>
    <p class="text-gray-400 mt-4">Uploaded by {{ image.uploadedBy }}</p>
  </div>
</template>
