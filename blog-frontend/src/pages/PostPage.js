import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import PostViewerContainer from '../containers/post/PostViewerContainer';
import CommentsViewerContainer from '../containers/comments/CommentsViewerContainer';

const PostPage = () => {
  return (
    <>
      <HeaderContainer />
      <PostViewerContainer />
      <CommentsViewerContainer/>
    </>
  );
};

export default PostPage;
