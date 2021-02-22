const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;
const mainUrl = 'https://api.unsplash.com/photos/';
const searchUrl = 'https://api.unsplash.com/search/photos/';

export const getUrl = (query, urlPage, urlQuery) => {
  let url;
  if (query) {
    url = `${searchUrl}${clientID}${urlPage}${urlQuery}`;
  } else {
    url = `${mainUrl}${clientID}${urlPage}`;
  }
  return url;
};
