import Router from 'koa-router';
import checkLoggedIn from '../../lib/checkLoggedIn';

const comments = new Router();

comments.post('/',ctx =>{
    ctx.body = '댓글 포스트'
});
comments.get('/',ctx =>{
    ctx.body = '댓글 겟'
});
comments.delete('/commentsId')


export default comments;