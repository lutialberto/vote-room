import { ThemedText } from "@/components/ThemedText";

export default function RoomCodeLabel({ code }: { code: string }) {
  return (
    <ThemedText colorName="primary" style={{ fontSize: 14, fontWeight: "500" }}>
      #{code}
    </ThemedText>
  );
}
