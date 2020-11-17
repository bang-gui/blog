import Post from '../../models/post';
import Comment from '../../models/comment';
import mongoose from 'mongoose';
import Joi from 'joi';

export const write = async ctx => {
  const schema = Joi.object().keys({
    // 객체가 다음 필드를 가지고 있음을 검증
    body: Joi.string().required(),
  });

  // 검증 후, 검증 실패시 에러처리
  const result = Joi.validate(ctx.request.body, schema);
  if (result.error) {
    ctx.status = 400; // Bad Request
    ctx.body = result.error;
    return;
  }

  const { body } = ctx.request.body;
  const comment = new Comment({
    post: ctx.state.post._id,
    author: ctx.state.user._id,
    body: body,
  });
  try {
    await comment.save();
    ctx.body = comment;
  } catch (e) {
    ctx.throw(500, e);
  }
};
