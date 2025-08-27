import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import metrics from '../../../constants/metrics';
import Colors from '../../../constants/color';

const Preview = ({ values, setStep }: any) => {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, backgroundColor: Colors.WHITE }}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <View style={styles.container}>
        <Text style={styles.heading}>Preview Task</Text>

        {/* Task Details */}
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.sectionTitle}>Task Details</Text>
          </View>
          <Text style={styles.label}>Title:</Text>
          <Text style={styles.value}>{values.title}</Text>
          <Text style={styles.label}>Description:</Text>
          <Text style={styles.value}>{values.description}</Text>
        </View>

        {/* Location */}
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.sectionTitle}>Location</Text>
          </View>
          <Text style={styles.value}>{values.location.addressLine1}</Text>
          <Text style={styles.value}>{values.location.addressLine2}</Text>
          <Text style={styles.value}>{values.location.home}</Text>
          <Text style={styles.value}>{values.location.street}</Text>
          <Text style={styles.value}>{values.location.state}</Text>
          <Text style={styles.value}>{values.location.city}</Text>
          <Text style={styles.value}>{values.location.country}</Text>
          <Text style={styles.value}>{values.location.phone}</Text>
        </View>

        {/* Extra Details */}
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.sectionTitle}>Budget Details</Text>
          </View>
          <Text style={styles.label}>Estimate Budget:</Text>
          <Text style={styles.value}>{values.estimateBudget}</Text>
          <Text style={styles.label}>Deadline:</Text>
          <Text style={styles.value}>{values.deadline}</Text>
          <Text style={styles.label}>Note:</Text>
          <Text style={styles.value}>{values.note}</Text>
        </View>

        {/* Image */}
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.sectionTitle}>Image</Text>
          </View>
          {values.image ? (
            <Image
              source={{ uri: values.image.uri }}
              style={{
                width: 200,
                height: 200,
                borderRadius: 10,
                marginTop: 10,
              }}
            />
          ) : (
            <Text style={styles.value}>No image selected</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: metrics.padding(16),
    // backgroundColor: Colors.WHITE,
    borderRadius: metrics.borderRadius(10),
    paddingBottom: metrics.paddingBottom(100),
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  section: { marginBottom: 20 },
  // section: {
  //   backgroundColor: '#fff',
  //   borderRadius: metrics.borderRadius(12),
  //   padding: metrics.padding(16),
  //   marginBottom: metrics.marginBottom(16),
  //   elevation: 3,
  //   shadowColor: '#000',
  //   shadowOpacity: 0.05,
  //   shadowRadius: 6,
  //   shadowOffset: { width: 0, height: 2 },
  // },
  sectionTitle: { fontSize: 16, fontWeight: '600' },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: { fontWeight: '600', marginTop: 5 },
  value: { marginBottom: 5, color: '#333' },
  editBtn: { color: '#2979ff', fontWeight: 'bold' },
});

export default Preview;
