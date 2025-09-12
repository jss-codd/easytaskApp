import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import styles from '../screens/task/bidDetails';

export const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value?: string;
}) => (
  <View style={styles.row}>
    <Text style={styles.textBold}>{label} </Text>
    <Text style={styles.textMuted}>{value || 'N/A'}</Text>
  </View>
);

export const Section = ({
  title,
  value,
  children,
}: {
  title: string;
  value?: string;
  children?: React.ReactNode;
}) => (
  <View>
    <Text style={styles.textBold}>{title}</Text>
    {value ? <Text style={styles.textMuted}>{value}</Text> : children}
  </View>
);

export const Chip = ({ text }: { text: string }) => (
  <View style={styles.chip}>
    {/* <Text style={styles.chipIcon}>✔</Text> */}
    <Text style={styles.chipText}>{text}</Text>
  </View>
);

export const VerifiedBadge = () => (
  <View style={styles.verifiedRow}>
    <Text style={styles.verifiedIcon}>✔</Text>
    <Text style={styles.verifiedText}>Payment Verified</Text>
  </View>
);

export const Rating = ({ stars }: { stars: number }) => (
  <View style={styles.ratingRow}>
    {Array.from({ length: 5 }, (_, i) => (
      <Text key={i} style={i < stars ? styles.star : styles.starEmpty}>
        {i < stars ? '★' : '☆'}
      </Text>
    ))}
  </View>
);

export const Checkbox = ({ selected, onPress, disabled }: { selected: boolean; onPress: () => void; disabled?: boolean }) => (
  <TouchableOpacity
    style={styles.checkbox}
    onPress={(e) => {
      e.stopPropagation();
      onPress();
    }}
    disabled={disabled}
  >
    {selected && <View style={styles.checkboxSelected} />}
  </TouchableOpacity>
);
