import React, { Component } from 'react';
import styled from 'styled-components';
import TextareaAutosize from 'react-autosize-textarea';
import Button from '../../components/common/Button';

const CommentButtonBlock = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
`;

const PostCommentInput = styled.textarea`
width: 100%;
border: none;
outline: none;
font-size: 1rem;
padding: 1rem;
border: 1px solid gray;
border-radius: 4px;
resize: none;
color: gray;
display: block;
line-height: 1.5;
`;

const CommentInput = () => {
  return (<>
  <hr/>
  <PostCommentInput placeholder='댓글을 입력하세요' rows={2} maxRows={20}/>
  <CommentButtonBlock>
      <Button>댓글 작성</Button>
 </CommentButtonBlock>
  </>);
};

export default CommentInput;
