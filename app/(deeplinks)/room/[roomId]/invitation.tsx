import { SpinnerApp } from "@/components/SpinnerApp";
import { useDeeplinkHolderApp } from "@/hooks/useDeeplinkHolderApp";
import { useUser } from "@/hooks/useUser";
import { useWaitingApp } from "@/hooks/useWaitingApp";
import { joinRoom } from "@/services/roomMember/roomMemberService";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";

export default function DeeplinkRoomInvitation() {
  const { roomId } = useLocalSearchParams<{ roomId: string }>();
  const { currentUser } = useUser();
  const { removeDeeplink } = useDeeplinkHolderApp();
  const { execPromise: handleJoinRoom } = useWaitingApp<
    {
      roomCode: string;
      userId: number;
    },
    {
      roomCode: string;
    }
  >({
    functionToWait: ({ roomCode, userId }) => joinRoom(roomCode, userId),
    success: ({ roomCode }) => {
      removeDeeplink();
      router.push(`/dashboard/myRooms/${roomCode}`);
    },
    failure: (error) => {
      removeDeeplink();
      router.push(`/explore/byCode`);
    },
  });

  useEffect(() => {
    if (!roomId || !currentUser?.id) return;
    handleJoinRoom({ roomCode: roomId, userId: currentUser?.id as number });
  }, [roomId, currentUser?.id]);

  return <SpinnerApp visible={true} />;
}
