import { User } from "../../types"
import { Dispatch, SetStateAction } from "react"
export default function clientSideCheck(
  user: User,
  setError: Dispatch<
    SetStateAction<{
      msg: string
      showErr: boolean
    }>
  >
): boolean {
  function reset() {
    setError({
      msg: "",
      showErr: false,
    })
    return false
  }
  if (!user.username) reset()
  else {
    if (!/^[A-Za-z0-9_]{2,17}$/.test(user.username)) {
      setError({
        msg: "username must have no special characters, no less than 2 characters and no more than 17!",
        showErr: true,
      })
      return false
    }
    // profane speech testing, if this project gets big an ai will be used for testing
    if (
      /(anal|bitch|btch|fuck|gay|rape|rapin|sex|semen|whore)/gi.test(
        user.username
      )
    ) {
      setError({
        msg: "Your username is inappropriate please adjust your speech",
        showErr: true,
      })
      return false
    }
  }

  if (!user.email) return reset()
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email)) {
    setError({ msg: "uncorrect email address!", showErr: true })
    return false
  }

  setError({ msg: "", showErr: false })
  return true
}
