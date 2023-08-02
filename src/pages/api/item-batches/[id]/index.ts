import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { itemBatchValidationSchema } from 'validationSchema/item-batches';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.item_batch
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getItemBatchById();
    case 'PUT':
      return updateItemBatchById();
    case 'DELETE':
      return deleteItemBatchById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getItemBatchById() {
    const data = await prisma.item_batch.findFirst(convertQueryToPrismaUtil(req.query, 'item_batch'));
    return res.status(200).json(data);
  }

  async function updateItemBatchById() {
    await itemBatchValidationSchema.validate(req.body);
    const data = await prisma.item_batch.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteItemBatchById() {
    const data = await prisma.item_batch.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
