"use client"
import React from "react"
import { Card, Color, Metric, Text } from "@tremor/react"
type Props = {
  title: string
  metric: string
  color?: Color
}

function StatCard({ metric, title, color }: Props) {
  return (
    <Card decorationColor={color} decoration="top">
      <Text>{title}</Text>
      <Metric>{metric}</Metric>
    </Card>
  )
}

export default StatCard
