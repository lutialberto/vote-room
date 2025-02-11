import { ButtonApp } from '@/components/ButtonApp';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import * as Clipboard from 'expo-clipboard';

export default function ShareRoom() {
  const roomCode = 'roomId';

  const onCopyToClipboard = async () => {
    await Clipboard.setStringAsync(roomCode);
  }

  return (
    <ThemedView style={{paddingHorizontal: 8, flex: 1}}>
      <ThemedText type='title' style={{textAlign: 'center'}}>
        {roomCode}
      </ThemedText>
      <ThemedText style={{textAlign: 'center'}} type='subtitle'>
        Comparte el código de invitación en tus redes sociales
      </ThemedText>
      <ButtonApp label='Compartir código' onPress={() => {}} />
      <ThemedText style={{textAlign: 'center'}} type='subtitle'>
        Copia el código y envialo en aplicaciones de mensajería
      </ThemedText>
      <ButtonApp label='Copiar en portapapeles' onPress={onCopyToClipboard} />
    </ThemedView>
  );
}