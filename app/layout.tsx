import "./globals.css"

export const metadata = {
  title: "Weather App",
  description: "Weather App created by Basit",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
