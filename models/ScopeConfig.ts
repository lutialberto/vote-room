export type MembersType = "unrestricted" | "authenticated" | "kyc";

export interface ScopeConfig {
  isPrivate: boolean;
  membersType: MembersType;
  key?: string; // Solo requerido cuando isPrivate es true
}

// Tipos de utilidad para diferentes configuraciones de scope
export type PublicScopeConfig = {
  isPrivate: false;
  membersType: MembersType;
};

export type PrivateScopeConfig = {
  isPrivate: true;
  membersType: MembersType;
  key: string;
};

// Tipo discriminado para mayor type safety
export type TypedScopeConfig = PublicScopeConfig | PrivateScopeConfig;

// Función helper para crear configuraciones de scope
export const createPublicScope = (
  membersType: MembersType = "unrestricted"
): PublicScopeConfig => ({
  isPrivate: false,
  membersType,
});

export const createPrivateScope = (
  key: string,
  membersType: MembersType = "authenticated"
): PrivateScopeConfig => ({
  isPrivate: true,
  membersType,
  key,
});

// Type guards para verificar el tipo de scope
export const isPrivateScope = (
  scope: ScopeConfig
): scope is PrivateScopeConfig => {
  return scope.isPrivate && Boolean(scope.key);
};

export const isPublicScope = (
  scope: ScopeConfig
): scope is PublicScopeConfig => {
  return !scope.isPrivate;
};
