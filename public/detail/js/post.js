import { todayFormat } from '../../utils/date.js';

const store = {
  state: {
    post: {},
    likeActive: false,
  },
  // localStorage user
  _authUser: { id: 2, nickname: '원숭이' },
  postListeners: [],
  notify() {
    console.log('[Post]', this.state.post);
    this.postListeners.forEach(listener => listener(this.state, this._authUser));
  },
  get authUser() {
    return this._authUser;
  },
  get post() {
    return this.state.post;
  },
  set post(newPost) {
    this.state.post = newPost;
    this.notify();
  },
};

const subscribe = listener => {
  store.postListeners.push(listener);
};

const getPost = async postId => {
  try {
    const { data: post } = await axios(`/api/posts/${postId}`);
    store.post = post;
  } catch (e) {
    console.error(e);
  }
};

const endedPost = async postId => {
  try {
    const { data: post } = await axios.patch(`/api/posts/${postId}`);
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

const changeLikeCount = async (postId, likeActive) => {
  try {
    const { data: post } = await axios.patch(`/api/posts/${postId}/like`, { likeActive });

    store.state.likeActive = !likeActive;
    store.post = post;
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

export default {
  subscribe,
  getPost,
  endedPost,
  deletePost,
  changeLikeCount,
  uploadComment,
  modifyComment,
  deleteComment,
};
