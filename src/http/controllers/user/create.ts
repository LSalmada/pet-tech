import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeCreateUserUseCase } from '@/use-cases/factory/make-create-user-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    username: z.string(),
    password: z.string(),
  })

  const { username, password } = registerBodySchema.parse(request.body)

  const createUserUseCase = makeCreateUserUseCase()

  const user = await createUserUseCase.handler({ username, password })

  return reply.status(201).send(user)
}
