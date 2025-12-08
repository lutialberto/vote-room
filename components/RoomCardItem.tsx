import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { Room, RoomStatus } from "@/models/Room";
import { router } from "expo-router";
import { useUser } from "@/contexts/UserContext";
import { useThemeColor } from "@/hooks/useThemeColor";
import { IconApp } from "./IconApp";
import { CardApp } from "./CardApp";

export default function RoomCardItem({ room }: { room: Room }) {
  const greenColor = useThemeColor({}, "green");
  const orangeColor = useThemeColor({}, "orange");
  const grayColor = useThemeColor({}, "gray");

  const { currentUser } = useUser();

  const statusConfig: Record<RoomStatus, { color: string; text: string }> = {
    active: { color: greenColor, text: "Activa" },
    paused: { color: orangeColor, text: "Pausada" },
    finished: { color: grayColor, text: "Finalizada" },
  };
  const roomStatusConfig = room.status
    ? statusConfig[room.status]
    : {
        color: grayColor,
        text: "Inactiva",
      };

  const navigateToRoom = (roomCode: string) => {
    router.push(`/${roomCode}/shareRoom`);
  };

  return (
    <TouchableOpacity
      key={room.code}
      onPress={() => navigateToRoom(room.code)}
      activeOpacity={0.7}
    >
      <CardApp type="withShadow">
        <View style={styles.cardHeader}>
          <View style={styles.roomInfo}>
            <ThemedText style={styles.roomTitle}>{room.label}</ThemedText>
            <ThemedText colorName="primary" style={styles.roomCode}>
              #{room.code}
            </ThemedText>
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
              <IconApp name="people" size={16} />
              <ThemedText style={styles.memberCount}>
                {room.memberCount} miembros
              </ThemedText>
            </View>

            <View style={styles.roleInfo}>
              <IconApp
                name="airplane"
                size={16}
                colorName={
                  room.ownerUserId === currentUser.id ? "orange" : "icon"
                }
              />
              <ThemedText
                colorName={
                  room.ownerUserId === currentUser.id ? "orange" : "text"
                }
                style={styles.roleText}
              >
                {room.ownerUserId === currentUser.id
                  ? "Propietario"
                  : "Miembro"}
              </ThemedText>
            </View>
          </View>

          <View style={styles.row}>
            <ThemedText style={styles.lastActivity}>
              {room.lastActivity}
            </ThemedText>
            <IconApp name="chevron-forward" size={20} />
          </View>
        </View>
      </CardApp>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
