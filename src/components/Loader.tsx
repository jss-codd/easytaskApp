import React from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  Dimensions,
} from 'react-native';
import Colors from '../constants/color';
import metrics from '../constants/metrics';


const {width, height} = Dimensions.get('window');

interface LoaderProps {
  size?: 'small' | 'large';
  color?: string;
  text?: string;
  fullScreen?: boolean;
}

const Loader: React.FC<LoaderProps> = ({
  size = 'large',
  color = Colors.MAIN_COLOR,
  text,
  fullScreen = false,
}) => {
  const LoaderContent = () => (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} style={styles.loader} />
      {text && <Text style={styles.text}>{text}</Text>}
    </View>
  );

  if (fullScreen) {
    return (
      <View style={styles.fullScreenContainer}>
        <LoaderContent />
      </View>
    );
  }

  return <LoaderContent />;
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    opacity: 1,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: Math.min(width * 0.04,metrics.padding(16)),
  },
  text: {
    marginTop: Math.min(height * 0.015, metrics.marginTop(12)),
    fontSize: Math.min(width * 0.035,metrics.fontSize(14)),
    color: '#666',
    textAlign: 'center',
    fontWeight: '500',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loader; 