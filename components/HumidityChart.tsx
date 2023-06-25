"use client"
import { AreaChart, Card, Title } from "@tremor/react"
import React from "react"

type Props = {
  results: Root
}

const FOR_HOURS = 24

const HumidityChart = ({ results }: Props) => {
  const hourly = results?.hourly.time
    .map((time) =>
      new Date(time).toLocaleString("en-US", {
        hour: "numeric",
        hour12: false,
      })
    )
    .slice(0, FOR_HOURS)

  const data = hourly.map((hour, index) => ({
    time: +hour,
    "Humidity (%)": results.hourly.relativehumidity_2m?.[index],
  }))

  return (
    <Card>
      <Title>Humidity Levels</Title>
      <AreaChart
        className="mt-6"
        data={data}
        showLegend
        index="time"
        categories={["Humidity (%)"]}
        colors={["teal"]}
        minValue={0}
        maxValue={100}
        valueFormatter={(value: number) => `${value}%`}
        yAxisWidth={40}
      />
    </Card>
  )
}

export default HumidityChart
