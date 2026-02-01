import React, { FC, useCallback, useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { styles } from './TestStripSubmissionListScreen.Styles';

type SubmissionItem = { id: string; image?: any; status: string; description: string };
const DATA: SubmissionItem[] = [
  {
    id: 'abc-efg-hij-klm',
    //image: require(''),
    status: 'VALID',
    description: 'This is valid',
  },
  {
    id: 'xyz-123-456-789',
    //image: require('../assets/sample.png'),
    status: 'VALID',
    description: 'Another valid submission',
  },
];

interface TestStripSubmissionListScreenProps {
  params: object;
}

const TestStripSubmissionListScreen: FC<TestStripSubmissionListScreenProps> = React.memo(
  ({ params }) => {
    const [state, setState] = useState<string>();

    const renderItem = ({ item }: { item: SubmissionItem }) => (
      <TouchableOpacity style={styles.card}>
        <Image source={item.image} style={styles.thumbnail} />
        <View style={styles.rightSection}>
          <View style={styles.topBlock}>
            <Text style={styles.label}>QR Code</Text>
            <Text style={styles.status}>{item.status}</Text>
          </View>
          <View style={styles.bottomBlock}>
            <Text style={styles.idText}>ID: {item.id}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );

    //pull to refresh
    // lazy loading

    return (
      <View style={styles.container}>
        <Text style={styles.title}> Scanned Test Strips History </Text>
        <FlatList
          data={DATA}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingVertical: 20 }}
        />
      </View>
    );
  }
);

export default TestStripSubmissionListScreen;
