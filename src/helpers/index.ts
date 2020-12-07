/*
 * Helper methods
 **/
export const getIdsInUrls = (urlArr: string[] = []): string => {
  return urlArr.reduce((prev, curr) => {
    return (prev += `${curr.split('/')[curr.split('/').length - 1]},`);
  }, '');
};

export const getQueryParam = (name: string, url: string): string => {
  name = name.replace(/[[\]]/g, '\\$&');
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return '';
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};
