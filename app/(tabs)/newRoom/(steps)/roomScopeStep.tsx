import { StyleSheet, TextInput, View, Switch, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useState } from 'react';
import { ButtonApp } from '@/components/ButtonApp';
import { OptionsButtonApp } from '@/components/OptionsButtonApp';
import { router } from 'expo-router';

const userTypes = [
  { code: 'unrestricted', label: 'Irrestricto', description: 'Cualquier usuario puede acceder'},
  { code: 'authenticated', label: 'Autenticado', description: 'Solo usuarios registrados'},
  { code: 'kyc', label: 'KYC', description: 'Solo usuarios registrados que han validado su identidad'},
]

export default function RoomScopeStep() {
  const [isPublic, setIsPublic] = useState(true);
  const [userType, setUserType] = useState(userTypes[0].code);

  const scopeOptions = [
    {label: 'Publica', selected: isPublic, onPress: () => setIsPublic(true)},
    {label: 'Privada', selected: !isPublic, onPress: () => setIsPublic(false)},
  ];
  const userTypeOptions = userTypes.map(({label, code}) => ({
    label,
    selected: userType === code,
    onPress: () => setUserType(code),
  }))

  const onConfirm = () => {
    // TODO: falta definir que hacer con los datos
    const roomId = 1;
    router.replace(`/${roomId}/shareRoom`);
  }

  return (
    <ThemedView style={{paddingHorizontal: 8, flex: 1, justifyContent: 'flex-end', gap: 25}}>
      <View>
        <OptionsButtonApp options={scopeOptions} containerStyle={styles.optionsButton} />
          {isPublic
          ? <>
            <ThemedText style={{textAlign: 'center'}}>Cualquier usuario puede unirse para participar.</ThemedText>
            <ThemedText style={{textAlign: 'center'}}>La sala será visible para otros usuarios en la sección de Salas</ThemedText>
            <ThemedText style={{textAlign: 'center'}}>Datos como los resultados de las votaciones de la sala estarán visibles</ThemedText>
          </>
          : <>
            <ThemedText>Solo es posible ingresar a la sala mediante código de sala o por invitación del usuario que la creó.</ThemedText>
            <ThemedText>La sala se mantendrá oculta para el resto de usuarios que no sean mienbros</ThemedText>
          </>
          }
      </View>
      <View>
        <OptionsButtonApp options={userTypeOptions} containerStyle={styles.optionsButton}  />
        <ThemedText style={{textAlign: 'center'}}>{userTypes.find(e => e.code === userType)?.description}</ThemedText>
      </View>
      <ButtonApp 
        label='Finalizar' 
        style={{marginBottom: 10}} 
        onPress={onConfirm}
      />
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
  optionsButton: {
    marginHorizontal: 'auto', 
    marginBottom: 5,
  }
});
