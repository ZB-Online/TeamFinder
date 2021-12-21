// eslint-disable-next-line no-undef
const client = axios.create({
  baseURL: '/',
});

client.defaults.headers.post['Content-Type'] = 'application/json';
// eslint-disable-next-line no-undef
const basePosts = axios.create({
  baseURL: '/api',
  timeout: 1000,
});

// eslint-disable-next-line no-undef
const usersNickname = axios.create({
  baseURL: '/',
  method: 'PATCH',
  headers: { 'content-Type': 'application/json' },
  timeout: 1000,
});

export { client, basePosts, usersNickname };
