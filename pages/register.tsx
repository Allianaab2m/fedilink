import { ChangeEvent, Dispatch, SetStateAction, useState } from "react"

const Register = () => {
  return (
    <>
      <label htmlFor="register-misskey" className="btn">
        Register with <img
          src="https://raw.githubusercontent.com/misskey-dev/assets/main/icon.png"
          className="h-6 w-6"
        />
      </label>

      <label htmlFor="register-mastodon" className="btn">
        Register with <img
          src="https://raw.githubusercontent.com/misskey-dev/assets/main/icon.png"
          className="h-6 w-6"
        />
      </label>
      <input type="checkbox" id="register-misskey" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-fit">
          アカウント情報を入力してください。<br />
          <div className="flex justify-center px-36">
            <p>@</p><input type="text" placeholder="ID" className="input input-bordered"/>
            <p>@</p><input type="text" placeholder="Instance" className="input input-bordered"/>
          </div>
        </div>
      </div>
      <input type="checkbox" id="register-mastodon" className="modal-toggle" />
    </>
  )
}

export default Register
