export const isValidAPIKey = (apikey: string): boolean =>
  apikey.substring(0, 3) === 'av-' &&
  /^[a-f0-9]{32}$/g.test(apikey.substring(3))
