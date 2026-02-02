import React, { FC } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {
  ScanValidity,
  TestStripSubmissionItem,
} from '../model/testStripSubmissionList';

interface SubmissionListItemViewProps {
  item: TestStripSubmissionItem;
}

const SubmissionListItemView: FC<SubmissionListItemViewProps> = React.memo(({ item }) => {
  return (
    <View style={styles.card}>
      <View style={styles.thumbnailContainer}>
        <Image
          source={{ uri: 'http://10.242.231.225:3000/' + item?.thumbnail_path }}
          style={styles.thumbnail}
        />
        <Text style={styles.status(item.status)}>{item.status}</Text>
      </View>
      <View style={styles.rightSection}>
        {item.qr_code ? (
          <View style={styles.topBlock}>
            <Text style={styles.label}>{item.qr_code}</Text>
            <Text style={styles.description}>{item?.error_message}</Text>
          </View>
        ) : null}

        <View style={styles.bottomBlock}>
          <Text style={styles.idText}>ID: {item.id}</Text>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#F4F4F4',
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
  },
  thumbnailContainer: {
    alignItems: 'center',
    marginRight: 16,
  },

  thumbnail: { width: 100, height: 100, borderRadius: 8, backgroundColor: '#DDD' },
  rightSection: { flex: 1, flexDirection: 'column' },
  topBlock: { flexDirection: 'column', marginBottom: 10 },
  bottomBlock: { flexDirection: 'column' },
  label: { fontSize: 16, fontWeight: '600' },
  status: (status: ScanValidity) => ({
    fontSize: 14,
    fontWeight: '700',
    color: status === 'INVALID' ? '#FF0000' : status === 'VALID' ? '#2ECC71' : '#999999',
    marginTop: 2,
  }),
  idText: { fontSize: 8, fontWeight: '300' },
  description: { fontSize: 12, color: '#555', marginTop: 2 },
});

export default SubmissionListItemView;
