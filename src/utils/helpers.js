// converts a string into a url-friendly string
export function urlize (str = '') {
  return typeof str !== 'string'
  ? ''
  : encodeURIComponent(str).toLowerCase().replace(/%20/g,'_');
}

// capitalize a string
export function capitalize (str = '') {
  return typeof str !== 'string'
    ? ''
    : str[0].toUpperCase() + str.slice(1)
}