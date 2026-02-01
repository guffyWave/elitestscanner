import React, { FC, useCallback, useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

interface TestStripSubmissionListScreenProps {
  params: object;
}

const TestStripSubmissionListScreen: FC<TestStripSubmissionListScreenProps> = React.memo(
  ({ params }) => {
    const [state, setState] = useState<string>();

    // todo : Flat List
    //pull to refresh
    // lazy loading

    return (
      <View style={styles.container}>
        <Text style={styles.textPrimaryLarge}>TestStripSubmissionListScreen </Text>
        <Text style={styles.textSecondayLarge}>Secondary Text</Text>

        {/* FlatList */}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  textPrimaryLarge: {
    fontSize: 16,
    color: 'black',
  },
  textSecondayLarge: {
    fontSize: 14,
    color: 'grey',
  },
});

export default TestStripSubmissionListScreen;
