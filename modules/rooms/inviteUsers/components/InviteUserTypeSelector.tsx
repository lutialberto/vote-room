import { ThemedText } from "@/components/ThemedText";
import { RadioButtonApp } from "@/components/RadioButtonApp";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { USER_INVITATIONS } from "../constants/userInvitations";
import { UserInvitationType } from "../models/UserInvitationType";

export default function InviteUserTypeSelector({
  selectedInvitationType,
  handleSelectedOption,
}: {
  selectedInvitationType: UserInvitationType;
  handleSelectedOption: (type: UserInvitationType) => void;
}) {
  const selectedOption = USER_INVITATIONS[selectedInvitationType];

  return (
    <>
      <View style={styles.optionsContainer}>
        <RadioButtonApp
          options={Object.values(USER_INVITATIONS).map(
            ({ code, label, icon }) => ({
              label,
              selected: selectedOption.code === code,
              onPress: () => handleSelectedOption(code),
              icon,
            })
          )}
        />
      </View>

      {selectedOption && (
        <View style={styles.hintContainer}>
          <Ionicons
            name={selectedOption.icon}
            size={20}
            color="#666"
            style={styles.hintIcon}
          />
          <ThemedText style={styles.hint}>{selectedOption.hint}</ThemedText>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  optionsContainer: {
    marginBottom: 24,
  },
  hintContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: "#0186FF",
  },
  hintIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  hint: {
    flex: 1,
    opacity: 0.8,
    lineHeight: 18,
    fontSize: 14,
  },
});
