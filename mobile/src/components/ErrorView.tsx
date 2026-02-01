import React, { FC } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

// Connectivity error class
export class ConnectivityError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'Connectivity Error';
    this.message = message;
  }
}

export class InternalServerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'Internal Server Error';
    this.message = message;
  }
}

interface ErrorViewProps {
  message: string;
}

const ErrorView: FC<ErrorViewProps> = React.memo(({ message }) => {
  return (
    <View style={styles.container}>
      <Image src="https://img.icons8.com/color/96/error" style={styles.errorIcon} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    margin: 32,
    flexDirection: 'row',
  },
  message: {
    fontSize: 16,
    color: 'black',
    marginLeft: 16,
  },
  errorIcon: {
    height: 36,
    width: 36,
  },
});

export default ErrorView;
