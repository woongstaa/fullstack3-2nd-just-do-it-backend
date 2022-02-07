import app from '../app';
import request, { agent } from 'supertest';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
let result;
const email = 'test@example.com';

// afterAll(async () => {});

describe('카트 API', () => {
  test('회원가입 및 가입되어있으면 로그인', async () => {
    result = await agent(app) // supertest에 app.js를 넣어줘서 미들웨어 실행되는 효과를 모킹한다.
      .post('/user/signin') // 클라이언트에서 post 라우팅 한 효과
      .send({
        email: email,
        name: 'test',
      })
      .expect(200);

    await request(app)
      .post('/cart')
      .set('token', result.body.token)
      .send({ style_code: 'AAA-0001', size: '230', quantity: 6, is_member: 0 });
    expect(201);
  });
});
