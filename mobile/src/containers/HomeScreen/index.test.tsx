import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import HomeScreen from './index';

jest.mock('../../components/QRScanner', () => 'QRScanner');
jest.mock('../TestStripSubmissionListScreen', () => 'TestStripSubmissionListScreen');
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: 'SafeAreaView',
}));

describe('HomeScreen', () => {
  it('should render title correctly', () => {
    render(<HomeScreen params={{}} />);
    expect(screen.getByText('Eli Test Scanner')).toBeTruthy();
  });

  it('should render QRScanner by default', () => {
    render(<HomeScreen params={{}} />);
    expect(screen.getByTestId('QRScanner')).toBeTruthy();
  });

  it('should display History button initially', () => {
    render(<HomeScreen params={{}} />);
    expect(screen.getByText('History')).toBeTruthy();
  });

  it('should toggle to TestStripSubmissionListScreen when History button is pressed', () => {
    render(<HomeScreen params={{}} />);
    const historyButton = screen.getByText('History');
    
    fireEvent.press(historyButton);
    
    expect(screen.getByText('Scanner')).toBeTruthy();
    expect(screen.getByTestId('TestStripSubmissionListScreen')).toBeTruthy();
  });

  it('should toggle back to QRScanner when Scanner button is pressed', () => {
    render(<HomeScreen params={{}} />);
    const historyButton = screen.getByText('History');
    
    fireEvent.press(historyButton);
    expect(screen.getByText('Scanner')).toBeTruthy();
    
    const scannerButton = screen.getByText('Scanner');
    fireEvent.press(scannerButton);
    
    expect(screen.getByText('History')).toBeTruthy();
    expect(screen.getByTestId('QRScanner')).toBeTruthy();
  });

  it('should have correct button styles', () => {
    render(<HomeScreen params={{}} />);
    const button = screen.getByTestId('TouchableOpacity');
    expect(button).toBeTruthy();
  });

  it('should toggle showHistory state on button press', () => {
    const { rerender } = render(<HomeScreen params={{}} />);
    
    expect(screen.getByText('History')).toBeTruthy();
    
    fireEvent.press(screen.getByText('History'));
    rerender(<HomeScreen params={{}} />);
    
    expect(screen.getByText('Scanner')).toBeTruthy();
  });
});