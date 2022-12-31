import { NextPage } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import useSWR from "swr"
import { UserApiResponseType } from "./api/users/[userName]"
import AccountCard from "../components/AccountCard"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const UserPage: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const { query, isReady, push } = useRouter()
  const { userName } = query
  const { data, error } = useSWR<UserApiResponseType>(
    `/api/users/${userName}`,
    fetcher
  )

  useEffect(() => {
      if (isReady) {
          setLoading(true)
      }
  }, [isReady, userName])

  if (!data || !loading) return <p>Loading...</p>

  if (!userName || error) {
      push('/404')
      return null
  }

  return (
    <>
      <h1>{data.name}</h1>
      <AccountCard 
        accountIconUrl="https://placeimg.com/256/256/arch"
        accountName={data.accounts[0].name}
        instanceName={data.accounts[0].instanceName}
      />
    </>
  )
}

export default UserPage
