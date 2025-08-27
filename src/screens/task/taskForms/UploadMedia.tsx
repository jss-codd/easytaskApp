import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import FileInput from '../../../components/FileInput';

const UploadMedia = ({ values, setFieldValue }: any) => {
  return (
    <View style={{ alignItems: 'center' }}>
      <FileInput
        label="Upload Media"
        placeholder="Task Image"
        value={values.image}
        onSelectFile={(file: any) => setFieldValue('image', file)}
      />
      {/* {errors.laSelfieUpload && touched.laSelfieUpload && (
          <Text style={FormStyles.error}>{errors.laSelfieUpload}</Text>
        )} */}
      {/* <TouchableOpacity style={styles.uploadBtn}>
        <Text style={{ color: '#fff' }}>Pick Image</Text>
      </TouchableOpacity>
      {values.image && (
        <Image
          source={{ uri: values.image }}
          style={{
            width: 200,
            height: 200,
            marginTop: 10,
            borderRadius: 10,
          }}
        />
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  uploadBtn: {
    backgroundColor: '#2979ff',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
});

export default UploadMedia;
