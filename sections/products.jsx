import { Suspense } from "react"
import { client } from "../lib/client"

const products = async () => {

    const productsQuery = '*[_type == "dish"]'
    const products = await client.fetch(productsQuery)
    console.log(products)

    return (

            <Suspense fallback={
        <>
            loading...
        </>
        }>

        </Suspense>
    )
}

export default products
