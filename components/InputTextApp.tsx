import { StyleProp, TextInput, TextInputProps, TouchableOpacity, ViewStyle } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { FieldValues, useController, UseControllerProps } from 'react-hook-form';
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';

const MAX_DEFAULT_MULTIVALUE = 5;

export type InputTextAppProps<T extends FieldValues> =  & {
    inputControl: UseControllerProps<T>;
    label: string;
    errorMessage?: string;
    containerStyle?: StyleProp<ViewStyle>;
    textInputProps?: TextInputProps;
    maxLength?: number;
    type?: 'text' | 'multiline',
    maxMultivalue?: number,
  };

const useMultiValue = (value: string | string[],maxLength: number) => {
  const isMultiValue = Array.isArray(value);
  const isMaxLength = isMultiValue && value.length === maxLength;
  const multiValueErrorMessage = `No puede haber más de ${maxLength} valores. Elimine uno de los existentes antes de agregar uno nuevo.`

  return {
    isMultiValue,
    multiValueErrorMessage,
    isMaxLength,
  }
}
  
export default function InputTextApp<T extends FieldValues>({
    inputControl, 
    errorMessage,
    containerStyle,
    label,
    textInputProps = {},
    maxLength,
    type = 'text',
    maxMultivalue = MAX_DEFAULT_MULTIVALUE,
}: InputTextAppProps<T>) {
  const {field} = useController(inputControl);
  const [focus,setFocus] = useState(false);
  const [value,setValue] = useState('');
  const {isMultiValue,isMaxLength,multiValueErrorMessage} = useMultiValue(field.value,maxMultivalue);

  const removeValue = (index:number) => {
    let values = field.value;
    values.splice(index,1);
    field.onChange(values);
  }

  return (
    <ThemedView style={containerStyle}>
      <ThemedView style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <ThemedText type='inputLabel'>{label}</ThemedText>
        {focus && maxLength && <ThemedText style={{fontSize: 12}}>{field.value.length}/{maxLength}</ThemedText>}
        {focus && isMultiValue && <ThemedText style={{fontSize: 12}}>{field.value.length}/{maxMultivalue}</ThemedText>}
      </ThemedView>
      <TextInput 
        {...textInputProps}
        value={isMultiValue ? value : field.value}
        onBlur={() => {
            setFocus(false);
            field.onBlur();
        }}
        onChangeText={e => {
          if(isMultiValue) {
            setValue(e)
          }
          else {
            field.onChange(e)
          }
        }}
        onSubmitEditing={e => {
          const newValue = e.nativeEvent.text;
          if(isMultiValue) {
            const isDuplicated = field.value.find((v: string) => newValue === v);
            if(!isDuplicated && !isMaxLength) {
              field.onChange([...field.value,newValue])
            }
            setValue('');
          }
        }}
        onFocus={() => setFocus(true)} 
        ref={field.ref}
        numberOfLines={type === 'text' ? 1:6}
        textAlignVertical='top'
        style={[
          type === 'text' && {
              borderBottomColor: 'black',
              borderBottomWidth: 1,
              paddingBottom: 0,
          },
          type === 'multiline' && {
            borderWidth: 1,
            borderRadius: 2,
            height: 100,
          },
          textInputProps.style,
        ]}
      />
      {isMultiValue && field.value.length > 0 && <ThemedView style={{flexDirection: 'row', gap:5, marginTop: 5, flexWrap: 'wrap'}}>
        {field.value.map((v:string, index:number) => 
          <TouchableOpacity
            style={{
              borderColor: '#0186FF', 
              borderWidth:1,
              borderRadius: 15, 
              paddingHorizontal: 8, 
              paddingVertical: 5,
              flexDirection: 'row',
              gap: 5,
              alignItems: 'center'
            }}
            key={v}
            onPress={() => removeValue(index)}
          >
            <ThemedText 
              style={{
                color: '#0186FF', 
              }}
            >{v}</ThemedText>
            <MaterialIcons name="close" size={16} color="#0186FF" />
          </TouchableOpacity>
        )}
      </ThemedView>}
      {errorMessage && <ThemedText type='inputError'>{errorMessage}</ThemedText>}
      {isMultiValue && focus && isMaxLength && <ThemedText type='inputError'>{multiValueErrorMessage}</ThemedText>}
    </ThemedView>
  );
}
