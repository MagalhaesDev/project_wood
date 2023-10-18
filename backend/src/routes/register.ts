import { FastifyInstance } from "fastify";
import { z } from 'zod';
import { prisma } from "../lib/prisma";

export async function registerRoutes(app: FastifyInstance) {
    
    app.get('/register',async () => {
        const register = await prisma.register.findMany();

        return register;
      })
    
      app.post('/register', async(request, response) => {
        const paramsBody = z.object( {
          name: z.string(),
          type: z.enum(["provider", "category", "locale"]),
        }
        )
      
        const register = paramsBody.parse(request.body)
      
        try {
          await prisma.register.create({
             data: {
              ...register,
              date: new Date(), 
             }    
          })
      
          return response.status(200)
      
        } catch (err) {
          return response.status(500)
        }
        })
 }