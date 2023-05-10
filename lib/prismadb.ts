import { PrismaClient } from '@prisma/client';

const client = new PrismaClient() || global.prismadb;

if(process.env.NODE_ENV === 'production') global.prismadb = client;

export default client;