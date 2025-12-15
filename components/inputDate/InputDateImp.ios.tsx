import RNDateTimePicker from "@react-native-community/datetimepicker";
import { InputDateImpProps } from "./InputDateImp";

const InputDateImpIos = (props: InputDateImpProps) => {
  return (
    <>{props.visible && <RNDateTimePicker {...props.dateTimePickeckProps} />}</>
  );
};

export default InputDateImpIos;
