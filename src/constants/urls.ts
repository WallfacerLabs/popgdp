export const urls = {
  root: "/",
  profile: "/profile",
  image: {
    preview(imageId: string) {
      return `/api/images/${imageId}`;
    },
  },
} as const;
