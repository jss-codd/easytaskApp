import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
} from 'react-native';
import { pick } from '@react-native-documents/picker';
import metrics from '../constants/metrics';
import Colors from '../constants/color';
import { ImageUrl } from '../service/axiosInterceptor';

const FileInput = ({
  label,
  value = [],
  onSelectFile,
  placeholder,
  allowMultiSelection = true, 
}: any) => {
  const [previewUri, setPreviewUri] = useState<string | null>(null);

  const handlePick = async () => {
    try {
      const result = await pick({
        allowMultiSelection,
        type: [
          'image/*',
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ],
      });

      if (result && result.length > 0) {
        const newFiles = result.map((file: any) => ({
          uri: file.uri,
          name: file.name,
          type: file.type,
          size: file.size,
        }));

        if (allowMultiSelection) {
         
          onSelectFile([...(Array.isArray(value) ? value : []), ...newFiles]);
        } else {
         
          onSelectFile(newFiles[0]);
        }
      }
    } catch (error) {
      console.warn('File picking failed:', error);
    }
  };

  const handleRemoveFile = (index?: number) => {
    if (allowMultiSelection) {
      if (!Array.isArray(value)) return;
      const updated = [...value];
      updated.splice(index!, 1); // remove file at index
      onSelectFile(updated);
    } else {
      onSelectFile(null); // clear single file
    }
  };

  const renderFilePreview = (file: any, index: number) => {
    const isImage = file.type?.startsWith('image/');
    return (
      <View
        key={index}
        style={{
          marginRight: metrics.marginRight(10),
          alignItems: 'center',
        }}
      >
        {isImage ? (
          <TouchableOpacity onPress={() => setPreviewUri(file.uri)}>
            <Image
              source={{ uri: file.uri }}
              style={{
                width: 70,
                height: 70,
                borderRadius: 8,
                marginBottom: 5,
              }}
            />
          </TouchableOpacity>
        ) : (
         
            <Text style={{ fontSize: 10, textAlign: 'center' }}>
              <Image source={{ uri: ImageUrl+file}} style={{ width: 70, height: 70 ,borderRadius: 8,  marginBottom: 5,}} />
            </Text>
         
        )}

        <TouchableOpacity
          onPress={() => handleRemoveFile(index)}
          style={{
            backgroundColor: '#f66',
            paddingVertical: 4,
            paddingHorizontal: 8,
            borderRadius: 6,
            marginTop: 5,
          }}
        >
          <Text style={{ color: '#fff', fontSize: metrics.fontSize(10) }}>
            Remove
          </Text>
        </TouchableOpacity>
      </View>
    );
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
          marginBottom: metrics.marginBottom(10),
        }}
      >
        <Text style={{ fontSize: metrics.fontSize(12), textAlign: 'center' }}>
          {allowMultiSelection
            ? Array.isArray(value) && value.length > 0
              ? `Selected ${value.length} files`
              : `Upload ${placeholder}`
            : value?.name || `Upload ${placeholder}`}
        </Text>
      </TouchableOpacity>

      {allowMultiSelection ? (
        Array.isArray(value) && value.length > 0 ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {value.map((file: any, index: number) =>
              renderFilePreview(file, index),
            )}
          </ScrollView>
        ) : null
      ) : value ? (
        renderFilePreview(value, 0)
      ) : null}

      <Modal visible={!!previewUri} transparent={true}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.9)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            style={{ position: 'absolute', top: 40, right: 20, zIndex: 1 }}
            onPress={() => setPreviewUri(null)}
          >
            <Text style={{ color: '#fff', fontSize: 18 }}>✕</Text>
          </TouchableOpacity>

          {previewUri && (
            <Image
              source={{ uri: previewUri }}
              style={{ width: '90%', height: '70%', borderRadius: 12 }}
              resizeMode="contain"
            />
          )}
        </View>
      </Modal>
    </View>
  );
};

export default FileInput;




