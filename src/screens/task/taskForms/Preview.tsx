import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import metrics from '../../../constants/metrics';
import Colors from '../../../constants/color';
import { formatCurrency, formatDate2 } from '../../../utils/helper';

const Preview = ({ values, setStep, handleSubmit }: any) => {
  console.log('values', values);
  return (
    // <SafeAreaView style={{ flex: 1 }}>
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
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
          {/* <Text style={styles.value}>{values.location.phone}</Text> */}
        </View>

        {/* Extra Details */}
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.sectionTitle}>Budget Details</Text>
          </View>
          <Text style={styles.label}>Estimate Budget:</Text>
          <Text style={styles.value}>{formatCurrency(values.estimateBudget)}</Text>
          <Text style={styles.label}>Deadline:</Text>
          <Text style={styles.value}>{formatDate2(values.deadline)}</Text>
          <Text style={styles.label}>Note:</Text>
          <Text style={styles.value}>{values.note}</Text>
        </View>

        {/* Image */}
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.sectionTitle}>Images</Text>
          </View>

          {Array.isArray(values.media) && values.media.length > 0 ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {values.media.map((file: any, index: number) => {
                // Handle both backend string URLs & new picker objects
                const uri = typeof file === 'string' ? file : file.uri;

                return (
                  <Image
                    key={index}
                    source={{ uri }}
                    style={styles.image}
                  />
                );
              })}
            </ScrollView>
          ) : (
            <Text style={styles.value}>No images selected</Text>
          )}
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.button, styles.backButton]}
            onPress={() => setStep(2)}
          >
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.submitButton]}
            onPress={handleSubmit}
          >
            <Text style={[styles.buttonText, { color: Colors.WHITE }]}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: metrics.padding(20),
    borderRadius: metrics.borderRadius(10),
    backgroundColor: Colors.BACKGROUND,
  },
  heading: {
    fontSize: metrics.fontSize(20),
    fontWeight: 'bold',
    marginBottom: metrics.marginBottom(10),
    textAlign: 'center',
  },
  section: { marginBottom: metrics.marginBottom(20) },
  sectionTitle: { fontSize: metrics.fontSize(14), fontWeight: '600' },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: { fontWeight: '600', marginTop: metrics.marginTop(5) },
  value: { marginBottom: metrics.marginBottom(5), color: Colors.DARK_GREY },
  image: {
    borderColor: Colors.LIGHT_GREY,
    borderWidth: 1,
    width: metrics.width(100),
    height: metrics.height(100),
    borderRadius: metrics.borderRadius(10),
    marginTop: metrics.marginTop(10),
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: metrics.marginTop(20),
    marginBottom: metrics.marginBottom(20),
    gap: metrics.gap(10),
  },
  button: {
    backgroundColor: Colors.MAIN_COLOR,
    padding: metrics.padding(10),
    borderRadius: metrics.borderRadius(5),
    flex: 1,
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: Colors.LIGHT_GREY,
  },
  submitButton: {
    backgroundColor: Colors.MAIN_COLOR,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: metrics.fontSize(16),
  },
});

export default Preview;


