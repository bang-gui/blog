import client from './client';

export const writeComment = ({ id, body }) =>
  client.post(`/api/posts/${id}/comments`, { body });
