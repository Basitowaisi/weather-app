"use client"
import CityPicker from "@/components/CityPicker"
import { Card, Divider, Subtitle, Text } from "@tremor/react"
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#394f68] to-[#18387e] p-10 flex flex-col justify-center">
      <Card className="max-w-4xl mx-auto bg-white">
        <Text className="text-6xl font-bold text-center mb-10">
          Weather APP
        </Text>
        <Subtitle className="text-xl text-center">
          Powered by Next.js 13, Tailwindcss, Tremor * More!
        </Subtitle>
        <Divider className="my-10" />
        <Card className="bg-gradient-to-br from-[#394f68] to-[#18387e] rounded-md">
          <CityPicker />
        </Card>
      </Card>
    </div>
  )
}
