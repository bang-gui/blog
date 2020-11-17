import Post from '../../models/post';
import Comment from '../../models/comment';
import mongoose from 'mongoose';
import Joi from 'joi';
import sanitizeHtml from 'sanitize-html';

const sanitizeOption = {
  allowedTags: [
    'h1',
    'h2',
    'b',
    'i',
    'u',
    's',
    'p',
    'ul',
    'ol',
    'li',
    'blockquote',
    'a',
    'img',
  ],
  allowedAttributes: {
    a: ['href', 'name', 'target'],
    img: ['src'],
    li: ['class'],
  },
  allowedSchemes: ['data', 'http'],
};

export const write = async ctx => {

  const body = ctx.request.body.body;

  const comment = new Comment({
    post: ctx.params.id,
    author: ctx.state.user._id,
    body: body.toString(),
  });

  try {
    console.log(ctx.state.user._id,);
    await comment.save();
    ctx.body = comment;
  } catch (e) {
    ctx.throw(500, e);
  }
};
