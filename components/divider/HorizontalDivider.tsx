import { ThemedText } from '@/components/ThemedText';
import { View, StyleSheet } from 'react-native';

export default function HorizontalDivider() {
  return (
      <View style={styles.divider}>
        <View style={styles.line} />
        <ThemedText style={styles.orText}>o</ThemedText>
        <View style={styles.line} />
      </View>
  );
}

const styles = StyleSheet.create({
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  orText: {
    marginHorizontal: 16,
    fontSize: 16,
    opacity: 0.5,
  },
});