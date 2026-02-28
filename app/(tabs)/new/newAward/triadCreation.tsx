import { ButtonApp } from "@/components/ButtonApp";
import { SpinnerApp } from "@/components/SpinnerApp";
import { ThemedView } from "@/components/ThemedView";
import { useWaitingApp } from "@/hooks/useWaitingApp";
import AwardTriadForm from "@/modules/awards/newSteps/components/AwardTriadForm";
import AwardTriadsCarrusel from "@/modules/awards/newSteps/components/AwardTriadsCarrusel";
import {
  TriadItemData,
  useNewAwardSteps,
} from "@/modules/awards/newSteps/hooks/useNewAwardSteps";
import { router } from "expo-router";
import { useState } from "react";

export default function TriadCreation() {
  const [triads, setTriads] = useState<TriadItemData[]>([]);
  const { saveTriadsData } = useNewAwardSteps();

  const { isWaiting, execPromise: fnCreateAward } = useWaitingApp<void, string>(
    {
      functionToWait: async () => "",
      success: (id) => {
        //TODO: Redirigir a la pantalla de detalles del premio creado
        // router.push(`/dashboard/myAwards/${id}`);
      },
    }
  );

  const onSubmitTriad = (data: TriadItemData) => {
    if (triads.some((triad) => triad.name === data.name)) {
      alert("Ya existe una terna con ese nombre. Por favor elige otro nombre.");
      return;
    }
    const updatedTriads = [...triads, data];
    setTriads(updatedTriads);
  };

  const handleSaveTriads = () => {
    if (triads.length === 0) {
      alert("Por favor, agrega al menos una terna antes de continuar.");
      return;
    }
    saveTriadsData(triads);
    fnCreateAward();
  };

  return (
    <ThemedView style={{ flex: 1, paddingHorizontal: 10, gap: 10 }}>
      <SpinnerApp visible={isWaiting}>
        <AwardTriadsCarrusel
          triads={triads}
          onTriadsChange={(triads) => setTriads(triads)}
        />
        <AwardTriadForm onSubmit={onSubmitTriad} />
        <ButtonApp label="Continuar" onPress={handleSaveTriads} />
      </SpinnerApp>
    </ThemedView>
  );
}
