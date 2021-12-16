const store = {
  state: {
    post: {},
  },
  loggedIn: true,
  authUser: { id: 2, nickname: '호랑이' },
  // // observer
  // listeners: [],
  notify() {
    console.log('[STATE]', this.state);
    // this.listeners.forEach(listener => listener(this.state));
  },
  // get posts() {
  //   return this.state.posts;
  // },
  set post(newPost) {
    this.state.post = newPost;
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

const uploadComment = async (postId, comment) => {
  try {
    const { data: post } = await axios.post(`/api/posts/${postId}/comments`, { comment });
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

export { getPost, endedPost, deletePost, uploadComment, modifyComment, deleteComment };

// getPost(POST_ID);

// endedPost(POST_ID, false);

// deletePost(POST_ID);

// uploadComment(POST_ID, {
//   content: 'heelo',
//   date: todayFormat(),
//   owner: store.authUser,
// });

// modifyComment(POST_ID, 2, 'change content');

// deleteComment(POST_ID, 2);
