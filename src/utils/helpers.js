export function urlize (str = '') {
  return typeof str !== 'string'
  ? ''
  : encodeURIComponent(str).toLowerCase().replace(/%20/g,'_');
}