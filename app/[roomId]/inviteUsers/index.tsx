import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useForm } from 'react-hook-form';
import InputTextApp from '@/components/InputTextApp';
import { useState } from 'react';
import { RadioButtonApp } from '@/components/RadioButtonApp';
import { TouchableOpacity, View } from 'react-native';

type UserInvitationType = 'userId' | 'userName' | 'userEmail' | 'invitationListId' | 'invitationListName';
type UserInvitation = {
  type?: UserInvitationType,
  value?: string,
};
const userInvitations = [
  {
    code: 'userId',
    label: 'Código usuario',
    hint: 'Escribe el còdigo de usuario'
  },
  {
    code: 'userName',
    label: 'Nombre usuario',
    hint: 'Escribe el nombre de usuario'
  },
  {
    code: 'userEmail',
    label: 'Mail usuario',
    hint: 'Escribe el mail del usuario'
  },
  {
    code: 'invitationListId',
    label: 'Código lista de usuarios',
    hint: 'Escribe el còdigo de una sala de tu propiedad o de una de tus listas de invitados guardados'
  },
  {
    code: 'invitationListName',
    label: 'Nombre lista de usuarios',
    hint: 'Escribe el nombre de una sala de tu propiedad o de una de tus listas de invitados guardados'
  }
]

export default function InviteUsers() {
  const [invitationType, setInvitationType] = useState(userInvitations[0].code);
  const { handleSubmit, reset, control, formState: { errors } } = useForm<UserInvitation>({
    defaultValues: {
      type: userInvitations[0].code as UserInvitationType,
      value: undefined,
    }
  });
  const {hint} = userInvitations.find(e => e.code === invitationType) || {};

  const onSubmit = (data: UserInvitation) => {
    reset();    
    // TODO: falta definir que hacer con los datos
  };

  return (
    <ThemedView style={{paddingHorizontal: 8, flex: 1}}>
      <ThemedText style={{textAlign: 'center'}}>
        Selecciona una de las opciones disponibles, escribe en el campo inferior y presiona el + para invitar
      </ThemedText>
      <ThemedView style={{gap: 10, paddingBottom: 10, flex: 1, justifyContent: 'flex-end'}}>
        <RadioButtonApp
          options={userInvitations.map(({code, label}) => ({
            label,
            selected: invitationType === code,
            onPress: () => setInvitationType(code),
          }))}
        />
        <ThemedText style={{textAlign: 'center'}}>{hint}</ThemedText>
        <View style={{flexDirection: 'row', marginHorizontal: 10}}>
          <InputTextApp
            containerStyle={{flex: 1}}
            inputControl={{
              control,
              name: 'value',
            }}
            textInputProps={{
              placeholder: 'Ingresar...'
            }}
            label={''}
            errorMessage={errors.value?.message}
          />
          <TouchableOpacity onPress={handleSubmit(onSubmit)} style={{alignSelf: 'center', justifyContent: 'center', padding: 10,}}>
            <ThemedText type='title' style={{color: '#0186FF',}}>+</ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </ThemedView>
  );
}