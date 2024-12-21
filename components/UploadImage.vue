<script lang="ts" setup>
const formState = reactive<Omit<Image, "id" | "uploadedBy">>({
  url: "",
  tags: [],
});
const isDialogOpen = ref(false);
const fileInputRef = ref<HTMLInputElement | null>(null);
const tagsInputRef = ref<HTMLInputElement | null>(null);
const images = useImagesStore();
const user = useUserStore();

const handleClick = () => {
  isDialogOpen.value = true;
};

const handleClose = () => {
  formState.url = "";
  formState.tags = [];
  if (tagsInputRef.value) {
    tagsInputRef.value.value = "";
  }

  isDialogOpen.value = false;
};

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  console.log(input.files);

  if (input.files && input.files.length > 0) {
    const file = input.files[0];
    console.log("in", file);

    formState.url = URL.createObjectURL(file);
  }
};

const handleKeyUp = (event: KeyboardEvent) => {
  if (event.key === "Enter") {
    const input = event.target as HTMLInputElement;
    const value = input.value.trim();
    if (value && !formState.tags.includes(value)) {
      formState.tags.push(value);
      input.value = "";
    }
  }
};

const handleRemoveTag = (tag: string) => {
  formState.tags = formState.tags.filter((t) => t !== tag);
};

const triggerFileInput = () => {
  fileInputRef.value?.click();
};

const handleSubmit = () => {
  const image: Image = {
    id: Date.now(),
    url: formState.url,
    tags: formState.tags,
    uploadedBy: user.name,
  };
  images.addNewImage(image);
  handleClose();
};
</script>

<template>
  <div
    class="group flex flex-col items-center justify-center h-56 w-40 overflow-y-auto rounded-lg shadow-lg cursor-pointer border-dashed border-2 bg-zinc-800 border-gray-400 hover:border-gray-500 hover:scale-105 hover:bg-zinc-700 transition-all duration-300"
    @click="handleClick()"
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
      class="stroke-gray-400 group-hover:stroke-gray-500 group-hover:scale-125 transition-all duration-300"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  </div>

  <dialog
    :open="isDialogOpen"
    class="fixed z-10 inset-0 rounded-lg bg-zinc-800 p-4 overflow-y-auto shadow-2xl"
  >
    <div class="p-4 flex flex-col items-center justify-center">
      <input
        ref="fileInputRef"
        type="file"
        class="hidden"
        accept="image/*"
        @change="handleFileChange"
      />
      <label
        class="group flex w-40 py-2 flex-col items-center justify-center h-full rounded-lg shadow-lg cursor-pointer border-dashed border-2 bg-zinc-800 border-gray-400 hover:border-gray-500 hover:scale-105 hover:bg-zinc-700 transition-all duration-300"
        @click="triggerFileInput"
        v-if="!formState.url"
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
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        <span class="text-gray-400 text-sm">Upload an image</span>
      </label>

      <div v-else class="flex flex-col items-center justify-center">
        <img :src="formState.url" class="w-full h-auto rounded-lg shadow-lg" />
      </div>
      <div class="flex flex-col items-center justify-center mt-4">
        <input
          type="text"
          class="w-96 h-12 px-4 py-2 text-sm font-medium text-gray-800 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
          placeholder="Add tags"
          @keyup="handleKeyUp"
          ref="tagsInputRef"
        />
        <div class="grid grid-cols-3 gap-3 mt-4">
          <div
            v-for="(tag, index) in formState.tags"
            :key="index"
            class="flex flex-row items-center gap-2 px-4 py-1 text-sm text-gray-800 bg-gray-200 rounded-lg"
          >
            <span class="text-gray-400">#</span>
            <span>{{ tag }}</span>
            <button
              class="flex flex-row items-center justify-center w-4 h-4 text-gray-400 bg-gray-200 rounded-lg hover:text-gray-500 hover:bg-gray-300 transition-all duration-300"
              @click="handleRemoveTag(tag)"
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
      <div class="flex flex-row items-center justify-center gap-3 mt-4">
        <button
          class="flex flex-col items-center justify-center w-full h-12 px-4 py-2 text-sm font-medium text-white transition-all duration-300 bg-gray-400 rounded-lg hover:bg-gray-500 hover:scale-105"
          @click="handleClose()"
        >
          Cancel
        </button>
        <button
          class="flex flex-col items-center justify-center w-full h-12 px-4 py-2 text-sm font-medium text-white transition-all duration-300 bg-green-500 rounded-lg hover:bg-green-600 hover:scale-105"
          @click="handleSubmit()"
        >
          Upload
        </button>
      </div>
    </div>
  </dialog>
</template>
