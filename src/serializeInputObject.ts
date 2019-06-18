export const serializeInputObject = (input: {
  [x: string]: string | number | undefined
}) => {
  let acc = ''
  // tslint:disable-next-line: forin
  for (const key in input) {
    const value = input[key]
    if (value !== undefined) {
      acc += `${key}=${encodeURIComponent(value)}&`
    }
  }
  return acc.substr(0, acc.length - 1)
}
