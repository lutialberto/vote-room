import { useState, useEffect } from "react";
import {
  getFromStorage,
  removeFromStorage,
  saveToStorage,
} from "@/utils/storage.utils";
import { Href } from "expo-router";

const HAS_DEEPLINK = "hasDeeplinkToHandle";

export function useDeeplinkHolderApp() {
  const [isLoading, setIsLoading] = useState(true);
  const [deeplink, setDeeplink] = useState<Href | undefined>(undefined);

  useEffect(() => {
    checkDeeplinkStatus();
  }, []);

  const checkDeeplinkStatus = async () => {
    setIsLoading(true);
    const value = await getFromStorage({ key: HAS_DEEPLINK });
    if (value) setDeeplink(value as Href);
    setIsLoading(false);
  };

  const saveDeeplink = async (deeplinkUrl: Href) => {
    saveToStorage({ key: HAS_DEEPLINK }, deeplinkUrl.toString());
    setDeeplink(deeplinkUrl);
  };

  const removeDeeplink = () => {
    removeFromStorage({ key: HAS_DEEPLINK });
    setDeeplink(undefined);
  };

  return {
    isLoading,
    deeplink,
    saveDeeplink,
    removeDeeplink,
  };
}
