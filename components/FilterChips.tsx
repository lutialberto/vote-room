import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { IconApp } from "@/components/IconApp";
import { ColorScheme } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";

export interface FilterChipsProps<T> {
  filters: FilterItem<T>[];
  onRemoveFilter: (filterKey: keyof T) => void;
  onClearAll: () => void;
}

export interface FilterItem<T> {
  key: keyof T;
  label: string;
  value: string | string[];
}

export default function FilterChips<T>({
  filters,
  onRemoveFilter,
  onClearAll,
}: FilterChipsProps<T>) {
  const colors = useThemeColor();
  const styles = getStyles(colors);

  const activeFilters = filters.filter(
    (f) => f.value && (Array.isArray(f.value) ? f.value.length > 0 : true)
  );

  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {activeFilters.map((filterItem) => (
          <TouchableOpacity
            key={filterItem.key as string}
            style={styles.chip}
            onPress={() => onRemoveFilter(filterItem.key)}
          >
            <ThemedText style={styles.chipText}>
              {filterItem.label}:
              {Array.isArray(filterItem.value)
                ? filterItem.value.join(", ")
                : filterItem.value}
            </ThemedText>
            <IconApp name="close" size={16} colorName="primary" />
          </TouchableOpacity>
        ))}

        {activeFilters.length > 1 && (
          <TouchableOpacity
            style={[styles.chip, styles.clearAllChip]}
            onPress={onClearAll}
          >
            <ThemedText style={styles.clearAllText}>Limpiar todo</ThemedText>
            <IconApp name="refresh" size={16} colorName="red" />
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}

const getStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    container: {
      paddingVertical: 8,
    },
    scrollContent: {
      gap: 4,
    },
    chip: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.primary + "20",
      borderRadius: 20,
      paddingHorizontal: 12,
      paddingVertical: 6,
      gap: 6,
    },
    chipText: {
      fontSize: 12,
      color: colors.primary,
      fontWeight: "500",
    },
    clearAllChip: {
      backgroundColor: colors.red + "20",
    },
    clearAllText: {
      fontSize: 12,
      color: colors.red,
      fontWeight: "500",
    },
  });
