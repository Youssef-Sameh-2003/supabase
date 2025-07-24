export const isValidEdgeFunctionURL = (url: string) => {
  const regexValidEdgeFunctionURL = new RegExp(
    '^https://[a-z]*.skybase.(red|co)/functions/v[0-9]{1}/.*$'
  )

  return regexValidEdgeFunctionURL.test(url)
}
