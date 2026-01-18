import { User } from "@/models/User";
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
