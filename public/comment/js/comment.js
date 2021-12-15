import render from './render.js';

// Fake Data
const POST_ID = 1;
const store = {
  comments: [],
  authUser: { id: 1, nickname: '호랑이' },
};

// GET - maybe confilct
const getpost = async () => {
  await fetch(`/api/posts/${POST_ID}`)
    .then(res => res.json())
    .then(([post]) => {
      store.comments = post.comments;
    });

  render(store);
};

// POST
const uploadComment = async comment => {
  await fetch(`/api/posts/${POST_ID}/comments`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(comment),
  })
    .then(res => res.json())
    .then(([post]) => {
      store.comments = post.comments;
    });

  render(store);
};

// PATCH
const patchComment = async (commentId, content) => {
  await fetch(`/api/posts/${POST_ID}/comments/${commentId}`, {
    method: 'PATCH',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ content }),
  })
    .then(res => res.json())
    .then(([post]) => {
      store.comments = post.comments;
    });

  render(store);
};

// DELETE
const deleteComment = async commentId => {
  await fetch(`/api/posts/${POST_ID}/comments/${commentId}`, { method: 'DELETE' })
    .then(res => res.json())
    .then(([post]) => {
      store.comments = post.comments;
    });

  render(store);
};

export default {
  getpost,
  uploadComment,
  patchComment,
  deleteComment,
};
