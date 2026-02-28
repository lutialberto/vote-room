import { CardApp } from "@/components/CardApp";
import { IconApp } from "@/components/IconApp";
import { ThemedText } from "@/components/ThemedText";
import { FlatList, Pressable, View } from "react-native";
import { TriadItemData } from "../../models/award";

export interface AwardTriadsCarruselProps {
  triads: TriadItemData[];
  onTriadsChange: (triads: TriadItemData[]) => void;
}

export default function AwardTriadsCarrusel({
  triads,
  onTriadsChange,
}: AwardTriadsCarruselProps) {
  return (
    <FlatList
      data={triads}
      keyExtractor={(item) => item.name}
      style={{ flexGrow: 0 }}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item, index }) => (
        <CardApp style={{ minWidth: 150, maxWidth: 250, marginHorizontal: 5 }}>
          <ThemedText type="subtitle">{item.name}</ThemedText>
          {item.nominees.map((nominee) => (
            <ThemedText key={nominee}>{nominee}</ThemedText>
          ))}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                gap: 4,
                flexDirection: "row",
              }}
            >
              {index > 0 && (
                <Pressable
                  onPress={() => {
                    const newOrderTriads = triads.map((triad, i) => {
                      if (i === index) return triads[index - 1];
                      if (i === index - 1) return triads[index];
                      return triad;
                    });
                    onTriadsChange(newOrderTriads);
                  }}
                >
                  <IconApp name="arrow-back-circle" size={30} />
                </Pressable>
              )}
              {index < triads.length - 1 && (
                <Pressable
                  onPress={() => {
                    const newOrderTriads = triads.map((triad, i) => {
                      if (i === index) return triads[index + 1];
                      if (i === index + 1) return triads[index];
                      return triad;
                    });
                    onTriadsChange(newOrderTriads);
                  }}
                >
                  <IconApp name="arrow-forward-circle" size={30} />
                </Pressable>
              )}
            </View>
            <Pressable
              onPress={() => {
                const filteredTriads = triads.filter(
                  (triad) => triad.name !== item.name
                );
                onTriadsChange(filteredTriads);
              }}
            >
              <IconApp name="trash" size={30} colorName="red" />
            </Pressable>
          </View>
        </CardApp>
      )}
      ListEmptyComponent={
        <CardApp>
          <ThemedText>Aun no has agregado ternas.</ThemedText>
          <ThemedText>
            Completa el formulario para agregar {"\n"}una nueva terna.
          </ThemedText>
        </CardApp>
      }
    />
  );
}
