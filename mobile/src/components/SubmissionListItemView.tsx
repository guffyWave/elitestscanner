import React, { FC } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { TestStripSubmissionItem } from '../model/testStripSubmissionList';

interface SubmissionListItemViewProps {
  item: TestStripSubmissionItem;
}

const SubmissionListItemView: FC<SubmissionListItemViewProps> = React.memo(({ item }) => {
  return (
    <TouchableOpacity style={styles.card}>
      <Image
        source={{ uri: 'http://10.242.231.225:3000/' + item?.thumbnail_path }}
        style={styles.thumbnail}
      />
      <View style={styles.rightSection}>
        <View style={styles.topBlock}>
          <Text style={styles.label}>{item.qr_code}</Text>
          <Text style={styles.status}>{item.status}</Text>
        </View>
        <View style={styles.bottomBlock}>
          <Text style={styles.idText}>ID: {item.id}</Text>
          <Text style={styles.description}>{item?.error_message}</Text>
        </View>
      </View>
    </TouchableOpacity>
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
  thumbnail: { width: 100, height: 100, borderRadius: 8, marginRight: 14, backgroundColor: '#DDD' },
  rightSection: { flex: 1, flexDirection: 'column' },
  topBlock: { flexDirection: 'column', marginBottom: 10 },
  bottomBlock: { flexDirection: 'column' },
  label: { fontSize: 16, fontWeight: '600' },
  status: { fontSize: 14, fontWeight: '700', color: '#2ECC71', marginTop: 2 },
  idText: { fontSize: 14, fontWeight: '500' },
  description: { fontSize: 13, color: '#555', marginTop: 2 },
});

export default SubmissionListItemView;
