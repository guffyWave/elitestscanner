import React, { FC } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { ScanValidity, TestStripSubmissionItem } from '../model/testStripSubmissionList';
import { API_BASE_URL } from '../commons/constants';

interface SubmissionListItemViewProps {
  item: TestStripSubmissionItem;
}

const SubmissionListItemView: FC<SubmissionListItemViewProps> = React.memo(({ item }) => {
  return (
    <View style={styles.card}>
      <View style={styles.thumbnailContainer}>
        {/*  @note Improvement 
          Convert to FastImage  
          Better use SVG , WEBP, PNG
          Scale webp/png based on client  https://newassets.apollo247.com/images/banners/mweb_First3.jpg?imwidth=200
        */}
        <Image
          source={{ uri: API_BASE_URL + '/' + item?.thumbnail_path }}
          // source={{
          //   uri: 'https://img.icons8.com/?size=100&id=42305&format=png&color=000000',
          // }}
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

//@note - Use dimension , color , font etc from theme
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
