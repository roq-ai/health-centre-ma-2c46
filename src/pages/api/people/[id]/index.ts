import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { peopleValidationSchema } from 'validationSchema/people';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.people
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getPeopleById();
    case 'PUT':
      return updatePeopleById();
    case 'DELETE':
      return deletePeopleById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getPeopleById() {
    const data = await prisma.people.findFirst(convertQueryToPrismaUtil(req.query, 'people'));
    return res.status(200).json(data);
  }

  async function updatePeopleById() {
    await peopleValidationSchema.validate(req.body);
    const data = await prisma.people.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deletePeopleById() {
    const data = await prisma.people.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
