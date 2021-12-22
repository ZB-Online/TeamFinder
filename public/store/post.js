import { todayFormat } from '../utils/date.js';

const store = {
  state: {
    post: {},
    likeActive: false,
    loggedIn: !!localStorage.teamfinderId,
  },
  postListeners: [],
  notify() {
    console.log('[STATE]', this.state);
    this.postListeners.forEach(listener => listener(this.state));
  },
  get post() {
    return this.state.post;
  },
  set post(newPost) {
    this.state.post = newPost;
    this.notify();
  },
  set likeActive(activeState) {
    this.state.likeActive = activeState;
  },
  get editActive() {
    return this.state.editActive;
  },
  get loggedIn() {
    return !!localStorage.teamfinderId;
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

const editPost = async (postId, newPost) => {
  try {
    const { data: post } = await axios.patch(`/api/posts/${postId}`, newPost);
    store.post = post;
  } catch (e) {
    console.error(e);
  }
};

const deletePost = async postId => {
  try {
    await axios.delete(`/api/posts/${postId}`);
  } catch (e) {
    console.error(e);
  }
};

const changeLikeCount = async (postId, likeActive) => {
  try {
    if (!store.loggedIn) throw new Error('로그인이 필요함.');

    const { data: post } = await axios.patch(`/api/posts/${postId}/like`, { likeActive });

    store.likeActive = !likeActive;
    store.post = post;
  } catch (e) {
    console.error(e);
  }
};

const uploadComment = async (postId, content) => {
  try {
    if (!store.loggedIn) throw new Error('로그인이 필요함.');

    const { data: post } = await axios.post(`/api/posts/${postId}/comments`, {
      content,
      date: todayFormat(),
      owner: { id: localStorage.teamfinderId, nickname: localStorage.teamfinderNickname },
    });
    store.post = post;
  } catch (e) {
    console.error(e);
  }
};

const editComment = async (postId, commentId, content) => {
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
  editPost,
  deletePost,
  changeLikeCount,
  uploadComment,
  editComment,
  deleteComment,
};
