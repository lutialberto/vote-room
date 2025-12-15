import { useEffect } from "react";
import { Alert, Platform } from "react-native";
import { DatePickerConfigProps } from "./InputDateApp";

export interface InputDateImpProps {
  visible: boolean;
  value?: Date;
  dateTimePickeckProps: DatePickerConfigProps;
}

const InputDateImpDefault = (_props: InputDateImpProps) => {
  useEffect(() => {
    Alert.alert("Date Picker", `Not supported for ${Platform.OS}`);
  }, []);

  return <></>;
};

export default InputDateImpDefault;
