import { useDebugValue, useEffect, useReducer } from 'react';
import {
  TestStripSubmissionItem,
  TestStripSubmissionListResponse,
} from '../model/testStripSubmissionList';
import { fetchTestStripsSubmisionAPI } from '../service/api';

interface TestStripSubmissionListState {
  testStripSubmissionItemList: TestStripSubmissionItem[];
  isLoading: boolean;
  page: number;
  limit: number;
  errorMessage: string | null;
}

const initialState: TestStripSubmissionListState = {
  testStripSubmissionItemList: [],
  isLoading: false,
  errorMessage: '',
  page: 1,
  limit: 10,
};

type Action =
  | { type: 'FETCH_SUBMISSIONS'; payload: object }
  | {
      type: 'SUBMISSIONS_FETCH_SUCCEDED';
      payload: { list: TestStripSubmissionItem[]; page: number };
    }
  | { type: 'SUBMISSIONS_FETCH_FAILED'; payload: string };

const reducerFunction = (
  state: TestStripSubmissionListState,
  action: Action
): TestStripSubmissionListState => {
  switch (action.type) {
    case 'FETCH_SUBMISSIONS':
      return { ...state, isLoading: true, errorMessage: '' };
    case 'SUBMISSIONS_FETCH_SUCCEDED':
      return {
        ...state,
        isLoading: false,
        testStripSubmissionItemList:
          action.payload.page === 1
            ? action.payload.list
            : [...state.testStripSubmissionItemList, ...action.payload.list],
        errorMessage: '',
        page: action.payload.page,
      };
    case 'SUBMISSIONS_FETCH_FAILED':
      return { ...state, isLoading: false, errorMessage: action.payload };
    default:
      return state;
  }
};

export const useTestStripSubmission = () => {
  // @note - Flux design patterns
  const [submissionsState, dispatch] = useReducer(reducerFunction, initialState);

  useDebugValue('Debug TestStripSubmission Hook');

  const fetchTestStripSubmissionList = (page: number = 1) => {
    dispatch({ type: 'FETCH_SUBMISSIONS', payload: {} });

    fetchTestStripsSubmisionAPI(page, submissionsState.limit)
      .then((response: TestStripSubmissionListResponse | undefined) => {
        let submissionsList: TestStripSubmissionItem[] = [];

        console.log('check response ---', response);

        response?.data.forEach((_submission) => {
          submissionsList.push({
            id: _submission?.id,
            qr_code: _submission?.qr_code,
            status: _submission?.status,
            thumbnail_path: _submission?.thumbnail_path,
            created_at: _submission?.created_at,
            error_message: _submission?.error_message,
          });
        });

        dispatch({
          type: 'SUBMISSIONS_FETCH_SUCCEDED',
          payload: { list: submissionsList, page },
        });
      })
      .catch((error) => {
        dispatch({ type: 'SUBMISSIONS_FETCH_FAILED', payload: error.message });
      })
      .finally();
  };

  useEffect(() => {
    fetchTestStripSubmissionList(1);
  }, []);

  const loadMore = () => {
    if (!submissionsState.isLoading) {
      fetchTestStripSubmissionList(submissionsState.page + 1);
    }
  };

  return {
    testStripSubmissionItemList: submissionsState?.testStripSubmissionItemList,
    isLoading: submissionsState?.isLoading,
    errorMessage: submissionsState?.errorMessage,
    fetchTestStripSubmissionList: () => fetchTestStripSubmissionList(1),
    loadMore,
  };
};
