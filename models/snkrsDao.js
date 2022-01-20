import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const updata = async (bool, style_code) => {
  return await prisma.$queryRaw`
    UPDATE
      products
    SET
      is_member = ${bool}
    WHERE
      style_code = ${style_code}
  `;
};

export default {};
