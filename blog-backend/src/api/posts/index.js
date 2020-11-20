import Router from 'koa-router';
import comments from '../comments/index';
import * as postsCtrl from './posts.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';


const posts = new Router();

posts.get('/', postsCtrl.list);
posts.post('/', checkLoggedIn, postsCtrl.write);

const post = new Router(); // /api/posts/:id
post.get('/', postsCtrl.read);
post.delete('/', checkLoggedIn, postsCtrl.checkOwnPost, postsCtrl.remove);
post.patch('/', checkLoggedIn, postsCtrl.checkOwnPost, postsCtrl.update);
post.use('/comments',comments.routes());//댓글은 특정 포스트에서 보이기 때문에 postId가 url에 꼭 포함 되어야 한다. 

posts.use('/:id', postsCtrl.getPostById, post.routes());//get, delete, patch의 묶음이다.


export default posts;
