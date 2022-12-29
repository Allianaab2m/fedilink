import { NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const UserPage: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const { query, isReady, push } = useRouter()
  const { userName } = query

  useEffect(() => {
      if (isReady) {
          setLoading(true)
      }
  }, [isReady, userName])

  if (!loading) return <p>Loading...</p>

  if (!userName) {
      push('/404')
      return null
  }

  return (
    <p>{userName}</p>
  )
}

export default UserPage
