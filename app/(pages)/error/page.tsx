'use client'
import { useSearchParams } from "next/navigation"

export default function Error() {
  const queryPaarams = useSearchParams()
  return (
    <div>
      <h1>ERROR {queryPaarams.get("code")} - {queryPaarams.get("error")}</h1>
      <p>{queryPaarams.get("message")}</p>
    </div>
  )
}
