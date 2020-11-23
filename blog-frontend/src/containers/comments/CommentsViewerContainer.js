import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CommentsViewer from '../../components/comments/CommentsViewer';
import {
  changeInput,
  writeComment,
  toggleAskRemove,
} from '../../modules/comments';
import { listComments, removeComment, cancelRemoveComment } from '../../modules/comments';
import AskModal from '../../components/common/AskModal';

const CommentsViewerContainer = ({ match, history }) => {
  const { postId } = match.params;
  const dispatch = useDispatch();
  const { user, body, comments, commentId, askRemove, loading } = useSelector(
    ({ user, comments, loading }) => ({
      body: comments.body,
      comments: comments.comments,
      commentId: comments.removeComment.commentId,
      askRemove: comments.askRemove,
      loading: loading['comments/LIST_COMMENTS'],
      user: user.user,
    }),
  );
  useEffect(() => {
    console.log(match);
    dispatch(listComments(postId));
  }, [dispatch, postId]);

  const onChangeCommentInput = useCallback(
    (body) => dispatch(changeInput(body)),
    [dispatch],
  );

  const onWriteComment = useCallback(() => {
    dispatch(writeComment(postId, body));
  });

  const onToggleAskRemove = useCallback((commentId) => {
    dispatch(toggleAskRemove(commentId));
  });

  const onCancelRemoveComment = useCallback(()=>{
    dispatch(cancelRemoveComment())
  });

  const onConfirmRemove = useCallback(() => {
    console.log('삭제');
    dispatch(removeComment(postId, commentId));
  });

  return (
    <>
      <CommentsViewer
        loading={loading}
        user={user}
        body={body}
        onChangeCommentInput={onChangeCommentInput}
        onWriteComment={onWriteComment}
        comments={comments}
        onToggleAskRemove={onToggleAskRemove}
      />
      <AskModal
        title="댓글 삭제"
        description="이 댓글을 정말로 삭제하시겠습니까?"
        confirmText="삭제하기"
        cancelText="취소"
        onConfirm={onConfirmRemove}
        onCancel={onCancelRemoveComment}
        visible={askRemove}
      />
    </>
  );
};

export default withRouter(CommentsViewerContainer);
