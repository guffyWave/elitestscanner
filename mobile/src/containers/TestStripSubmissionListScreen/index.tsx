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
    const {
      testStripSubmissionItemList,
      isLoading,
      errorMessage,
      fetchTestStripSubmissionList,
      loadMore,
    } = useTestStripSubmission();

    const ErrorView = lazy(() => import('../../components/ErrorView'));

    const renderItem = ({ item }: { item: TestStripSubmissionItem }) => (
      <SubmissionListItemView item={item} />
    );

    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Your scan history </Text>
        {isLoading && !testStripSubmissionItemList.length ? (
          <ActivityIndicator size={'large'} />
        ) : null}

        {errorMessage ? (
          <Suspense fallback={<ActivityIndicator size="small" />}>
            <ErrorView message={errorMessage} />
          </Suspense>
        ) : null}

        <FlatList
          data={testStripSubmissionItemList}
          keyExtractor={(item) => item?.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          refreshing={isLoading}
          onRefresh={fetchTestStripSubmissionList}
          onEndReached={() => loadMore()}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isLoading && testStripSubmissionItemList?.length ? (
              <ActivityIndicator size="small" />
            ) : null
          }
        />
      </SafeAreaView>
    );
  }
);

export default TestStripSubmissionListScreen;
