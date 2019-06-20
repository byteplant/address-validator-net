export const isValidAPIKey = (apikey: string): boolean =>
  apikey.substring(2, 3) === '-' && /^[a-f0-9]{32}$/g.test(apikey.substring(3))
