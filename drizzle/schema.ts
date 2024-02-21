import type { AdapterAccount } from "@auth/core/adapters";
import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

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

export const applications = pgTable("application", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  waveId: integer("waveId")
    .notNull()
    .references(() => waves.id),
  userId: text("userId")
    .notNull()
    .references(() => users.id),
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
  }),
);

export const comments = pgTable("comment", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  applicationId: integer("applicationId")
    .notNull()
    .references(() => applications.id),
  userId: text("userId")
    .notNull()
    .references(() => users.id),
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
}));

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
