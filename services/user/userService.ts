import {
  User,
  UserEmailForCreation,
  UserSimpleForCreation,
} from "@/models/User";
import { userServiceInstance } from "./userServiceImpl";

/**
 * USER SERVICE - API FUNCTIONS
 *
 * Este archivo solo contiene las funciones públicas que usan los componentes.
 * La implementación real está en userServiceImpl.ts
 *
 * Para migrar a APIs reales:
 * 1. Cambiar userServiceInstance por una implementación que haga fetch()
 * 2. Las funciones de este archivo no cambian
 */

// Funciones públicas del servicio
export const fetchUsers = async (): Promise<User[]> => {
  return userServiceInstance.fetchUsers();
};

export const createUser = async (
  user: UserSimpleForCreation
): Promise<User> => {
  return userServiceInstance.createUserSimple(user);
};

export const createUserEmail = async (
  user: UserEmailForCreation
): Promise<User> => {
  return userServiceInstance.createUserEmail(user);
};

export const updateUserEmailPassword = async (data: {
  email: string;
  password: string;
}): Promise<User> => {
  return userServiceInstance.updateUserEmailPassword(data);
};

export const fetchUserByCredentials = async (
  email: string,
  password: string
): Promise<User> => {
  return userServiceInstance.fetchUserByCredentials(email, password);
};

export const checkUserByEmail = async (email: string): Promise<boolean> => {
  return userServiceInstance.checkUserByEmail(email);
};
