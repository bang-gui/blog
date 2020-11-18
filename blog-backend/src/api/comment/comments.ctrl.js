import Post from '../../models/post';
import Comment from '../../models/comment';
import mongoose from 'mongoose';
//import Joi from 'joi';
//import sanitizeHtml from 'sanitize-html';

export const write = async ctx => {
  const body = ctx.request.body.body;
  const comment = new Comment({
    post: ctx.params.id,
    author: ctx.state.user._id,
    body: body.toString(),
  });
  try {
    //console.log(ctx.state.user._id,);
    await comment.save();
    const comments = await Comment.find({post: ctx.params.id}).sort({createdAt:-1}).lean().exec();
    ctx.body = comments;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const list = async ctx => {
  try {
   const comments = await Comment.find({post: ctx.params.id}).sort({createdAt:-1}).lean().exec();
    ctx.body = comments;
  } catch (e) {
    ctx.throw(500, e);
  }
};