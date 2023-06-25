"use client"
import { AreaChart, Card, Title } from "@tremor/react"
import React from "react"

type Props = {
  results: Root
}

const FOR_HOURS = 24

const TemperatureChart = ({ results }: Props) => {
  const hourly = results?.hourly.time
    .map((time) =>
      new Date(time).toLocaleString("en-US", {
        hour: "numeric",
        hour12: true,
      })
    )
    .slice(0, FOR_HOURS)

  const data = hourly.map((hour, index) => ({
    time: +hour,
    "UV Index": results.hourly.uv_index?.[index],
    "Temperature °C": results.hourly.temperature_2m?.[index],
  }))

  return (
    <Card>
      <Title>Temperature &amp; UV Index</Title>
      <AreaChart
        className="mt-6"
        data={data}
        showLegend
        index="time"
        categories={["Temperature °C", "UV Index"]}
        colors={["yellow", "rose"]}
        minValue={0}
        yAxisWidth={40}
      />
    </Card>
  )
}

export default TemperatureChart
