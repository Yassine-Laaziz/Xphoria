type Result = { isCorrect: boolean; err: string }
export default function clientSideCheck(user: {
  email: string
  username: string
}): Result {
  let result: Result = { isCorrect: true, err: '' }
  if (!user.username) result.isCorrect = false
  else {
    if (!/^[A-Za-z0-9_]{2,17}$/.test(user.username))
      setErr(
        'username must have no special characters, no less than 2 characters and no more than 17!'
      )

    // profane speech testing, if this project gets big an ai will be used for testing
    if (
      /(anal|bitch|btch|fuck|gay|rape|rapin|sex|semen|whore)/gi.test(
        user.username
      )
    )
      setErr('Your username is inappropriate please adjust your speech')
  }

  if (!user.email) result.isCorrect = false
  else {
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email))
      setErr('unvalid email address!')
  }

  function setErr(err: string) {
    result = { isCorrect: false, err }
  }

  return result
}
