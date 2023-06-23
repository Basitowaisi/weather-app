"use client"
import React, { useState } from "react"
import { Country, City } from "country-state-city"
import Select from "react-select"
import { useRouter } from "next/navigation"
import { GlobeIcon } from "@heroicons/react/solid"

type CountryOption = {
  value: {
    latitude: string
    longitude: string
    isoCode: string
  }
  label: string
} | null

type CityOption = {
  value: {
    latitude: string
    longitude: string
    countryCode: string
    name: string
    stateCode: string
  }
  label: string
} | null

const CityPicker = () => {
  const [country, setCountry] = useState<CountryOption>(null)
  const [city, setCity] = useState<CityOption>(null)
  const router = useRouter()

  const options = Country.getAllCountries().map((country) => ({
    label: country.name,
    value: {
      latitude: country.latitude,
      longitude: country.longitude,
      isoCode: country.isoCode,
    },
  }))

  const onSelectCountry = (country: CountryOption) => {
    setCountry(country)
    setCity(null)
  }

  const onSelectCity = (city: CityOption) => {
    setCity(city)
    router.push(
      `/location/${city?.value.name}/${city?.value.latitude}/${city?.value.longitude}`
    )
  }

  const selectedCountry = country?.value.isoCode as string

  const citySelectionOptions =
    City.getCitiesOfCountry(selectedCountry)?.map((city) => ({
      label: city.name,
      value: {
        latitude: city.latitude as string,
        longitude: city.longitude as string,
        countryCode: city.countryCode,
        name: city.name,
        stateCode: city.stateCode,
      },
    })) ?? []

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-white/80">
          <GlobeIcon className="h-5 w-5 text-white" />
          <label htmlFor="country">Country</label>
        </div>
        <Select
          options={options}
          className="text-black"
          onChange={onSelectCountry}
          value={country}
        />
      </div>
      {country && (
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-white/80">
            <GlobeIcon className="h-5 w-5 text-white" />
            <label htmlFor="country">City</label>
          </div>
          <Select
            options={citySelectionOptions}
            className="text-black"
            onChange={onSelectCity}
            value={city}
          />
        </div>
      )}
    </div>
  )
}

export default CityPicker
