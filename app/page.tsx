"use client"
import CityPicker from "@/components/CityPicker"
import { Card, Divider, Subtitle } from "@tremor/react"
export default function Home() {
  return (
    <div className="min-h-screen bg-primary p-10 flex flex-col justify-center">
      <Card className="max-w-4xl mx-auto bg-white">
        <h1 className="text-6xl font-bold text-center mb-10">Weather APP</h1>
        <Subtitle className="text-xl text-center">
          Powered by Next.js 13, Tailwindcss, Tremor * More!
        </Subtitle>
        <Divider className="my-10" />
        <Card className="bg-primary rounded-md">
          <CityPicker />
        </Card>
      </Card>
    </div>
  )
}
