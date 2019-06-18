import axios from 'axios'

import { isValidAPIKey } from './isValidAPIKey'
import { serializeInputObject } from './serializeInputObject'

const API_URL_VERIFY = 'https://api.address-validator.net/api/verify'
const API_URL_AUTOCOMPLETE = 'https://api.address-validator.net/api/search'
const API_URL_RETRIEVAL = 'https://api.address-validator.net/api/fetch'

export interface IAddressVInput {
  AdditionalAddressInfo?: string
  City: string
  CountryCode?: string
  PostalCode: string
  State?: string
  Locale?: string
  StreetAddress: string
  Timeout?: number
}

export interface IAddressACInput {
  Query: string
  CountryCode?: string
  Locale?: string
  MaxResults?: number
  Timeout?: number
}

export interface IAddressRInput {
  ID: string
  Locale?: string
  Timeout?: number
}

// => https://www.address-validator.net/de/api.html
type EStatusErrors =
  | 'DELAYED'
  | 'RATE_LIMIT_EXCEEDED'
  | 'API_KEY_INVALID_OR_DEPLETED'
  | 'RESTRICTED'
  | 'INTERNAL_ERROR'

type EVStatus = 'VALID' | 'SUSPECT' | 'INVALID' | EStatusErrors

type EUnverifiedStatus = 'UNVERIFIED' | EStatusErrors

interface IAddressResponse {
  addressline1: string
  addressline2?: string
  addressline3?: string
  formattedaddress: string
  street: string
  streetnumber: string
  postalcode: string
  city: string
  district?: string
  county?: string
  state?: string
  country: string
}

export interface IAddressVResponse extends IAddressResponse {
  status: EVStatus
  rdi?: string
}

export interface IAddressRResponse extends IAddressResponse {
  status: EUnverifiedStatus
}

export interface IAddressACResponse {
  status: EUnverifiedStatus
  results: [
    {
      id: string
      description: string
    },
  ]
}

const addressValidatorInstance = async (
  apiKey: string,
  addressInput: IAddressVInput,
): Promise<IAddressVResponse> => {
  const url = `${API_URL_VERIFY}?APIKey=${apiKey}&${serializeInputObject({
    ...addressInput,
  })}`

  const { data } = await axios.get(url)
  return data
}

const addressAutoCompleteInstance = async (
  apiKey: string,
  addressInput: IAddressACInput,
): Promise<IAddressACResponse> => {
  const url = `${API_URL_AUTOCOMPLETE}?APIKey=${apiKey}&${serializeInputObject({
    ...addressInput,
  })}`

  const { data } = await axios.get(url)
  return data
}

const addressRetrievalInstance = async (
  apiKey: string,
  addressInput: IAddressRInput,
): Promise<IAddressRResponse> => {
  const url = `${API_URL_RETRIEVAL}?APIKey=${apiKey}&${serializeInputObject({
    ...addressInput,
  })}`

  const { data } = await axios.get(url)
  return data
}

export default (apiKey: string) => {
  if (!isValidAPIKey(apiKey)) {
    throw new Error('No valid API Key!')
  }
  return {
    autocomplete: (address: IAddressACInput) =>
      addressAutoCompleteInstance(apiKey, address),
    retrieve: (address: IAddressRInput) =>
      addressRetrievalInstance(apiKey, address),
    validate: (address: IAddressVInput) =>
      addressValidatorInstance(apiKey, address),
  }
}
