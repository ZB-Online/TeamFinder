import Comment from './Post/Comment.js';
import Header from './Common/Header.js';
import PostList from './Home/PostList.js';
import Writing from './Writing/Writing.js';
import Setting from './Setting/Setting.js';

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

const SettingComponent = $parent => {
  new Setting({
    $parent,
    initialState: {},
  });
};

const routes = {
  '/': MainComponent,
  '/index.html': MainComponent,
  '/posts': CommentComponent,
  '/writing': WritingComponent,
  '/setting': SettingComponent,
};

export default function App($app) {
  this.state = {
    isRoot: false,
  };

  new Header({
    $parent: $app,
    initialState: {},
  });

  window.onpopstate = function () {
    const url = document.location.pathname.split(':')[0];
    $app.removeChild($app.lastChild);
    routes[url]($app);
  };

  routes['/']($app);
}
