import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CommentsViewer from '../../components/comments/CommentsViewer';
import { changeInput, writeComment } from '../../modules/comments';
import { listComments } from '../../modules/comments';

const CommentsViewerContainer = ({ match, history }) => {
  const { postId } = match.params;
  const dispatch = useDispatch();
  const { body, comments, loading, commentError } = useSelector(
    ({comments, loading}) => ({
      body: comments.body,
      comments: comments.comments,
      loading: loading['comments/LIST_COMMENTS'],
      commentError: comments.commentError,
    }),
  );
  useEffect(() => {
    dispatch(listComments(postId));
  }, [dispatch, postId]);

  const onChangeCommentInput = useCallback(
    (body) => dispatch(changeInput(body)),
    [dispatch],
  );

  const onWriteComment = () => {
    dispatch(writeComment(postId, body));
  };

  return (
    <CommentsViewer
      loading={loading}
      body={body}
      onChangeCommentInput={onChangeCommentInput}
      onWriteComment={onWriteComment}
      comments={comments}
    />
  );
};

export default withRouter(CommentsViewerContainer);
