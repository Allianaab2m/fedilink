import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from "@prisma/client"
import { Account } from '@prisma/client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Account[]>
) {
  if (req.method === "GET") {
    const { holderName } = req.query
    const prisma = new PrismaClient()
    if (!holderName || Array.isArray(holderName)) return res.status(400).end()

    const accounts = await prisma.account.findMany({
      where: {
        holderName: holderName
      }
    })

    if (accounts.length !== 0) {
      return res.status(200).send(accounts)
    } else {
      return res.status(404).end()
    }
  } else if (req.method === "PUT") {
    const { holderName, instanceName, accountName } = req.query
    const prisma = new PrismaClient()
    if (!holderName || Array.isArray(holderName)) return res.status(400).end()
  } else {
    return res.status(405)
  }
}

