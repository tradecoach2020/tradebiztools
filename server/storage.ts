import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq } from 'drizzle-orm';
import type { 
  User, 
  Template, 
  DailyTip, 
  UserProgress,
  Project,
  ProjectTeam,
  ProjectUpdate,
  ProjectComment,
  InsertUser,
  InsertProject,
  InsertProjectTeam,
  InsertProjectUpdate,
  InsertProjectComment
} from '../shared/schema.js';
import * as schema from '../shared/schema.js';

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

export interface IStorage {
  // User methods
  getUsers(): Promise<User[]>;
  createUser(user: InsertUser): Promise<User>;
  getUserById(id: number): Promise<User | null>;
  
  // Template methods
  getTemplates(): Promise<Template[]>;
  
  // Daily tips methods
  getDailyTips(): Promise<DailyTip[]>;
  
  // User progress methods
  getUserProgress(userId: number): Promise<UserProgress[]>;
  
  // Project methods
  getProjects(): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  getProjectById(id: number): Promise<Project | null>;
  
  // Project team methods
  getProjectTeams(projectId: number): Promise<ProjectTeam[]>;
  createProjectTeam(team: InsertProjectTeam): Promise<ProjectTeam>;
  
  // Project update methods
  getProjectUpdates(projectId: number): Promise<ProjectUpdate[]>;
  createProjectUpdate(update: InsertProjectUpdate): Promise<ProjectUpdate>;
  
  // Project comment methods
  getProjectComments(projectId: number): Promise<ProjectComment[]>;
  createProjectComment(comment: InsertProjectComment): Promise<ProjectComment>;
}

class DatabaseStorage implements IStorage {
  async getUsers(): Promise<User[]> {
    return await db.select().from(schema.users);
  }

  async createUser(user: InsertUser): Promise<User> {
    const [newUser] = await db.insert(schema.users).values(user).returning();
    return newUser;
  }

  async getUserById(id: number): Promise<User | null> {
    const [user] = await db.select().from(schema.users).where(eq(schema.users.id, id));
    return user || null;
  }

  async getTemplates(): Promise<Template[]> {
    return await db.select().from(schema.templates);
  }

  async getDailyTips(): Promise<DailyTip[]> {
    return await db.select().from(schema.dailyTips);
  }

  async getUserProgress(userId: number): Promise<UserProgress[]> {
    return await db.select().from(schema.userProgress).where(eq(schema.userProgress.userId, userId));
  }

  async getProjects(): Promise<Project[]> {
    return await db.select().from(schema.projects);
  }

  async createProject(project: InsertProject): Promise<Project> {
    const [newProject] = await db.insert(schema.projects).values(project).returning();
    return newProject;
  }

  async getProjectById(id: number): Promise<Project | null> {
    const [project] = await db.select().from(schema.projects).where(eq(schema.projects.id, id));
    return project || null;
  }

  async getProjectTeams(projectId: number): Promise<ProjectTeam[]> {
    return await db.select().from(schema.projectTeams).where(eq(schema.projectTeams.projectId, projectId));
  }

  async createProjectTeam(team: InsertProjectTeam): Promise<ProjectTeam> {
    const [newTeam] = await db.insert(schema.projectTeams).values(team).returning();
    return newTeam;
  }

  async getProjectUpdates(projectId: number): Promise<ProjectUpdate[]> {
    return await db.select().from(schema.projectUpdates).where(eq(schema.projectUpdates.projectId, projectId));
  }

  async createProjectUpdate(update: InsertProjectUpdate): Promise<ProjectUpdate> {
    const [newUpdate] = await db.insert(schema.projectUpdates).values(update).returning();
    return newUpdate;
  }

  async getProjectComments(projectId: number): Promise<ProjectComment[]> {
    return await db.select().from(schema.projectComments).where(eq(schema.projectComments.projectId, projectId));
  }

  async createProjectComment(comment: InsertProjectComment): Promise<ProjectComment> {
    const [newComment] = await db.insert(schema.projectComments).values(comment).returning();
    return newComment;
  }
}

export const storage: IStorage = new DatabaseStorage();