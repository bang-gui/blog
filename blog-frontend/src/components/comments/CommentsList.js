import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import palette from '../../lib/styles/palette';
import SubInfo from '../common/SubInfo';

const CommentsListBlock = styled(Responsive)`
  margin-top: 3rem;
`;
const CommentItemBlock = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
  /* 맨 위 포스트는 padding-top 없음 */
  &:first-child {
    padding-top: 0;
  }
  & + & {
    border-top: 1px solid ${palette.gray[2]};
  }
  p {
    margin-top: 1rem;
  }
`;

const CommentItem = ({ comment }) => {
  return (
    <CommentItemBlock>
      <SubInfo
        username={comment.author.username}
        publishedDate={comment.createdAt}
      />
      {/* comment.author.username */}
      <p>{comment.body}</p>
    </CommentItemBlock>
  );
};

const CommentsList = ({loading, comments}) => {
  return (
    <CommentsListBlock>
        <div>
        {!loading && comments && (
        <div>
          {comments.map(comment => (
            <CommentItem comment={comment} key={comment._id} />
          ))}
        </div>
      )}
        </div>
    </CommentsListBlock>
  );
};

export default CommentsList;
