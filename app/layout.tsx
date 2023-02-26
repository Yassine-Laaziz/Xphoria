import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { fetchData, urlFor } from "../lib/sanity"
import "../styles/globals.css"
import { Config } from "../types"

async function RootLayout({ children }: { children: React.ReactNode }) {
  const config: Config = await fetchData('*[_type == "config"][0]', true)

  return (
    <html lang="en">
      <head>
      <link rel="icon" href={urlFor(config.logo).url()} />     
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{config.brand}</title>
      <link rel="preconnect" href="https://stijndv.com" />
      <link
        rel="stylesheet"
        href="https://stijndv.com/fonts/Eudoxus-Sans.css"
      />
      </head>
      <body>
        <Navbar brand={config.brand} loggedIn={false} />
        {children}
        <Footer config={config} />
      </body>
    </html>
  )
}

export default RootLayout
