import Link from "next/link"
import Image from "next/image"

type Props = {
    instanceName: string,
    accountName: string,
    accountIconUrl: string,
}

const AccountCard = (props: Props) => {
  return (
      <Link href={`https://${props.instanceName}/@${props.accountName}`}>
        <div className="card card-side w-96 bg-base-100 shadow-xl">
          <figure>
            <Image 
              src={props.accountIconUrl}
              height={128}
              width={128}
              alt="AccountIcon"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{props.accountName}</h2>
            <p>{"@" + props.instanceName}</p>
          </div>
        </div>
      </Link>
    )
}

export default AccountCard
