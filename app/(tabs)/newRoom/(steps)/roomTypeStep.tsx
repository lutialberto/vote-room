import { StyleSheet, Switch, TextInput, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link, router } from 'expo-router';
import { useForm } from 'react-hook-form';
import InputTextApp from '@/components/InputTextApp';
import { ButtonApp } from '@/components/ButtonApp';

type FormData = {
  tags: string[],
  type: string,
  event: boolean,
};

export default function RoomTypeStep() {
  const { handleSubmit, control, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      tags: [],
      type: '',
      event: false,
    }
  });
  const onSubmit = (data: FormData) => {
    // TODO: falta definir que hacer con los datos
    router.navigate('./roomScopeStep');
  };

  return (
    <ThemedView style={{paddingHorizontal: 8, flex: 1}}>
      <ThemedView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ThemedText style={{textAlign: 'center'}}>Puedes asociar tags a tu sala. Serán usados por la aplicación para ayudar a otros usuarios a encontrar tu sala.</ThemedText>
        <ThemedText style={{textAlign: 'center'}}>TO DO: agregar descripcion de tipo cuando defina para que sirve</ThemedText>
      </ThemedView>
      <ThemedView style={{gap: 10, paddingBottom: 10}}>
        <InputTextApp
          inputControl={{
            control,
            name: 'tags',
          }}
          textInputProps={{
            placeholder: 'Tags...',
            onSubmitEditing: (e) => {
              e.nativeEvent.text
            }
          }}
          label='Tags'
          errorMessage={errors.tags?.message}
        />
        <InputTextApp
          inputControl={{
            control,
            name: 'type',
          }}
          textInputProps={{
            placeholder: 'Tipo...'
          }}
          label='Tipo'
          errorMessage={errors.type?.message}
        />
        <ThemedView style={{flexDirection: 'row', alignItems: 'center',}}>
          <Switch />
          <ThemedText style={{padding: 4, }}>Evento</ThemedText>
        </ThemedView>
        <ButtonApp label='Continuar' onPress={handleSubmit(onSubmit)} />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
