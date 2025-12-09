import { IconApp, IconName } from "@/components/IconApp";
import { useThemeColor } from "@/hooks/useThemeColor";
import { View } from "react-native";

export function NewStepMainIcon(props: { name: IconName }) {
  const { primary: color } = useThemeColor();
  return (
    <View
      style={{ backgroundColor: color + "20", borderRadius: 50, padding: 20 }}
    >
      <IconApp name={props.name} size={48} colorName="primary" />
    </View>
  );
}
