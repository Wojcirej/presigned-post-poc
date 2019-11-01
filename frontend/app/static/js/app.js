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

const generateS3Destination = filename => 'tmp/' + Date.now() + '/' + filename;

const prepareUploadPayload = (file, path, credentials) => {
  const formData = new FormData();

  formData.append('Content-Type', file.type);
  formData.append('key', path);

  for(key in credentials.fields) {
    formData.append(key, credentials.fields[key]);
  };

  formData.append('file', file);
  return formData;
};

const uploadFile = async(element) => {
  const file = element.files[0];
  const path = generateS3Destination(file.name);
  const credentials = getPresignedPostLinkFromStorage();
  const payload = prepareUploadPayload(file, path, credentials);

  try {
    const result = await uploadToS3(credentials.url, payload);
    const publicLink = await getPublicLink(path);

    setImagePreview(publicLink);
    clearFileInput();
  }
  catch(error) {
    alert('Error while trying to upload image, please try again later');
  };
};

const uploadToS3 = async(url, payload) => {
  return await fetch(url, {
    method: 'post',
    body: payload,
  });
};

const getPublicLink = async(key) => {
  const result = await fetch(`http://localhost:3000/presigned_url?key=${key}`);
  const json = await result.json();
  return json.presignedUrl;
};

const setImagePreview = (imageUrl) => {
  const imgPreview = document.getElementById('image_preview');
  imgPreview.src = imageUrl;
};

const clearFileInput = () => {
  const inputFile = document.getElementById('file_input');
  inputFile.value = '';
};

getPresignedPostLink();
