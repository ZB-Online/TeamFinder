import Comment from './Post/Comment.js';
import Header from './Common/Header.js';
import PostList from './Home/PostList.js';
import Writing from './Writing/Writing.js';

const MainComponent = $parent => {
  new PostList({
    $parent,
    initialState: {},
  });
};

const CommentComponent = $parent => {
  new Comment({
    $parent,
    initialState: {},
  });
};

const WritingComponent = $parent => {
  new Writing({
    $parent,
    initialState: {},
  });
};

const routes = {
  '/': MainComponent,
  '/index.html': MainComponent,
  '/posts': CommentComponent,
  '/writing': WritingComponent,
};

export default function App ($app) {
  this.state = {
    isRoot: false,
  };

  new Header({
    $parent: $app,
    initialState: {},
  });

  window.onpopstate = function () {
    const url = document.location.pathname.split(':')[0];
    $app.lastElementChild.innerHTML = '';
    routes[url]($app);
  };

  routes['/']($app);
}
