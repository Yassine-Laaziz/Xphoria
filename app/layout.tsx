import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { fetchData } from "../lib/sanity"
import "../styles/globals.css"
import { Config } from "../types"

async function RootLayout({ children }: { children: React.ReactNode }) {
  let config: Config = await fetchData('*[_type == "config"][0]', true)

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://stijndv.com" />
        <link
          rel="stylesheet"
          href="https://stijndv.com/fonts/Eudoxus-Sans.css"
        />
      </head>
      <body>
        <Navbar brand={config.brand} loggedIn={false} />
        {children}
        <Footer />
      </body>
    </html>
  )
}

export default RootLayout
