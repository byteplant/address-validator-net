import AddressValidator from '..'

const { WORKING_APIKEY } = process.env

if (WORKING_APIKEY === undefined) {
  throw Error(
    `'WORKING_APIKEY' needs to be provided using environment variables`,
  )
}

const ADDRESSV = {
  City: 'Ocholt',
  CountryCode: 'de',
  PostalCode: '26655',
  StreetAddress: 'Mühlenstraße 26',
}
const ADDRESS_ID = { ID: 'WFR7sEMtAp2323YTbCGdecjpUk-ax35tEA' }
const ADDRESSAC = {
  CountryCode: 'de',
  Query: 'Mühlenstraße 26, westerstede',
}

test('Create instance of AddressValidator', () => {
  expect(() => AddressValidator('')).toThrow()

  expect(AddressValidator(WORKING_APIKEY)).toMatchObject({
    autocomplete: expect.anything(),
    retrieve: expect.anything(),
    validate: expect.anything(),
  })
})

test('Use instance to check address', async () => {
  const { validate: instance } = AddressValidator(WORKING_APIKEY)
  const call = instance(ADDRESSV)

  expect(call).toBeInstanceOf(Promise)

  const response = await call

  expect(response).toMatchObject({
    addressline1: 'Mühlenstr. 26',
    addressline3: '26655 Westerstede',
    city: 'Westerstede',
    country: 'DE',
    formattedaddress: 'Mühlenstr. 26,26655 Westerstede',
    postalcode: '26655',
    state: 'Niedersachsen',
    status: 'SUSPECT',
    street: 'Mühlenstr.',
    streetnumber: '26',
  })
})

test('Use instance to autocomplete address', async () => {
  const { autocomplete: instance } = AddressValidator(WORKING_APIKEY)
  const call = instance(ADDRESSAC)

  expect(call).toBeInstanceOf(Promise)

  const response = await call

  expect(response).toMatchObject({
    results: [
      {
        "description": "Mühlenstraße 26, Westerstede, Germany",
        "id": "VmtWb45sfH0Wk84xf_s08pjEPMD5",
      },
      {
        "description": "Große Mühlenstraße 26, Westerstede, Germany",
        "id": "IUdyb8OfZSBNw7xobGVuc3RyYcOfZSAyNiwgV2VzdGVyc3RlZGUsIEdlcm1hbnk",
      },
    ],
    status: 'UNVERIFIED',
  })
})

test('Use instance to retrieve address', async () => {
  const { retrieve: instance } = AddressValidator(WORKING_APIKEY)
  const call = instance(ADDRESS_ID)

  expect(call).toBeInstanceOf(Promise)

  const response = await call

  expect(response).toMatchObject({
    addressline1: 'Mühlenstraße 26',
    addressline3: '26655 Westerstede',
    city: 'Westerstede',
    country: 'DE',
    formattedaddress: 'Mühlenstraße 26,26655 Westerstede',
    postalcode: '26655',
    state: 'Niedersachsen',
    status: 'UNVERIFIED',
    street: 'Mühlenstraße',
    streetnumber: '26',
  })
})
