import { SunIcon } from "@heroicons/react/solid"
import React from "react"

const Loading = () => {
  return (
    <div className="bg-gradient-to-br from-[#394f68] to-[#18387e] min-h-screen flex flex-col items-center justify-center text-slate-500">
      <SunIcon className="h-24 w-24 animate-bounce text-yellow-500" />
      <h1 className="text-6xl font-bold text-center mb-10 animate-pulse">
        Loading City Weather Information
      </h1>
      <h1 className="text-xl font-bold text-center mb-10 animate-pulse">
        Hold on, we are crunching the numbers &amp; generating an AI summary of
        the weather
      </h1>
    </div>
  )
}

export default Loading
