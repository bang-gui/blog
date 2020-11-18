import client from './client';

export const writeComment = ({ id, body }) =>
  client.post(`/api/posts/${id}/comments`, { body });

export const listComments =  (id) =>
  client.get(`/api/posts/${id}/comments`);
