declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // sanity
      SANITY_TOKEN: string
      SANITY_WEBHOOK_SECRET: string
      NEXT_PUBLIC_SANITY_PROJECT_ID?: string
      NEXT_PUBLIC_SANITY_DATASET?: string
      NEXT_PUBLIC_SANITY_API_VERSION?: string
      // nodemailer
      USER: string
      PASS: string
      // misc
      MONGO_URI: string
      BASE_URL: string
      JWT_SECRET_KEY: string
      // stripe
      NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string
      STRIPE_SECRET_KEY: string
      STRIPE_WEBHOOK_SECRET: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
