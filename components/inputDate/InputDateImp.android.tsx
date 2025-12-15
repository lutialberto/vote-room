import React, { useEffect } from "react";
import {
  DateTimePickerAndroid,
  AndroidNativeProps,
} from "@react-native-community/datetimepicker";
import { InputDateImpProps } from "./InputDateImp";

const InputDateImpAndroid = (props: InputDateImpProps) => {
  useEffect(() => {
    if (props.visible) {
      DateTimePickerAndroid.open(
        props.dateTimePickeckProps as AndroidNativeProps
      );
    }
  }, [props.visible]);

  return <></>;
};

export default InputDateImpAndroid;
