'use client'
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"


export default function Error() {
  const queryPaarams = useSearchParams()
  return (
    <div>
      <Suspense>
        <h1>ERROR {queryPaarams.get("code")} - {queryPaarams.get("error")}</h1>
        <p>{queryPaarams.get("message")}</p>
      </Suspense>
    </div>
  )
}
