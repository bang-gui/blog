import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CommentsViewer from '../../components/comments/CommentsViewer';
import { changeInput, writeComment } from '../../modules/comments';

const CommentsViewerContainer = ({ match, history }) => {
  const { postId } = match.params;

  const body = useSelector((state) => state.comments.body);
  const dispatch = useDispatch();

  const onChangeCommentInput = useCallback(
    (body) => dispatch(changeInput(body)),
    [dispatch],
  );

  const onWriteComment = () => {
    dispatch(writeComment(postId, body));
  };

  return (
    <CommentsViewer
      onChangeCommentInput={onChangeCommentInput}
      body={body}
      onWriteComment={onWriteComment}
    />
  );
};

export default withRouter(CommentsViewerContainer);
