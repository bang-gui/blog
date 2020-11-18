import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as commentAPI from '../lib/api/comments';
import { takeLatest } from 'redux-saga/effects';

const INITIALIZE = 'write/INITIALIZE'; // 모든 내용 초기화

const CHANGE_INPUT = 'comments/CHANGE_INPUT';

const [
  WRITE_COMMENT,
  WRITE_COMMENT_SUCCESS,
  WRITE_COMMENT_FAILURE,
] = createRequestActionTypes('write/WRITE_COMMENT');


const [
  LIST_COMMENT,
  LIST_COMMENT_SUCCESS,
  LIST_COMMENT_FAILURE,
] = createRequestActionTypes('list/LIST_COMMENT');


export const changeInput = createAction(CHANGE_INPUT, (body) => body);
export const writeComment = createAction(WRITE_COMMENT, (id, body) => ({
  id: id,
  body: body,
}));
export const listComments = createAction(LIST_COMMENT,(id)=> id );



const writeCommentSaga = createRequestSaga(
  WRITE_COMMENT,
  commentAPI.writeComment,
);


const listCommentSaga = createRequestSaga(
  LIST_COMMENT,
  commentAPI.listComments,
);


export function* CommentSaga() {
  yield takeLatest(WRITE_COMMENT, writeCommentSaga);
}

export function* CommentsSaga() {
  yield takeLatest(LIST_COMMENT, listCommentSaga);
}

const initialState = {
  body: '',
  comments: null,
  commentError: null,
};

const comments = handleActions(
  {
    [INITIALIZE]: (state) => initialState,
    [CHANGE_INPUT]: (state, { payload: body }) => ({
      ...state,
      body: body,
    }),
    [WRITE_COMMENT]: (state) => ({
      // comments와 commentError를 초기화
      ...state,
      body:'',
      commentError: null,
    }),
    // 댓글 작성 성공
    [WRITE_COMMENT_SUCCESS]: (state, { payload: comment }) => ({
      ...state,
      commentError:null
    }),
    // 댓글 작성 실패
    [WRITE_COMMENT_FAILURE]: (state, { payload: commentError }) => ({
      ...state,
      commentError,
    }),
    [LIST_COMMENT_SUCCESS]: (state, { payload: comments }) => ({
      ...state,
      comments,
    }),
    [LIST_COMMENT_FAILURE]: (state, { payload: commentError }) => ({
      ...state,
      commentError,
    }),
  },
  initialState,
);

export default comments;
