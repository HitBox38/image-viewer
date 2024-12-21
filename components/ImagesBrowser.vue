<script lang="ts" setup>
const selectedPhoto = ref<Image | null>(null);
const handleClick = (photo: Image) => {
  if (photo.id !== selectedPhoto.value?.id) {
    selectedPhoto.value = photo;
  } else {
    selectedPhoto.value = null;
  }
};
const store = useImagesStore();
</script>

<template>
  <div
    class="flex flex-row items-center p-4 gap-8 justify-evenly h-[calc(100vh-80px)] overflow-y-hidden"
  >
    <selected-image v-if="selectedPhoto" :image="selectedPhoto ? selectedPhoto : null" />
    <div
      class="flex flex-col flex-wrap justify-center gap-4 self-start bg-slate-800 p-4 rounded-lg shadow-lg"
    >
      <filter-input />
      <div
        class="grid grid-cols-4 gap-4 auto-rows-min place-items-start p-2 h-[calc(100vh-250px)] overflow-y-auto"
      >
        <upload-image v-if="store.getImages.length < 200" />
        <img
          v-for="(photo, index) in store.filterByTags"
          :key="index"
          :src="photo.url"
          :alt="`Photo ${index + 1}`"
          class="bg-zinc-800 object-scale-down h-56 w-40 rounded-lg shadow-lg cursor-pointer transition-transform duration-300 hover:scale-105"
          @click="handleClick(photo)"
        />
      </div>
    </div>
  </div>
</template>
