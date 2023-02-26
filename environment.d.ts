declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SANITY_TOKEN: string
      MONGO_URI: string
      BASE_URL: string
      USER: string
      PASS: string
      SERVICE: string
      HOST: string
      SECURE: boolean
      EMAIL_PORT: number
      JWT_SECRET_KEY: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}