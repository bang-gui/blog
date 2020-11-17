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

export const changeInput = createAction(CHANGE_INPUT, (input) => input);
export const writeComment = createAction(WRITE_COMMENT, ( id, body ) => ({
  id: id,
  body: body,
}));

const writeCommentSaga = createRequestSaga(
  WRITE_COMMENT,
  commentAPI.writeComment,
);
export function* CommentSaga() {
  yield takeLatest(WRITE_COMMENT, writeCommentSaga);
}

const initialState = {
  body: '',
  comment: null,
  commentError: null,
};

const comments = handleActions(
  {
    [INITIALIZE]: (state) => initialState,
    [CHANGE_INPUT]: (state, { payload: body }) => {
      return {
        ...state,
        body: body,
      };
    },
    [WRITE_COMMENT]: state => ({
      ...state,
      // comment와 commentError를 초기화
      comment: null,
      commentError: null,
    }),
    // 댓글 작성 성공
    [WRITE_COMMENT_SUCCESS]: (state, { payload: comment }) => ({
      ...state,
      comment,
    }),
    // 댓글 작성 실패
    [WRITE_COMMENT_FAILURE]: (state, { payload: commentError }) => ({
      ...state,
      commentError,
    }),
  },
  initialState,
);

export default comments;
