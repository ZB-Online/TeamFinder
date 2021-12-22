import Comment from './Post/Comment.js';
import Header from './Common/Header.js';
import PostList from './Home/PostList.js';
import Writing from './Writing/Writing.js';
import Setting from './Setting/Setting.js';

const routes = {
  '/': $parent => new PostList({ $parent }),
  '/index.html': $parent => new PostList({ $parent }),
  '/posts': $parent => new Comment({ $parent }),
  '/writing': $parent => new Writing({ $parent }),
  '/setting': $parent => new Setting({ $parent }),
};

export default function App($app) {
  this.state = {
    isRoot: false,
  };

  new Header({ $parent: $app, initialState: {} });

  window.onpopstate = function () {
    const url = document.location.pathname.split('?')[0];
    $app.removeChild($app.lastChild);
    routes[url]($app);
  };

  const url = document.location.pathname;
  routes[url]($app);
}
