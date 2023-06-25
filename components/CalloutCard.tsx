"use client"
import { Callout, Color } from "@tremor/react"
import React from "react"

type Props = {
  title: string
  color?: Color
  icon?: any
  className?: string
}

const CalloutCard = ({ title, color = "red", className, icon }: Props) => {
  return (
    <Callout title={title} color={color} className={className} icon={icon} />
  )
}

export default CalloutCard
