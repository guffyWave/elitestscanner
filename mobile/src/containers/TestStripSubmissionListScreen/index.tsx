import React, { FC, lazy, Suspense, useCallback, useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import { styles } from './TestStripSubmissionListScreen.Styles';
import { useTestStripSubmission } from '../../business/useTestStripSubmission';
import SubmissionListItemView from '../../components/SubmissionListItemView';
import { TestStripSubmissionItem } from '../../model/testStripSubmissionList';
import { SafeAreaView } from 'react-native-safe-area-context';

interface TestStripSubmissionListScreenProps {
  params: object;
}

const TestStripSubmissionListScreen: FC<TestStripSubmissionListScreenProps> = React.memo(
  ({ params }) => {
    const { testStripSubmissionItemList, isLoading, errorMessage } = useTestStripSubmission();

    const ErrorView = lazy(() => import('../../components/ErrorView'));

    const renderItem = ({ item }: { item: TestStripSubmissionItem }) => (
      <SubmissionListItemView item={item} />
    );

    //pull to refresh
    // lazy loading

    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Your scan history </Text>
        {isLoading ? <ActivityIndicator size={'large'} /> : null}

        {errorMessage ? (
          <Suspense fallback={<ActivityIndicator size="small" />}>
            <ErrorView message={errorMessage} />
          </Suspense>
        ) : null}

        <FlatList
          data={testStripSubmissionItemList}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
      </SafeAreaView>
    );
  }
);

export default TestStripSubmissionListScreen;
