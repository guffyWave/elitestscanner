import { InternalServerError } from '../components/ErrorView';
import { API_BASE_URL } from '../commons/constants';
import { TestStripSubmissionListResponse } from '../model/testStripSubmissionList';
import axios, { AxiosResponse } from 'axios';
import { SAMPLE_RESPONSE } from './sampleResponse';

export const fetchTestStripsSubmisionAPI = async (
  page: number,
  limit: number
): Promise<TestStripSubmissionListResponse | undefined> => {
  try {
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    // return SAMPLE_RESPOSNE;

    const res = await fetch(API_BASE_URL + '/api/test-strips?page=' + page + '&limit=' + limit);
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
    throw new Error(
      `Something went wrong. Make sure you are connected with internet. Error:` + message
    );
  }
};

/// be connect with hostpot and put ip address of machine runnig the backend
// cmd> ipconfig getifaddr en0
export const uploadScanImageAPI = async (imageUri: string) => {
  try {
    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      name: 'compressed-photo.jpg',
      type: 'image/jpeg',
    } as any);

    const response = await axios.post(API_BASE_URL + '/api/test-strips/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Something went wrong: ` + message);
  }
};
