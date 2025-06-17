import { PrismaClient } from '@/lib/generated/prisma';

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') 
{
    globalThis.prisma = db;
}
//globalThis.prisma: This global variable ensures that the Prisma client instance is reused across hot reloads during development.
//Without this, each time your application reloads, a new Prisma client instance would be created, leading to potential issues like exceeding database connection limits.

