<script lang="ts" setup>
const store = useImagesStore();

const handleKeyUp = (event: KeyboardEvent) => {
  if (event.key === "Enter") {
    const input = event.target as HTMLInputElement;
    const value = input.value.trim();

    if (value && !store.filterTags.includes(value)) {
      store.addTag(value);
      input.value = ""; // Clear the input after adding the tag
    }
  }
};
</script>

<template>
  <div class="flex flex-col justify-center items-center">
    <input
      type="text"
      class="w-96 h-12 px-4 py-2 text-sm font-medium text-gray-800 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
      placeholder="Filter by tags"
      @keyup="handleKeyUp"
    />
    <div class="grid grid-cols-3 gap-3 mt-4">
      <div
        v-for="(tag, index) in store.filterTags"
        :key="index"
        class="flex flex-row items-center gap-2 px-4 py-1 text-sm text-gray-800 bg-gray-200 rounded-lg"
      >
        <span class="text-gray-400">#</span>
        <span>{{ tag }}</span>
        <button
          class="flex flex-row items-center justify-center w-4 h-4 text-gray-400 bg-gray-200 rounded-lg hover:text-gray-500 hover:bg-gray-300 transition-all duration-300"
          @click="store.removeTag(tag)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="stroke-gray-400 transition-all duration-300"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
