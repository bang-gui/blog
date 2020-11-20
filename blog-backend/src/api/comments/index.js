import Router from 'koa-router';
import * as commentsCtrl from './comments.ctrl';

const comments = new Router();

comments.post('/', commentsCtrl.write);

comments.get('/', commentsCtrl.list);

//comments.delete('/:commentsId', commentsCtrl.remove);

export default comments;
