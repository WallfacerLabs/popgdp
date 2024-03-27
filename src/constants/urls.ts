export const urls = {
  profile: {
    mainDetails: "/profile/mainDetails",
    wallet: "/profile/wallet",
  },
  image: {
    preview(imageId: string) {
      return `/api/images/${imageId}`;
    },
  },
} as const;
