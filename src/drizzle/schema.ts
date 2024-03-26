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

import { categoryColor } from "@/components/ui/categories/constants";

const bytea = customType<{ data: Buffer }>({
  dataType() {
    return "bytea";
  },
});

const contentValues = ["positive", "spam"] as const;
export const contentValueEnum = pgEnum("contentValue", contentValues);
export type ContentValueEnum = (typeof contentValues)[number];

export const categoryColorEnum = pgEnum("categoryColor", categoryColor);

export const Wave = pgTable("wave", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  summary: text("summary").notNull(),

  openStartDate: timestamp("openStartDate", {
    mode: "date",
    withTimezone: true,
  }).notNull(),
  denoisingStartDate: timestamp("denoisingStartDate", {
    mode: "date",
    withTimezone: true,
  }).notNull(),
  assesmentStartDate: timestamp("assesmentStartDate", {
    mode: "date",
    withTimezone: true,
  }).notNull(),
  closeDate: timestamp("closeDate", {
    mode: "date",
    withTimezone: true,
  }).notNull(),

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

export const WaveRelations = relations(Wave, ({ many }) => ({
  applications: many(Application),
}));

export const Application = pgTable("application", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  summary: text("summary").notNull(),
  entityName: text("entityName").notNull(),
  duration: text("duration").notNull(),
  budget: integer("budget").notNull(),

  teamSummary: text("teamSummary").notNull(),

  idea: text("idea").notNull(),
  reason: text("reason").notNull(),
  state: text("state").notNull(),
  goals: text("goals").notNull(),
  requirements: text("requirements").notNull(),

  tbd: text("tbd").notNull(),

  imageId: uuid("imageId").references(() => Image.id, {
    onDelete: "cascade",
  }),
  waveId: integer("waveId")
    .notNull()
    .references(() => Wave.id, { onDelete: "cascade" }),
  userId: text("userId")
    .notNull()
    .references(() => User.id, { onDelete: "cascade" }),
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

export const ApplicationRelations = relations(Application, ({ one, many }) => ({
  wave: one(Wave, {
    fields: [Application.waveId],
    references: [Wave.id],
  }),
  user: one(User, {
    fields: [Application.userId],
    references: [User.id],
  }),
  comments: many(Comment),
  members: many(Member),
}));

export const Member = pgTable("member", {
  id: uuid("id").defaultRandom().primaryKey(),
  applicationId: uuid("applicationId")
    .notNull()
    .references(() => Application.id, { onDelete: "cascade" }),
  imageId: uuid("imageId").references(() => Image.id, {
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

export const MemberRelations = relations(Member, ({ one }) => ({
  application: one(Application, {
    fields: [Member.applicationId],
    references: [Application.id],
  }),
  image: one(Image, {
    fields: [Member.imageId],
    references: [Image.id],
  }),
}));

export const Comment = pgTable("comment", {
  id: uuid("id").defaultRandom().primaryKey(),
  content: text("content").notNull(),
  applicationId: uuid("applicationId")
    .notNull()
    .references(() => Application.id, { onDelete: "cascade" }),
  userId: text("userId")
    .notNull()
    .references(() => User.id, { onDelete: "cascade" }),
  replyTargetId: uuid("repliesTo"),
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

export const CommentRelations = relations(Comment, ({ one }) => ({
  application: one(Application, {
    fields: [Comment.applicationId],
    references: [Application.id],
  }),
  user: one(User, {
    fields: [Comment.userId],
    references: [User.id],
  }),
  review: one(Review),
  commentValue: one(CommentValue, {
    fields: [Comment.id],
    references: [CommentValue.commentId],
  }),
  repliesTo: one(Comment, {
    fields: [Comment.replyTargetId],
    references: [Comment.id],
  }),
}));

export const CommentValue = pgTable(
  "commentValue",
  {
    commentId: uuid("commentId")
      .notNull()
      .references(() => Comment.id, { onDelete: "cascade" }),
    userId: text("userId")
      .notNull()
      .references(() => User.id, { onDelete: "cascade" }),
    value: contentValueEnum("value").notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.commentId, table.userId] }),
  }),
);

export const Review = pgTable(
  "review",
  {
    commentId: uuid("commentId")
      .notNull()
      .references(() => Comment.id, { onDelete: "cascade" }),
    userId: text("userId")
      .notNull()
      .references(() => User.id, { onDelete: "cascade" }),
    applicationId: uuid("applicationId")
      .notNull()
      .references(() => Application.id, { onDelete: "cascade" }),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.userId, table.applicationId],
    }),
  }),
);

export const ReviewRelations = relations(Review, ({ one }) => ({
  comment: one(Comment, {
    fields: [Review.commentId],
    references: [Comment.id],
  }),
  user: one(User, {
    fields: [Review.userId],
    references: [User.id],
  }),
  application: one(Application, {
    fields: [Review.applicationId],
    references: [Application.id],
  }),
}));

export const ApplicationValue = pgTable(
  "applicationValue",
  {
    applicationId: uuid("applicationId")
      .notNull()
      .references(() => Application.id, { onDelete: "cascade" }),
    userId: text("userId")
      .notNull()
      .references(() => User.id, { onDelete: "cascade" }),
    value: contentValueEnum("value").notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.applicationId, table.userId] }),
  }),
);

export const User = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
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

export const Image = pgTable("image", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => User.id, { onDelete: "cascade" }),
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

export const Category = pgTable("category", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  color: categoryColorEnum("color").notNull(),
  waveId: integer("waveId")
    .notNull()
    .references(() => Wave.id, { onDelete: "cascade" }),
});
