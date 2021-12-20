import Comment from './Post/Comment.js';
import Header from './Common/Header.js';
import PostList from './Post/PostList.js';
import Writing from './Writing/Writing.js';

export default function App($app){
  this.state = {
    isRoot : false,
  };

  const header = new Header({
    $app,
    initialState : {},
    onClick : () => {
      new Writing({
        $app,
        initialState:{},
      });
    },
  });

  const postView = new PostList({
    $app,
    initialState : {
      isRoot :this.state.isRoot,
    },
    onClick : target => {
      if(!target.classList.contains('post')) return;
      new Comment({
        $app,
        initialState:{
          postId : target.dataset.id,
        },
      });
    },
  });

  this.setState = nextState => {
    this.state = nextState;
    header.setState(this.state);
    postView.setState(this.state);
  };
}
