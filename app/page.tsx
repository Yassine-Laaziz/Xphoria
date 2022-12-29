"use client"

import HeroBanner from "../components/HeroBanner"
import Products from "../sections/products"

const Page = () => {
  return (
    <>
      <HeroBanner />
      <div className="pb-[200vh]" />
      <Products />
    </>
  )
}

export default Page
