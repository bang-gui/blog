import Router from 'koa-router';
import * as commentsCtrl from './comments.ctrl';

const comments = new Router();

comments.post('/', commentsCtrl.write);

comments.get('/', (ctx) => {
  ctx.body = '댓글 겟';
});

comments.delete('/:commentsId', (ctx) => {
  ctx.body = '댓글 델리트';
});

export default comments;
