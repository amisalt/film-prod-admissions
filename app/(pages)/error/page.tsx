'use client'
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

function DisplayError(){
  const queryPaarams = useSearchParams()
  return (
    <>
    <h1>ERROR {queryPaarams.get("code")} - {queryPaarams.get("error")}</h1>
    <p>{queryPaarams.get("message")}</p>
    </>
  )
}

export default function Error() {
  return (
    <div>
      <Suspense>
        <DisplayError/>
      </Suspense>
    </div>
  )
}
