import { InternalServerError } from '../components/ErrorView';
import { TestStripSubmissionListResponse } from '../model/testStripSubmissionList';

export const fetchTestStripsSubmisionAPI = async (): Promise<
  TestStripSubmissionListResponse | undefined
> => {
  try {
    //http://10.242.231.225:3000/api/test-strips?page=1&limit=10
    const res = await fetch('http://10.242.231.225:3000/api/test-strips?page=1&limit=10');
    if (!res?.ok) {
      throw new Error('Unable to fetch the data!');
    }
    if (res?.status === 500) {
      throw new InternalServerError('Something broke at our end !. We will fix shortly');
    }
    const data: TestStripSubmissionListResponse = await res.json();
    return data;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Something went wrong: ` + message);
  }
};
