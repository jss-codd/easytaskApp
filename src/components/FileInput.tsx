import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { pick } from '@react-native-documents/picker';
import metrics from '../constants/metrics';
import Colors from '../constants/color';

const FileInput = ({ label, value, onSelectFile, placeholder }: any) => {
  const handlePick = async () => {
    try {
      const result = await pick({
        allowMultiSelection: false,
        type: [
          'image/*',
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ],
      });

      if (result && result.length > 0) {
        const file = result[0];
        console.log(file);
        onSelectFile({
          uri: file.uri,
          name: file.name,
          type: file.type,
          size: file.size,
        });
      }
    } catch (error) {
      console.warn('File picking failed:', error);
    }
  };

  const handleRemoveFile = () => {
    onSelectFile(null); // Clear the file
  };

  return (
    <View style={{ marginVertical: metrics.marginVertical(10) }}>
      <Text style={{ marginBottom: metrics.marginBottom(5) }}>{label}</Text>

      <TouchableOpacity
        onPress={handlePick}
        style={{
          padding: metrics.padding(12),
          backgroundColor: Colors.WHITE,
          borderRadius: metrics.borderRadius(8),
          marginBottom: metrics.marginBottom(2),
          // height: metrics.height(40),
        }}
      >
        <Text
          style={{
            fontSize: metrics.fontSize(12),
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {value?.name || `Upload ${placeholder}`}
        </Text>
      </TouchableOpacity>

      {value?.name && (
        <TouchableOpacity
          onPress={handleRemoveFile}
          style={{
            padding: metrics.padding(10),
            backgroundColor: '#f66',
            borderRadius: metrics.borderRadius(8),
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#fff', fontSize: metrics.fontSize(12) }}>
            Remove file
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default FileInput;
