"use client"

import axios from "axios"
import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"

export default function () {
  const [msg, setMsg] = useState("loading..")
  const jwtToken = useSearchParams().get("t")
  useEffect(() => {
    axios
      .post("/api/auth/verify", { jwtToken })
      .then((res) => setMsg(res.data.message))
  }, [])
  return <div>{msg}</div>
}
