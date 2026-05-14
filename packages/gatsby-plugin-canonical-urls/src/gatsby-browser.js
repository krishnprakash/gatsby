export const onRouteUpdate = (
  { location },
  pluginOptions = { stripQueryString: false }
) => {
  const domElem = document.querySelector(`link[rel='canonical']`)
  const existingValue = domElem.getAttribute(`href`)
  const baseProtocol = domElem.getAttribute(`data-baseProtocol`)
  const baseHost = domElem.getAttribute(`data-baseHost`)
  if (existingValue && baseProtocol && baseHost) {
    const normalizedProtocol = baseProtocol.endsWith(`:`)
      ? baseProtocol.toLowerCase()
      : `${baseProtocol.toLowerCase()}:`
    const safeProtocol =
      normalizedProtocol === `http:` || normalizedProtocol === `https:`
    const safeHost = /^[a-z0-9.-]+(?::\d+)?$/i.test(baseHost)

    if (!safeProtocol || !safeHost) {
      return
    }

    let value = `${normalizedProtocol}//${baseHost}${location.pathname}`

    const { stripQueryString } = pluginOptions

    if (!stripQueryString) {
      value += location.search
    }

    value += location.hash

    domElem.setAttribute(`href`, value)
  }
}
