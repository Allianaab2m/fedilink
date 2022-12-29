import { NextRequest, NextResponse } from "next/server";

export const middleware = (req: NextRequest) => {
  if (req.method === "POST" || req.method === "DELETE" || req.method === "PUT") {
    const key = req.headers.get('key')
    if (!key || key !== process.env.API_KEY) {
      return NextResponse.json({error: "Key is undefined"})
    } else {
      return NextResponse.next()
    }
  }
}

export default middleware
