import { pgTable, text, serial, integer, boolean, timestamp, jsonb, varchar, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  fullName: text("full_name"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const templates = pgTable("templates", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  formats: text("formats").notNull(),
  filePath: text("file_path").notNull(),
  isFree: boolean("is_free").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const dailyTips = pgTable("daily_tips", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(),
  date: timestamp("date").defaultNow().notNull(),
});

export const userProgress = pgTable("user_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  completedQuickWins: jsonb("completed_quick_wins").default([]),
  quizState: text("quiz_state").default("start"),
  quizAnswers: jsonb("quiz_answers").default({}),
  quizResults: jsonb("quiz_results"),
  progressPercentage: integer("progress_percentage").default(0),
  lastUpdated: timestamp("last_updated").defaultNow().notNull(),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  clientName: varchar("client_name", { length: 255 }),
  clientEmail: varchar("client_email", { length: 255 }),
  clientPhone: varchar("client_phone", { length: 50 }),
  address: text("address"),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  estimatedValue: decimal("estimated_value", { precision: 10, scale: 2 }),
  status: varchar("status", { length: 50 }).default("pending"),
  priority: varchar("priority", { length: 20 }).default("medium"),
  files: jsonb("files").default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const projectTeams = pgTable("project_teams", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").references(() => projects.id).notNull(),
  teamName: varchar("team_name", { length: 100 }).notNull(),
  members: jsonb("members").default([]),
  assignedTasks: text("assigned_tasks"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const projectUpdates = pgTable("project_updates", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").references(() => projects.id).notNull(),
  teamId: integer("team_id").references(() => projectTeams.id),
  updateBy: varchar("update_by", { length: 255 }).notNull(),
  updateType: varchar("update_type", { length: 50 }).default("progress"),
  message: text("message").notNull(),
  photos: jsonb("photos").default([]),
  hoursWorked: decimal("hours_worked", { precision: 5, scale: 2 }),
  completionPercentage: integer("completion_percentage"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const projectComments = pgTable("project_comments", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").references(() => projects.id).notNull(),
  updateId: integer("update_id").references(() => projectUpdates.id),
  authorName: varchar("author_name", { length: 255 }).notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  fullName: true,
});

export const insertTemplateSchema = createInsertSchema(templates).pick({
  name: true,
  description: true,
  formats: true,
  filePath: true,
  isFree: true,
});

export const insertDailyTipSchema = createInsertSchema(dailyTips).pick({
  title: true,
  content: true,
  category: true,
  date: true,
});

export const insertUserProgressSchema = createInsertSchema(userProgress).pick({
  userId: true,
  completedQuickWins: true,
  quizState: true,
  quizAnswers: true,
  quizResults: true,
  progressPercentage: true,
});

export const insertProjectSchema = createInsertSchema(projects).pick({
  userId: true,
  title: true,
  description: true,
  clientName: true,
  clientEmail: true,
  clientPhone: true,
  address: true,
  startDate: true,
  endDate: true,
  estimatedValue: true,
  status: true,
  priority: true,
  files: true,
});

export const insertProjectTeamSchema = createInsertSchema(projectTeams).pick({
  projectId: true,
  teamName: true,
  members: true,
  assignedTasks: true,
});

export const insertProjectUpdateSchema = createInsertSchema(projectUpdates).pick({
  projectId: true,
  teamId: true,
  updateBy: true,
  updateType: true,
  message: true,
  photos: true,
  hoursWorked: true,
  completionPercentage: true,
});

export const insertProjectCommentSchema = createInsertSchema(projectComments).pick({
  projectId: true,
  updateId: true,
  authorName: true,
  message: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Template = typeof templates.$inferSelect;
export type DailyTip = typeof dailyTips.$inferSelect;
export type UserProgress = typeof userProgress.$inferSelect;
export type Project = typeof projects.$inferSelect;
export type ProjectTeam = typeof projectTeams.$inferSelect;
export type ProjectUpdate = typeof projectUpdates.$inferSelect;
export type ProjectComment = typeof projectComments.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type InsertProjectTeam = z.infer<typeof insertProjectTeamSchema>;
export type InsertProjectUpdate = z.infer<typeof insertProjectUpdateSchema>;
export type InsertProjectComment = z.infer<typeof insertProjectCommentSchema>;
