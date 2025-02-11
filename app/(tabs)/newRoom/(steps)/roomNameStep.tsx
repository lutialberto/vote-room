import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router';
import { useForm } from 'react-hook-form';
import { ButtonApp } from '@/components/ButtonApp';
import InputTextApp from '@/components/InputTextApp';

type FormData = {
  name: string,
  description: string,
};

export default function RoomNameStep() {
  const { handleSubmit, control, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      name: '',
      description: ''
    }
  });
  const onSubmit = (data: FormData) => {
    // TODO: falta definir que hacer con los datos
    router.navigate('./roomTypeStep');
  };

  return (
    <ThemedView style={{paddingHorizontal: 8, flex: 1}}>
      <ThemedView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ThemedText style={{textAlign: 'center'}}>Crea una sala e invita a otros usuarios a participar en votaciones generadas por vos</ThemedText>
        <ThemedText style={{textAlign: 'center'}}>Para arrancar, define un nombre y una descripción (opcional)</ThemedText>
      </ThemedView>
      <ThemedView style={{gap: 10, paddingBottom: 10}}>
        <InputTextApp
          inputControl={{
            control,
            name: 'name',
            rules: {
              required: 'El campo es requerido'
            }
          }}
          textInputProps={{
            placeholder: 'Nombre...'
          }}
          label='Nombre'
          errorMessage={errors.name?.message}
        />
        <InputTextApp
          inputControl={{
            control,
            name: 'description',
            rules: {
              maxLength: 256,
            }
          }}
          maxLength={256}
          textInputProps={{
            placeholder: 'Descripción...'
          }}
          type='multiline'
          label='Descripción'
          errorMessage={errors.description?.message}
        />
        <ButtonApp 
          label='Continuar' 
          onPress={handleSubmit(onSubmit)} 
        />
      </ThemedView>
    </ThemedView>
  );
}