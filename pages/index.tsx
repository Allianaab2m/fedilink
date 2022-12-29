import LoginStatus from "../components/LoginStatus"

export default function Home() {
  return (
    <>
      <LoginStatus />
      <div className="h-screen w-screen flex flex-col justify-center items-center">
        <h1 className="text-9xl">Fedilink</h1>
        <p>Link your fediverse account</p>
        <input className="input input-bordered max-m-xs" type="text" placeholder="Search..." />
      </div>
    </>
  )
}
