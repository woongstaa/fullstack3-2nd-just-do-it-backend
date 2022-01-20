import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const updataOpenClose = async (bool, style_code) => {
  return await prisma.$queryRaw`
    UPDATE
      snkrs
    SET
      is_open = ${bool}
    WHERE
      style_code = ${style_code}
  `;
};

export default { updataOpenClose };
