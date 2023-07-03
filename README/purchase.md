1. the main page.tsx fetches the products from sanity.ts, and fetches the reviews from mongodb
2. these are all the reviews of all the products combined, so we order them based on the selected product
3. when a user selects a product, a modal with beautiful display pops up, mapping all the product's props
4. the props contain:

```typescript
export interface Product {
  name: string
  slogan?: string
  price: number
  image: object
  noBgImages: {
    color: string
    colorName: string
    images: object[]
    sizes: number[]
  }[]
}
// array of reviews
interface Review {
  product: string
  username: string
  userID: string
  img?: string
  rating: number
  comment: string
}
```

- note: a noBgImages object contains a color and it's colorName, it's images, and it's currently available sizes
- note: the product string in the review object allows us to know to which product this review belongs.

5. the user adds a product to the bag, we save the product to a mongodb cart because it contains product options that
   shouldn't be tampered with, in order to do that we have to make the user have an account first so we don't get spammed.
6. in the addToBag server action we redirect the user to login if he isn't logged already.
7. the user logs in and attempts to buy again.
8. we pass the following props to the addToBag server action:

```typescript
interface props {
  product: string
  qty: number
  chosenOptions: {
    size: number
    color: string
    colorName: string
  }
}
```

8. we update the cart in the user db model.
9. the user heads to the checkout page and attempts to checkout (to be continued..)

- successfully purchased the product, only now can the user review the product.
