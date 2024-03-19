import type { AdapterAccount } from "@auth/core/adapters";
import { relations } from "drizzle-orm";
import {
  customType,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

const bytea = customType<{ data: Buffer }>({
  dataType() {
    return "bytea";
  },
});

export const contentValueEnum = pgEnum("contentValue", ["positive", "spam"]);

export const waves = pgTable("wave", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  startsAt: timestamp("startsAt", {
    mode: "date",
    withTimezone: true,
  }).notNull(),
  endsAt: timestamp("endsAt", { mode: "date", withTimezone: true }).notNull(),
  createdAt: timestamp("createdAt", {
    mode: "date",
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updatedAt", {
    mode: "date",
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
});

export const wavesRelations = relations(waves, ({ many }) => ({
  applications: many(applications),
}));

export const applications = pgTable("application", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  summary: text("summary").notNull(),
  entityName: text("entityName").notNull(),
  duration: text("duration").notNull(),
  budget: text("budget").notNull(),

  teamSummary: text("teamSummary").notNull(),

  idea: text("idea").notNull(),
  reason: text("reason").notNull(),
  state: text("state").notNull(),
  goals: text("goals").notNull(),
  requirements: text("requirements").notNull(),

  tbd: text("tbd").notNull(),

  imageId: uuid("imageId").references(() => images.id, {
    onDelete: "cascade",
  }),
  waveId: integer("waveId")
    .notNull()
    .references(() => waves.id, { onDelete: "cascade" }),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt", {
    mode: "date",
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updatedAt", {
    mode: "date",
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
});

export const applicationsRelations = relations(
  applications,
  ({ one, many }) => ({
    wave: one(waves, {
      fields: [applications.waveId],
      references: [waves.id],
    }),
    users: one(users, {
      fields: [applications.userId],
      references: [users.id],
    }),
    comments: many(comments),
    members: many(members),
  }),
);

export const members = pgTable("member", {
  id: uuid("id").defaultRandom().primaryKey(),
  applicationId: uuid("applicationId")
    .notNull()
    .references(() => applications.id, { onDelete: "cascade" }),
  imageId: uuid("imageId").references(() => images.id, {
    onDelete: "cascade",
  }),
  name: text("name").notNull(),
  position: text("position").notNull(),
  createdAt: timestamp("createdAt", {
    mode: "date",
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updatedAt", {
    mode: "date",
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
});

export const membersRelations = relations(members, ({ one }) => ({
  application: one(applications, {
    fields: [members.applicationId],
    references: [applications.id],
  }),
  images: one(images, {
    fields: [members.imageId],
    references: [images.id],
  }),
}));

export const comments = pgTable("comment", {
  id: uuid("id").defaultRandom().primaryKey(),
  content: text("content").notNull(),
  applicationId: uuid("applicationId")
    .notNull()
    .references(() => applications.id, { onDelete: "cascade" }),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt", {
    mode: "date",
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updatedAt", {
    mode: "date",
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
});

export const commentsRelations = relations(comments, ({ one }) => ({
  application: one(applications, {
    fields: [comments.applicationId],
    references: [applications.id],
  }),
  users: one(users, {
    fields: [comments.userId],
    references: [users.id],
  }),
  reviews: one(reviews),
  commentValues: one(commentValues, {
    fields: [comments.id],
    references: [commentValues.commentId],
  }),
}));

export const commentValues = pgTable(
  "commentValue",
  {
    commentId: uuid("commentId")
      .notNull()
      .references(() => comments.id, { onDelete: "cascade" }),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    value: contentValueEnum("value").notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.commentId, table.userId] }),
  }),
);

export const reviews = pgTable(
  "review",
  {
    commentId: uuid("commentId")
      .notNull()
      .references(() => comments.id, { onDelete: "cascade" }),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    applicationId: uuid("applicationId")
      .notNull()
      .references(() => applications.id, { onDelete: "cascade" }),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.userId, table.applicationId],
    }),
  }),
);

export const reviewsRelations = relations(reviews, ({ one }) => ({
  comments: one(comments, {
    fields: [reviews.commentId],
    references: [comments.id],
  }),
  users: one(users, {
    fields: [reviews.userId],
    references: [users.id],
  }),
  application: one(applications, {
    fields: [reviews.applicationId],
    references: [applications.id],
  }),
}));

export const applicationValues = pgTable(
  "applicationValue",
  {
    applicationId: uuid("applicationId")
      .notNull()
      .references(() => applications.id, { onDelete: "cascade" }),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    value: contentValueEnum("value").notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.applicationId, table.userId] }),
  }),
);

export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    withTimezone: true,
  }),
  image: text("image"),
  createdAt: timestamp("createdAt", {
    mode: "date",
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updatedAt", {
    mode: "date",
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
});

export const images = pgTable("image", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  content: bytea("content").notNull(),
  createdAt: timestamp("createdAt", {
    mode: "date",
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updatedAt", {
    mode: "date",
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date", withTimezone: true }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);
