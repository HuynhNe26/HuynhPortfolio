import { MongoClient } from 'mongodb';
import type { Db } from 'mongodb';
import type { Admin, Message, Profile, Project, RateLimit, Session } from './models.js';

let client: MongoClient | undefined;
let connection: Promise<Db> | undefined;

export class DatabaseConfigurationError extends Error {
  constructor() {
    super('Add MONGODB_URI to backend/.env to enable the database.');
    this.name = 'DatabaseConfigurationError';
  }
}

export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.MONGODB_URI?.trim());
}

export async function getDatabase(): Promise<Db> {
  if (!isDatabaseConfigured()) {
    throw new DatabaseConfigurationError();
  }

  if (!connection) {
    client = new MongoClient(process.env.MONGODB_URI!, {
      maxPoolSize: 10,
      minPoolSize: 0,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
      socketTimeoutMS: 10000,
      waitQueueTimeoutMS: 5000,
    });

    const currentClient = client;

    connection = currentClient.connect().then(async () => {
      const database = currentClient.db(process.env.MONGODB_DB || 'nh_huynh');
      await createIndexes(database);
      return database;
    }).catch(async (error: unknown) => {
      connection = undefined;
      await currentClient.close();
      throw error;
    });
  }

  return connection;
}

export async function createIndexes(database: Db): Promise<void> {
  await Promise.all([
    database.collection('projects').createIndex({
      slug: 1
    }, {
      unique: true
    }),
    database.collection('projects').createIndex({
      published: 1,
      featured: -1,
      createdAt: -1
    }),
    database.collection('sessions').createIndex({
      expiresAt: 1
    }, {
      expireAfterSeconds: 0
    }),
    database.collection('rateLimits').createIndex({
      expiresAt: 1
    }, {
      expireAfterSeconds: 0
    }),
    database.collection('messages').createIndex({
      createdAt: -1
    }),
  ]);
}

export async function collections() {
  const database = await getDatabase();

  return {
    projects: database.collection<Project>('projects'),
    profiles: database.collection<Profile>('profiles'),
    admins: database.collection<Admin>('admins'),
    sessions: database.collection<Session>('sessions'),
    rateLimits: database.collection<RateLimit>('rateLimits'),
    messages: database.collection<Message>('messages'),
  };
}

export async function closeDatabase(): Promise<void> {
  await client?.close();
  connection = undefined;
  client = undefined;
}
