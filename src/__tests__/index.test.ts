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
    city: 'Westerstede,Ocholt',
    country: 'DE',
    formattedaddress: 'Ocholt,Mühlenstraße 26,26655 Westerstede',
    postalcode: '26655',
    status: 'VALID',
    street: 'Mühlenstraße',
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
        "description": "Große Mühlenstraße 26,26655 Westerstede",
        "id": "TVFxWYhd2KUY5Ys4KocqDD28F-tto-k_KF8", 
      },
      {
	"description": "Mühlenstraße 26,26655 Westerstede",
	"id": "TVBxWYltbFeTs8x4C2g-mn_V4Xdto-k_OB4",
      },
    ],
    status: 'UNVERIFIED',
  })
})

