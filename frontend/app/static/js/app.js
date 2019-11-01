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

const uploadFile = async(element) => {
  const formData = new FormData();
  const file = element.files[0];
  const path = 'tmp/' + Date.now() + '/' + file.name;
  const credentials = getPresignedPostLinkFromStorage();

  formData.append('Content-Type', file.type);
  formData.append('key', path);

  for(key in credentials.fields) {
    formData.append(key, credentials.fields[key]);
  };

  formData.append('file', file);
  const result = await uploadToS3(credentials.url, formData);
};

const uploadToS3 = async(url, payload) => {
  return await fetch(url, {
    method: 'post',
    body: payload,
  });
};

getPresignedPostLink();
