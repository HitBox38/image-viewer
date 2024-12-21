<script setup lang="ts">
const userStore = useUserStore();
</script>

<template>
  <header class="bg-gray-800 shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <img
            class="h-8 w-8 rounded-full"
            src="https://via.placeholder.com/32"
            alt="User avatar"
          />
          <div class="ml-3">
            <h2 class="text-lg font-medium text-white">Welcome, {{ userStore.name }}</h2>
            <p class="text-sm text-gray-400">{{ userStore.email }}</p>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
