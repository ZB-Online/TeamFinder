import { todayFormat } from '../../utils/date.js';

const store = {
  _post: {},
  loggedIn: true,
  authUser: { id: 2, nickname: '호랑이' },
  // // observer
  // listeners: [],
  notify() {
    console.log('[Post]', this._post);
    // this.listeners.forEach(listener => listener(this.state));
  },
  get post() {
    return this._post;
  },
  set post(newPost) {
    this._post = newPost;
    this.notify();
  },
};

const getPost = async postId => {
  try {
    const { data: post } = await axios(`/api/posts/${postId}`);
    store.post = post;
  } catch (e) {
    console.error(e);
  }
};

const endedPost = async (postId, recruit) => {
  try {
    const { data: post } = await axios.patch(`/api/posts/${postId}`, { recruit });
    store.post = post;
  } catch (e) {
    console.error(e);
  }
};

const deletePost = async postId => {
  try {
    await axios.delete(`/api/posts/${postId}`);
    store.post = {};
    // redirect main page
  } catch (e) {
    console.error(e);
  }
};

const uploadComment = async (postId, content) => {
  try {
    const { data: post } = await axios.post(`/api/posts/${postId}/comments`, {
      content,
      date: todayFormat(),
      owner: store.authUser,
    });
    store.post = post;
  } catch (e) {
    console.error(e);
  }
};

const modifyComment = async (postId, commentId, content) => {
  try {
    const { data: post } = await axios.patch(`/api/posts/${postId}/comments/${commentId}`, { content });
    store.post = post;
  } catch (e) {
    console.error(e);
  }
};

const deleteComment = async (postId, commentId) => {
  try {
    const { data: post } = await axios.delete(`/api/posts/${postId}/comments/${commentId}`);
    store.post = post;
  } catch (e) {
    console.error(e);
  }
};

export default { getPost, endedPost, deletePost, uploadComment, modifyComment, deleteComment };
