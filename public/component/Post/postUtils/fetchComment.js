import { client } from '../../../api/axios.js';
import renderComments from './comment.js';

// Fake Data
const POST_ID = 1;
const store = {
  comments: [],
  authUser: { id: 1, nickname: '호랑이' },
};

// GET - maybe confilct
const getPost = async () => {
  await client
    .get(`/api/posts/${POST_ID}`)
    .then(res => res.data)
    .then(([post]) => {
      store.comments = post.comments;
    });

  renderComments(store);
};

// POST
const uploadComment = async comment => {
  await client
    .post(`/api/posts/${POST_ID}/comments`, comment)
    .then(res => res.data)
    .then(([post]) => {
      store.comments = post.comments;
    });

  renderComments(store);
};

// PATCH
const patchComment = async (commentId, content) => {
  await client
    .patch(`/api/posts/${POST_ID}/comments/${commentId}`, content)
    .then(res => res.data)
    .then(([post]) => {
      store.comments = post.comments;
    });

  renderComments(store);
};

// DELETE
const deleteComment = async commentId => {
  await client
    .delete(`/api/posts/${POST_ID}/comments/${commentId}`)
    .then(res => res.data)
    .then(([post]) => {
      store.comments = post.comments;
    });

  renderComments(store);
};

export default {
  getPost,
  uploadComment,
  patchComment,
  deleteComment,
};
