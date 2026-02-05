import { create } from "zustand";
import { User } from "@/models/User";
import {
  getFromStorage,
  removeFromStorage,
  saveToStorage,
} from "@/utils/storage.utils";
import { router } from "expo-router";

export interface UserData {
  currentUser?: User;
  isAuthenticated: boolean;
  isReady: boolean;
}

export interface UserState extends UserData {
  loadInitialUser: () => void;
  switchUser: (user: User) => void;
  login: (user: User) => void;
  logout: () => void;
}

const INIT: UserData = {
  isAuthenticated: false,
  isReady: false,
};

const persistUserSession = async (user?: User) => {
  if (user) {
    await saveToStorage({ key: "userSession" }, JSON.stringify(user));
  } else {
    await removeFromStorage({ key: "userSession" });
  }
};

export const useUser = create<UserState>((set) => ({
  ...INIT,
  loadInitialUser: async () => {
    const userSession = await getFromStorage({ key: "userSession" });
    if (userSession) {
      const currentUser = JSON.parse(userSession) as User;
      set({
        currentUser,
        isAuthenticated: true,
        isReady: true,
      });
    } else {
      set({
        isAuthenticated: false,
        isReady: true,
      });
    }
  },
  switchUser: (currentUser: User) => {
    persistUserSession(currentUser);
    set({ currentUser });
  },
  login: (currentUser: User) => {
    persistUserSession(currentUser);
    set({ currentUser, isAuthenticated: true });
    router.replace("/(tabs)/exploreRooms/byCode");
  },
  logout: () => {
    persistUserSession();
    set({ currentUser: undefined, isAuthenticated: false });
    router.replace("/userCreation/login");
  },
}));
