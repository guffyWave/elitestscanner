import { useDebugValue, useEffect, useReducer } from 'react';
import {
  TestStripSubmissionItem,
  TestStripSubmissionListResponse,
} from '../model/testStripSubmissionList';
import { fetchTestStripsSubmisionAPI } from '../service/api';

interface TestStripSubmissionListState {
  testStripSubmissionItemList: TestStripSubmissionItem[];
  isLoading: boolean;
  errorMessage: string | null;
}

const initialState: TestStripSubmissionListState = {
  testStripSubmissionItemList: [],
  isLoading: false,
  errorMessage: '',
};

type Action =
  | { type: 'FETCH_SUBMISSIONS'; payload: object }
  | { type: 'SUBMISSIONS_FETCH_SUCCEDED'; payload: TestStripSubmissionItem[] }
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
        testStripSubmissionItemList: action.payload,
        errorMessage: '',
      };
    case 'SUBMISSIONS_FETCH_FAILED':
      return { ...state, isLoading: false, errorMessage: action.payload };
    default:
      return state;
  }
};

export const useTestStripSubmission = () => {
  const [submissionsState, dispatch] = useReducer(reducerFunction, initialState);

  useDebugValue('Debug TestStripSubmission Hook');

  const fetchTestStripSubmissionList = () => {
    dispatch({ type: 'FETCH_SUBMISSIONS', payload: {} });

    fetchTestStripsSubmisionAPI()
      .then((response: TestStripSubmissionListResponse | undefined) => {
        let submissionsList: TestStripSubmissionItem[] = [];

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
          payload: submissionsList,
        });
      })
      .catch((error) => {
        dispatch({ type: 'SUBMISSIONS_FETCH_FAILED', payload: error.message });
      })
      .finally();
  };

  useEffect(() => {
    fetchTestStripSubmissionList();
  }, []);

  return {
    testStripSubmissionItemList: submissionsState?.testStripSubmissionItemList,
    isLoading: submissionsState?.isLoading,
    errorMessage: submissionsState?.errorMessage,
    fetchTestStripSubmissionList: fetchTestStripSubmissionList,
  };
};
