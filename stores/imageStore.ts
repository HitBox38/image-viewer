export interface Image {
  id: number;
  url: string;
  tags: string[];
  uploadedBy: string;
}

export const useImagesStore = defineStore("Image", {
  state: () => ({ images: [] as Image[], filterTags: [] as string[] }),
  getters: {
    getImages(state) {
      return state.images;
    },
    filterByTags({ images, filterTags }) {
      console.log(filterTags);

      return filterTags.length > 0
        ? images.filter((image) =>
            image.tags.some((tag) => {
              console.log(tag);

              return filterTags.includes(tag);
            })
          )
        : images;
    },
    getTags(state) {
      return state.filterTags;
    },
  },
  actions: {
    addNewImage(image: Image) {
      console.log(image);

      this.images.push(image);
    },
    addTag(tag: string) {
      this.filterTags.push(tag);
    },
    removeTag(tag: string) {
      this.filterTags = this.filterTags.filter((t) => t !== tag);
    },
  },
});
