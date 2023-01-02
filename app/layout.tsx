import Footer from "../components/Footer"
import "../styles/globals.css"

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <head>
      <link rel="preconnect" href="https://stijndv.com" />
      <link
        rel="stylesheet"
        href="https://stijndv.com/fonts/Eudoxus-Sans.css"
      />
    </head>
    <body>
      {children}
      <Footer />
    </body>
  </html>
)

export default RootLayout
