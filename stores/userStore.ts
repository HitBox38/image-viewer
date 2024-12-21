export const useUserStore = defineStore("user", {
  state: () => ({
    name: "John Doe",
    email: "john@example.com",
  }),
  actions: {
    updateName(name: string) {
      this.name = name;
    },
    updateEmail(email: string) {
      this.email = email;
    },
  },
});
