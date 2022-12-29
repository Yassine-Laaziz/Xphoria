"use client"

import { Suspense, useState } from "react"
import { client } from "../lib/client"
import { Product } from "../types"

const Products = () => {
  const [products, setProducts] = useState<Product[]>([])

  client('*[_type == "product"]').then((res) => {
	if (Array.isArray(res)) setProducts(res)
  })

  return (
    <h2 className="text-white">
      {products?.map((product) => (
        <h2>{product.name}</h2>
      ))}
    </h2>
  )
}

export default Products
