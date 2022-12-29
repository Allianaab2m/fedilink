import type { NextApiRequest, NextApiResponse } from 'next'
import { User, Account, PrismaClient } from "@prisma/client"

type ResponseType = {
  id: number,
  name: string,
  accounts: Account[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
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

    const accounts = await prisma.account.findMany({
      where: {
        holderName: userName
      }
    })

    if (user) {
      console.log(user)
      console.log(accounts)
      return res.status(200).send({
        id: user.id,
        name: user.name,
        accounts: accounts
      })
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
