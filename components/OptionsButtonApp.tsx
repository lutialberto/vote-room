import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { ThemedText } from './ThemedText';

export type OptionsButtonAppProps = {
  options: {
    label: string,
    onPress: () => void,
    selected: boolean,
  }[],
  containerStyle?: StyleProp<ViewStyle>,
};

export function OptionsButtonApp({ options,containerStyle }: OptionsButtonAppProps) {
  return <View style={[styles.container,containerStyle]}>
    {
      options.map((option,index) => 
        <TouchableOpacity key={option.label} onPress={option.onPress}>
          <ThemedText 
            style={[
              index > 0 ? styles.optionBorder : null,
              styles.optionSelected, 
              !option.selected ? styles.optionNotSelected : null
            ]}
          >
            {option.label}
          </ThemedText>
        </TouchableOpacity>
      )
    }
  </View>
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    borderWidth: 1, 
    borderColor: '#0186FF', 
    borderRadius: 8, 
    overflow: 'hidden',
  },
  optionBorder: {
    borderLeftWidth: 1, 
    borderColor: '#0186FF', 
  },
  optionSelected: {
    padding: 10, 
    backgroundColor: '#0186FF', 
  },
  optionNotSelected: {
    backgroundColor: 'white', 
    color: '#0186FF',
  }
});
