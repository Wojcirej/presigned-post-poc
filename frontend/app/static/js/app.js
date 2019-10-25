const getPresignedPostLink = async() => {
  const credentials = await fetchCredentials();
  storePresignedPostLink(credentials);
};

const fetchCredentials = async() => {
  const response = await fetch('http://localhost:3000/upload_credentials.json');
  const myJson = await response.json();
  return myJson;
};

const storePresignedPostLink = (link) => {
  sessionStorage.setItem('link', JSON.stringify(link));
};

const getPresignedPostLinkFromStorage = () => {
  return JSON.parse(sessionStorage.getItem('link'));
}

getPresignedPostLink();
