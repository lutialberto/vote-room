import { ThemedText } from "@/components/ThemedText";
import { RadioButtonApp } from "@/components/RadioButtonApp";
import { View, StyleSheet } from "react-native";
import { USER_INVITATIONS } from "../constants/userInvitations";
import { UserInvitationType } from "../models/UserInvitationType";
import { useThemeColor } from "@/hooks/useThemeColor";
import { IconApp } from "@/components/IconApp";
import { CardApp } from "@/components/CardApp";
import { ColorScheme } from "@/constants/Colors";

export default function InviteUserTypeSelector({
  selectedInvitationType,
  handleSelectedOption,
}: {
  selectedInvitationType: UserInvitationType;
  handleSelectedOption: (type: UserInvitationType) => void;
}) {
  const colors = useThemeColor();
  const styles = getStyles(colors);
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
        <CardApp type="withShadow" style={styles.hintContainer}>
          <IconApp
            name={selectedOption.icon}
            size={20}
            style={styles.hintIcon}
          />
          <ThemedText style={styles.hint}>{selectedOption.hint}</ThemedText>
        </CardApp>
      )}
    </>
  );
}

const getStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    optionsContainer: {
      marginBottom: 24,
    },
    hintContainer: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: 24,
      borderLeftWidth: 4,
      borderLeftColor: colors.primary,
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
