import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { Room, RoomStatus } from "@/models/Room";
import { router } from "expo-router";
import { useUser } from "@/contexts/UserContext";

const statusConfig: Record<RoomStatus, { color: string; text: string }> = {
  active: { color: "#34C759", text: "Activa" },
  paused: { color: "#FF9500", text: "Pausada" },
  finished: { color: "#8E8E93", text: "Finalizada" },
};

export default function RoomCardItem({ room }: { room: Room }) {
  const { currentUser } = useUser();
  const roomStatusConfig = room.status
    ? statusConfig[room.status]
    : {
        color: "#8E8E93",
        text: "Inactiva",
      };

  const navigateToRoom = (roomCode: string) => {
    router.push(`/${roomCode}/shareRoom`);
  };

  return (
    <TouchableOpacity
      key={room.code}
      style={styles.roomCard}
      onPress={() => navigateToRoom(room.code)}
      activeOpacity={0.7}
    >
      <View style={styles.cardHeader}>
        <View style={styles.roomInfo}>
          <ThemedText style={styles.roomTitle}>{room.label}</ThemedText>
          <ThemedText style={styles.roomCode}>#{room.code}</ThemedText>
        </View>

        <View style={styles.statusContainer}>
          <View
            style={[
              styles.statusDot,
              { backgroundColor: roomStatusConfig.color },
            ]}
          />
          <ThemedText style={styles.statusText}>
            {roomStatusConfig.text}
          </ThemedText>
        </View>
      </View>

      <ThemedText style={styles.roomDescription} numberOfLines={2}>
        {room.description}
      </ThemedText>

      <View style={styles.cardFooter}>
        <View style={[styles.row, { gap: 12 }]}>
          <View style={styles.memberInfo}>
            <Ionicons name="people" size={16} color="#666" />
            <ThemedText style={styles.memberCount}>
              {room.memberCount} miembros
            </ThemedText>
          </View>

          <View style={styles.roleInfo}>
            <Ionicons
              name="airplane"
              size={16}
              color={room.ownerUserId === currentUser.id ? "#FFD700" : "#666"}
            />
            <ThemedText
              style={[
                styles.roleText,
                room.ownerUserId === currentUser.id && styles.ownerText,
              ]}
            >
              {room.ownerUserId === currentUser.id ? "Propietario" : "Miembro"}
            </ThemedText>
          </View>
        </View>

        <View style={styles.row}>
          <ThemedText style={styles.lastActivity}>
            {room.lastActivity}
          </ThemedText>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  roomCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  roomInfo: {
    flex: 1,
    marginRight: 12,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  roomTitle: {
    fontSize: 18,
    fontWeight: "600",
    flex: 1,
  },
  roomCode: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "500",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
  roomDescription: {
    fontSize: 14,
    opacity: 0.7,
    lineHeight: 18,
    marginBottom: 16,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  memberInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  memberCount: {
    fontSize: 12,
    opacity: 0.7,
  },
  roleInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  roleText: {
    fontSize: 12,
    opacity: 0.7,
  },
  ownerText: {
    color: "#FFD700",
    fontWeight: "600",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  lastActivity: {
    fontSize: 12,
    opacity: 0.5,
  },
});
