import {
  type ApplicationParamsSchema,
  type ImageParamsSchema,
  type WaveParamsSchema,
} from "@/lib/paramsValidation";

export const urls = {
  root: "/",
  profile: "/profile",
  waves: {
    create: "/waves/create",
    createPreview: "/waves/create/preview",
    preview: ({ waveId }: WaveParamsSchema) => `/waves/${waveId}` as const,
  },
  applications: {
    create: ({ waveId }: WaveParamsSchema) =>
      `/waves/${waveId}/applications/create` as const,
    createPreview: ({ waveId }: WaveParamsSchema) =>
      `/waves/${waveId}/applications/create/preview` as const,
    preview: ({ waveId, applicationId }: ApplicationParamsSchema) =>
      `/waves/${waveId}/applications/${applicationId}` as const,
    edit: ({ waveId, applicationId }: ApplicationParamsSchema) =>
      `/waves/${waveId}/applications/${applicationId}/edit` as const,
    editPreview: ({ waveId, applicationId }: ApplicationParamsSchema) =>
      `/waves/${waveId}/applications/${applicationId}/edit/preview` as const,
  },
  moderator: {
    reviewers: "/moderator/reviewers",
    applications: "/moderator/applications",
    users: "/moderator/users",
  },
  images: {
    preview: ({ imageId }: ImageParamsSchema) =>
      `/api/images/${imageId}` as const,
  },
  auth: {
    login: "/api/auth/login",
    loginCallback: "/api/loginCallback",
    logout: "/api/auth/logout",
  },
} as const;
