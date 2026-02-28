import { ButtonApp } from "@/components/ButtonApp";
import { SpinnerApp } from "@/components/SpinnerApp";
import { ThemedView } from "@/components/ThemedView";
import { useAuthenticatedUser } from "@/hooks/useAuthenticatedUser";
import { useWaitingApp } from "@/hooks/useWaitingApp";
import { AwardBaseData, TriadItemData } from "@/modules/awards/models/award";
import AwardTriadForm from "@/modules/awards/newSteps/components/AwardTriadForm";
import AwardTriadsCarrusel from "@/modules/awards/newSteps/components/AwardTriadsCarrusel";
import { useNewAwardSteps } from "@/modules/awards/newSteps/hooks/useNewAwardSteps";
import { createAward } from "@/modules/awards/services/award/awardService";
import { router } from "expo-router";
import { useState } from "react";

export default function TriadCreation() {
  const [triads, setTriads] = useState<TriadItemData[]>([]);
  const { currentUser } = useAuthenticatedUser();
  const { saveTriadsData, awardBaseData } = useNewAwardSteps();

  const { isWaiting, execPromise: fnCreateAward } = useWaitingApp<
    {
      userId: number;
      baseData: AwardBaseData;
      triads: TriadItemData[];
    },
    number
  >({
    functionToWait: ({ userId, baseData, triads }) =>
      createAward(userId, baseData, triads),
    success: (id) => {
      router.push(`/dashboard/myAwards/${id}`);
    },
  });

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
    fnCreateAward({ userId: currentUser.id, baseData: awardBaseData!, triads });
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
