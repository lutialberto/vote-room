import { View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { IconApp, IconName } from "@/components/IconApp";
import { CardApp } from "@/components/CardApp";

export interface SectionProps {
  id: string;
  title: string;
  items: {
    id: string;
    name: string;
    icon: IconName;
    onPress: () => void;
  }[];
}

export default function SectionsApp(props: { data: SectionProps[] }) {
  return (
    <FlatList
      data={props.data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.section}>
          <ThemedText type="subtitle">{item.title}</ThemedText>
          {item.items.map((subItem) => (
            <CardApp key={subItem.id}>
              <TouchableOpacity
                style={styles.settingItem}
                onPress={subItem.onPress}
              >
                <IconApp name={subItem.icon} size={24} colorName="text" />
                <ThemedText style={styles.settingText}>
                  {subItem.name}
                </ThemedText>
                <IconApp name="chevron-forward" size={20} colorName="text" />
              </TouchableOpacity>
            </CardApp>
          ))}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 10,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  settingText: {
    flex: 1,
    fontSize: 16,
  },
});
