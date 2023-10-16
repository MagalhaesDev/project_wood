import { FastifyInstance } from "fastify";
import { z } from 'zod';
import { prisma } from "../lib/prisma";

export async function activesRoutes(app: FastifyInstance) {

app.get('/actives',async () => {
  const products = await prisma.actives.findMany();

  return products;
})

app.get('/actives/:id',async (request) => {
  const paramsSchema = z.object( {
    id: z.string().uuid(),
  })

  const { id } = paramsSchema.parse(request.params)

  const product = await prisma.actives.findUniqueOrThrow({
    where: {
      id,
    }
  })

  return product;
})

app.post('/actives', async(request, response) => {
  const paramsBody = z.object( {
    category: z.string(),
    description: z.string(),
    value_buy: z.number(),
    provider: z.string(),
    nf: z.string(),
    rate: z.coerce.number(),
    locale: z.string(),
    date_buy: z.coerce.date(),
    life_util: z.coerce.date()
  }
  )

  const active = paramsBody.parse(request.body)

  try {
    await prisma.actives.create({
      data: {
        ...active
      }   
    })

    return response.status(200)

  } catch (err) {
    return response.status(500)
  }
  })
   
  app.delete('/actives/:id', async (request) => {
    const paramsSchema = z.object( {
      id: z.string().uuid(),
    })

    const {id} = paramsSchema.parse(request.params)

    await prisma.actives.delete({
      where: {
        id,
      }
    })
  })

}
