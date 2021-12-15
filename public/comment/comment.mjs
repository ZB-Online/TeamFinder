import render from './render.mjs';

// Fake Data
const POSTING_ID = 1;
const store = {
  comments: [],
  authUser: { id: 1, nickname: '호랑이' },
};

// GET - maybe confilct
const getPosting = async () => {
  await fetch(`/api/postings/${POSTING_ID}`)
    .then(res => res.json())
    .then(([posting]) => {
      store.comments = posting.comments;
    });

  render(store);
};

// POST
const uploadComment = async comment => {
  await fetch(`/api/postings/${POSTING_ID}/comments`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(comment),
  })
    .then(res => res.json())
    .then(([posting]) => {
      store.comments = posting.comments;
    });

  render(store);
};

// PATCH
const patchComment = async (commentId, content) => {
  await fetch(`/api/postings/${POSTING_ID}/comments/${commentId}`, {
    method: 'PATCH',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ content }),
  })
    .then(res => res.json())
    .then(([posting]) => {
      store.comments = posting.comments;
    });

  render(store);
};

// DELETE
const deleteComment = async commentId => {
  await fetch(`/api/postings/${POSTING_ID}/comments/${commentId}`, { method: 'DELETE' })
    .then(res => res.json())
    .then(([posting]) => {
      store.comments = posting.comments;
    });

  render(store);
};

export default {
  getPosting,
  uploadComment,
  patchComment,
  deleteComment,
};
