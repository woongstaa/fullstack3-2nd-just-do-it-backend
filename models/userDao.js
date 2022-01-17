import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 이메일 불러오기
const getUserByEmail = async (email) => {};

// 계정 생성
const createUser = async () => {};

export default { createUser, getUserByEmail };
