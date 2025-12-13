import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { IconApp } from "@/components/IconApp";
import { PublicRoomTypeFilter } from "@/models/Room";
import { ColorScheme } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";

export interface PublicRoomFilterChipsProps {
  filter: PublicRoomTypeFilter;
  onRemoveFilter: (filterKey: keyof PublicRoomTypeFilter) => void;
  onClearAll: () => void;
}

export default function PublicRoomFilterChips({
  filter,
  onRemoveFilter,
  onClearAll,
}: PublicRoomFilterChipsProps) {
  const colors = useThemeColor();
  const styles = getStyles(colors);
  const activeFilters: Array<{
    key: keyof PublicRoomTypeFilter;
    label: string;
    value: string;
  }> = [];

  if (filter.label) {
    activeFilters.push({
      key: "label",
      label: "Nombre",
      value: filter.label,
    });
  }
  if (filter.code) {
    activeFilters.push({ key: "code", label: "Código", value: filter.code });
  }
  if (filter.ownerName) {
    activeFilters.push({
      key: "ownerName",
      label: "Propietario",
      value: filter.ownerName,
    });
  }
  if (filter.tags && filter.tags.length > 0) {
    activeFilters.push({
      key: "tags",
      label: "Tags",
      value: filter.tags.join(", "),
    });
  }

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
            key={filterItem.key}
            style={styles.chip}
            onPress={() => onRemoveFilter(filterItem.key)}
          >
            <ThemedText style={styles.chipText}>
              {filterItem.label}: {filterItem.value}
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
