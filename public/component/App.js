import Header from './Common/Header.js';
import Main from './Home/Main.js';
import PostDetail from './Post/PostDetail.js';
import Writing from './Writing/Writing.js';
import Setting from './Setting/Setting.js';

export const ROUTE_TYPE = {
  HOME: '/',
  POSTS: '/posts',
  WRITING: '/writing',
  SETTING: '/setting',
};

export const routes = {
  '/': $parent => new Main({ $parent }),
  '/index.html': $parent => new Main({ $parent }),
  '/posts': $parent => new PostDetail({ $parent }),
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
