// eslint-disable-next-line no-undef
const client = axios.create({
  baseURL: '/',
});

client.defaults.headers.post['Content-Type'] = 'application/json';

export default client;
