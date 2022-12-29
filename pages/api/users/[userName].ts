import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from "@prisma/client"
import { User } from '@prisma/client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User>
) {
  const { userName } = req.query
  if (!userName || Array.isArray(userName)) return res.status(400) 

  if (req.method === "GET") {
    const prisma = new PrismaClient()
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        name: userName
      }
    }).catch(() => {
      res.status(404).end()
      return null
    })

    if (user) {
      console.log(user)
      return res.status(200).send(user)
    }
  } else if (req.method === "POST") {
    // register, need key
    const { instanceName, accountName } = req.query

    if (
      !instanceName
      || !accountName
      || Array.isArray(instanceName)
      || Array.isArray(accountName)
     ) return res.status(400).end()

    const prisma = new PrismaClient()
    await prisma.user.create({
      data: {
        name: userName,
        accounts: {
          create: {
            name: accountName,
            instanceName,
          }
        }
      }
    })
    .catch((e) => res.status(400).send(e))
    .then(() => res.status(200).end())
  } else if (req.method === "PUT") {
    // update, need key
    const { userName } = req.query

    if (
      !userName || Array.isArray(userName)
     ) return res.status(400).end()

     const prisma = new PrismaClient()
     await prisma.user.update({
       where: {
         name: userName
       },
       data: {
       }
     })
  } else {
    return res.status(405)
  }
}
