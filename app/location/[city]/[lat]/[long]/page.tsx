import React from "react"
import { getClient } from "@/apollo-client"
import fetchWeatherQuery from "@/graphql/queries/fetchWeatherQueries"
import { CheckCircleIcon, ExclamationIcon } from "@heroicons/react/solid"
import { Callout } from "@tremor/react"
import StatCard from "@/components/StatCard"
import InfoPanel from "@/components/InfoPanel"
import TemperatureChart from "@/components/TemperatureChart"
import RainChart from "@/components/RainChart"
import HumidityChart from "@/components/HumidityChart"
import CalloutCard from "@/components/CalloutCard"
import cleanData from "@/utils/cleanData"
import getBasePath from "@/utils/getBasePath"

export const revalidate = 60

type Props = {
  params: {
    city: string
    lat: string
    long: string
  }
}

async function WeatherPage({ params: { city, lat, long } }: Props) {
  const client = getClient()
  const { data } = await client.query({
    query: fetchWeatherQuery,
    variables: {
      current_weather: "true",
      longitude: long,
      latitude: lat,
      timezone: "GMT",
    },
  })

  const results: Root = data.myQuery
  const payload = cleanData(results, city)
  let response

  try {
    response = await fetch(`${getBasePath()}/api/generate-weather-summary`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        weatherData: payload,
      }),
    }).then((res) => res.json())
    console.log(response)
  } catch (e: any) {
    console.log(e.message)
  }

  return (
    <div className="flex flex-col min-h-screen md:flex-row">
      <InfoPanel results={results} city={city} lat={lat} long={long} />
      <div className="flex-1 p-5 lg:p-10">
        <div className="p-5">
          <div className="pb-5">
            <h2 className="text-xl font-bold">Todays Overview:</h2>
            <p className="text-sm text-gray-400">
              Last Updated at:
              {new Date(results.current_weather.time).toLocaleString()} (
              {results.timezone})
            </p>
          </div>
          <div className="m-2 mb-10">
            <Callout
              className="mt-4"
              title={
                response ??
                "No summary available as openai api calls are exhausted. Please try again later."
              }
              icon={response ? ExclamationIcon : CheckCircleIcon}
              color={response ? "rose" : "red"}
            />
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 m-2">
            <StatCard
              title="Maximum Temperature"
              metric={`${results.daily.temperature_2m_max[0].toFixed(1)}°`}
              color="yellow"
            />
            <StatCard
              title="Minimum Temperature"
              metric={`${results.daily.temperature_2m_min[0].toFixed(1)}°`}
              color="green"
            />
            {results.daily.uv_index_max?.length > 0 && (
              <div>
                <StatCard
                  title="UV Index"
                  metric={results.daily.uv_index_max?.[0].toFixed(1)}
                  color="rose"
                />
                {Number(results.daily.uv_index_max?.[0]?.toFixed(1)) > 5 && (
                  <CalloutCard
                    title="The UV is high today, be sure to wear SPF!"
                    color={"red"}
                  />
                )}
              </div>
            )}
            <div className="flex space-x-3">
              <StatCard
                metric="Wind Speed"
                title={`${results.current_weather.windspeed.toFixed(1)} m/s`}
                color="cyan"
              />
              <StatCard
                metric="Wind Direction"
                title={`${results.current_weather.winddirection.toFixed(1)}°`}
                color="violet"
              />
            </div>
          </div>
        </div>
        <hr className="mb-5" />
        <div className="space-y-3">
          <TemperatureChart results={results} />
          <RainChart results={results} />
          <HumidityChart results={results} />
        </div>
      </div>
    </div>
  )
}

export default WeatherPage
