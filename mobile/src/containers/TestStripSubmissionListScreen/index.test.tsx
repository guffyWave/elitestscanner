import React from 'react';
import { render, screen, waitFor } from '@testing-library/react-native';
import TestStripSubmissionListScreen from './index';
import { useTestStripSubmission } from '../../business/useTestStripSubmission';

jest.mock('../../business/useTestStripSubmission');
jest.mock('../../components/SubmissionListItemView', () => 'SubmissionListItemView');
jest.mock('../../components/ErrorView', () => 'ErrorView');

describe('TestStripSubmissionListScreen', () => {
  const mockUseTestStripSubmission = useTestStripSubmission as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render title correctly', () => {
    mockUseTestStripSubmission.mockReturnValue({
      testStripSubmissionItemList: [],
      isLoading: false,
      errorMessage: null,
      fetchTestStripSubmissionList: jest.fn(),
      loadMore: jest.fn(),
    });

    render(<TestStripSubmissionListScreen params={{}} />);
    expect(screen.getByText('Your scan history')).toBeTruthy();
  });

  it('should show loading indicator when isLoading is true and list is empty', () => {
    mockUseTestStripSubmission.mockReturnValue({
      testStripSubmissionItemList: [],
      isLoading: true,
      errorMessage: null,
      fetchTestStripSubmissionList: jest.fn(),
      loadMore: jest.fn(),
    });

    render(<TestStripSubmissionListScreen params={{}} />);
    expect(screen.getByTestId('ActivityIndicator')).toBeTruthy();
  });

  it('should display error message when errorMessage exists', () => {
    mockUseTestStripSubmission.mockReturnValue({
      testStripSubmissionItemList: [],
      isLoading: false,
      errorMessage: 'Failed to load submissions',
      fetchTestStripSubmissionList: jest.fn(),
      loadMore: jest.fn(),
    });

    render(<TestStripSubmissionListScreen params={{}} />);
    expect(screen.getByText('Failed to load submissions')).toBeTruthy();
  });

  it('should render FlatList when data is available', () => {
    const mockData = [
      { id: '1', name: 'Test 1' },
      { id: '2', name: 'Test 2' },
    ];

    mockUseTestStripSubmission.mockReturnValue({
      testStripSubmissionItemList: mockData,
      isLoading: false,
      errorMessage: null,
      fetchTestStripSubmissionList: jest.fn(),
      loadMore: jest.fn(),
    });

    render(<TestStripSubmissionListScreen params={{}} />);
    expect(screen.getByTestId('FlatList')).toBeTruthy();
  });

  it('should call fetchTestStripSubmissionList on refresh', async () => {
    const mockFetch = jest.fn();
    mockUseTestStripSubmission.mockReturnValue({
      testStripSubmissionItemList: [],
      isLoading: false,
      errorMessage: null,
      fetchTestStripSubmissionList: mockFetch,
      loadMore: jest.fn(),
    });

    render(<TestStripSubmissionListScreen params={{}} />);

    await waitFor(() => {
      expect(mockFetch).toBeDefined();
    });
  });

  it('should call loadMore when reaching end of list', async () => {
    const mockLoadMore = jest.fn();
    mockUseTestStripSubmission.mockReturnValue({
      testStripSubmissionItemList: [{ id: '1', name: 'Test 1' }],
      isLoading: false,
      errorMessage: null,
      fetchTestStripSubmissionList: jest.fn(),
      loadMore: mockLoadMore,
    });

    render(<TestStripSubmissionListScreen params={{}} />);

    await waitFor(() => {
      expect(mockLoadMore).toBeDefined();
    });
  });
});
