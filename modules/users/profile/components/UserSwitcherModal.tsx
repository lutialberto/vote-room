import React, { useState } from "react";
import {
  Modal,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
  FlatList,
} from "react-native";
import { User } from "@/models/User";
import { UserContext } from "@/contexts/UserProvider";
import { useContext } from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { IconApp } from "@/components/IconApp";
import { ButtonApp } from "@/components/ButtonApp";
import { CardApp } from "@/components/CardApp";
import { SpinnerApp } from "@/components/SpinnerApp";
import { useListFetcherApp } from "@/hooks/useListFetcherApp";
import { fetchUsers } from "@/services/user/userService";
import { useUser } from "@/contexts/UserContext";

interface DevUserSwitcherProps {
  visible: boolean;
  onClose: () => void;
}

export default function UserSwitcherModal({
  visible,
  onClose,
}: DevUserSwitcherProps) {
  const { currentUser, switchUser } = useUser();
  const { data: availableUsers, isLoading } =
    useListFetcherApp<User>(fetchUsers);
  const colors = useThemeColor();
  const styles = getStyles(colors);

  const handleUserSelect = (user: User) => {
    switchUser(user);
    onClose();
  };

  const renderUserItem = ({ item }: { item: User }) => (
    <CardApp>
      <TouchableOpacity
        onPress={() => handleUserSelect(item)}
        style={[
          styles.userItem,
          item.id === currentUser.id && styles.currentUser,
        ]}
      >
        <View style={styles.userInfo}>
          <ThemedText type="subtitle">{item.name}</ThemedText>
          <ThemedText type="hint">@{item.userName}</ThemedText>
          <ThemedText type="hint">{item.email}</ThemedText>
        </View>

        {item.id === currentUser.id && (
          <View style={styles.currentUserBadge}>
            <IconApp name="checkmark-circle" size={20} colorName="primary" />
            <ThemedText type="hint" colorName="primary">
              Actual
            </ThemedText>
          </View>
        )}
      </TouchableOpacity>
    </CardApp>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SpinnerApp visible={isLoading}>
        <ThemedView style={styles.container}>
          <View style={styles.header}>
            <ThemedText type="title">Seleccionar Usuario</ThemedText>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <IconApp name="close" size={24} colorName="text" />
            </TouchableOpacity>
          </View>

          <CardApp
            style={{
              marginBottom: 15,
            }}
          >
            <ThemedText type="subtitle">Usuario Actual</ThemedText>
            <ThemedText colorName="primary">
              {currentUser.name} (@{currentUser.userName})
            </ThemedText>
          </CardApp>

          <FlatList
            data={availableUsers}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderUserItem}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />

          <ButtonApp
            label="Cerrar"
            onPress={onClose}
            style={styles.footerButton}
          />
        </ThemedView>
      </SpinnerApp>
    </Modal>
  );
}

const getStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 60,
      paddingHorizontal: 20,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
      paddingBottom: 15,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    closeButton: {
      padding: 5,
    },
    listContainer: {
      gap: 10,
    },
    userItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    currentUser: {
      opacity: 0.6,
    },
    userInfo: {
      flex: 1,
      gap: 3,
    },
    currentUserBadge: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      paddingHorizontal: 10,
      paddingVertical: 5,
      backgroundColor: colors.primary + "20",
      borderRadius: 15,
    },
    footerButton: {
      marginTop: 10,
    },
  });
