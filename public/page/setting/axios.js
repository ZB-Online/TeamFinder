const client = axios.create({
  baseURL: '/api/',
  timeout: 1000,
});

const baseUsers = axios.create({
  baseURL: '/',
  timeout: 1000,
});

const usersNickname = axios.create({
  baseURL: '/',
  method: 'PATCH',
  headers: { 'content-Type': 'application/json' },
  timeout: 1000,
});

export { client, baseUsers, usersNickname };
