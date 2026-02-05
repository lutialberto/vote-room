# Vote-Room Architecture - Guía Arquitectónica

## 🏗️ Arquitectura General

Este es un proyecto **React Native con Expo** que utiliza **TypeScript** y **Expo Router** para navegación. La arquitectura sigue patrones modulares y clean architecture.

### Stack Principal

- **Framework**: React Native + Expo
- **Navegación**: Expo Router con file-based routing
- **Formularios**: React Hook Form
- **Gestión Estado**: Zustand
- **UI**: Componentes personalizados con theming
- **Tipado**: TypeScript estricto

## 📁 Estructura de Carpetas

### Organización Modular

```
app/                    # Expo Router - rutas principales
├── (tabs)/            # Tab navigation
│   ├── myRooms/       # Gestión de salas
│   ├── myVotings/     # Gestión de votaciones
│   ├── newRoom/       # Flujo creación sala
│   └── exploreRooms/  # Exploración y búsqueda

components/            # Componentes reutilizables globales
├── ButtonApp.tsx      # Botón principal
├── InputTextApp.tsx   # Input con validación
├── CardApp.tsx        # Cards consistentes
└── ui/               # Componentes UI específicos

modules/               # Módulos de dominio
├── voting/            # Lógica de votaciones
│   ├── components/   # Componentes específicos
│   ├── hooks/        # Hooks del dominio
│   ├── services/     # Servicios API
│   ├── models/       # Tipos del dominio
│   └── types/        # Tipos específicos (boolean, options)
└── rooms/             # Lógica de salas

hooks/                 # Hooks globales reutilizables
services/              # Servicios API globales
models/               # Tipos/interfaces globales
constants/            # Constantes (Colors, etc.)
contexts/             # Context providers
```

### 🎯 Principios de Organización

#### ✅ Estructura por Dominio (NO por tipo de archivo)

```
✅ CORRECTO:
modules/
├── voting/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   └── models/
└── rooms/
    ├── components/
    ├── hooks/
    └── services/

❌ INCORRECTO:
├── components/ (todos mezclados)
├── hooks/      (todos mezclados)
├── services/   (todos mezclados)
```

#### 🔄 Separación de Responsabilidades

- **`app/`**: Solo routing y screens principales
- **`components/`**: Solo componentes globales reutilizables
- **`modules/`**: Lógica específica de dominio
- **`services/`**: Solo servicios compartidos entre módulos

## 🌈 Sistema de Colores y Theming

### ColorScheme Interface

```typescript
export interface ColorScheme {
  primary: string;
  secondary: string;
  cancel: string;
  orange: string;
  green: string;
  gray: string;
  red: string;
  border: string;
  text: string;
  background: string;
  tint: string;
  icon: string;
  tabIconDefault: string;
  tabIconSelected: string;
  cardBackground: string;
}
```

### Hook de Theming

```tsx
// ✅ Patrón: Hook centralizado de colores
export function useThemeColor(): ColorScheme {
  const colorScheme = useColorScheme();
  return Colors[colorScheme ?? "light"];
}

// ✅ Uso en componentes
export function ComponentExample() {
  const colors = useThemeColor();
  const styles = getStyles(colors);

  return <View style={styles.container}>...</View>;
}

const getStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.cardBackground,
      borderRadius: 12,
    },
  });
```

### Colores Definidos

```typescript
const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";
const primary = "#0186FF";
const secondary = "#34C759";
const cancel = "#FF3B30";

export const Colors: { light: ColorScheme; dark: ColorScheme } = {
  light: {
    primary,
    secondary,
    cancel,
    text: "#11181C",
    background: "#fff",
    cardBackground: "#F7F9FA",
    // ...
  },
  dark: {
    primary,
    secondary,
    cancel,
    text: "#ECEDEE",
    background: "#151718",
    cardBackground: "#1E2021",
    // ...
  },
};
```

## 🎨 Patrones de Navegación

### Expo Router File-Based Routing

```
app/
├── _layout.tsx           # Root layout
├── (tabs)/              # Tab group
│   ├── _layout.tsx      # Tabs layout
│   ├── myRooms/
│   │   ├── index.tsx    # /myRooms
│   │   └── [roomId]/    # /myRooms/[roomId]
│   └── myVotings/
│       ├── index.tsx    # /myVotings
│       └── [id]/        # /myVotings/[id]
└── +not-found.tsx       # 404 page
```

### Layout Patterns

```tsx
// ✅ Root Layout con Providers
export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </SafeAreaView>
  );
}
```

### Parámetros Tipados

```tsx
// ✅ Patrón: useLocalSearchParams tipado
export default function VotingPage() {
  const { id } = useLocalSearchParams<{ id: string }>();

  // Pattern matching por tipo
  const { data } = useItemFetcherApp<BaseVoting>(
    () => fetchBaseVotingById(Number(id)),
    [id]
  );

  switch (data?.type) {
    case "boolean":
      return <BooleanVotingView id={Number(id)} user={user} />;
    case "options":
      return <OptionsVotingView id={Number(id)} user={user} />;
    default:
      return <ThemedText>Tipo no soportado.</ThemedText>;
  }
}
```

## 🏷️ Patrones de Tipos y Modelado

### Union Types y Discriminated Unions

```tsx
// ✅ Patrón: Tipos base + extensiones específicas
export type BaseRoom = {
  code: string;
  label: string;
  description: string;
  ownerName: string;
  ownerUserId: number;
  memberCount?: number;
  lastActivity?: string;
  status: RoomStatus;
};

export type PrivateRoomType = BaseRoom & {
  isPrivate: true;
  key: string;
};

export type PublicRoomType = BaseRoom & {
  isPrivate: false;
};

export type Room = PrivateRoomType | PublicRoomType;
```

### Factory Pattern para Tipos

```tsx
// ✅ Patrón: Factory dinámico tipado
const VotingFormComponents = {
  boolean: BaseVotingForm,
  options: OptionsVotingForm,
} as const;

export function getVotingFormComponent(type: VotingType) {
  return VotingFormComponents[type];
}
```

## 📡 Arquitectura de Servicios

### Service Layer Pattern

```tsx
// ✅ Patrón: Separación API pública vs Implementación

// roomService.ts - API PÚBLICA (lo que usan los componentes)
export const fetchPublicRooms = (
  userId: number,
  filter: PublicRoomTypeFilter
): Promise<PublicRoomType[]> =>
  roomServiceInstance.fetchPublicRooms(userId, filter);

export const createRoom = (roomData: CreateRoomData): Promise<Room> =>
  roomServiceInstance.createRoom(roomData);

// roomServiceImpl.ts - IMPLEMENTACIÓN (mock/API real)
export class RoomServiceImpl {
  private rooms: Room[] = [...MOCK_DATA];

  async fetchPublicRooms(
    userId: number,
    filter: PublicRoomTypeFilter
  ): Promise<PublicRoomType[]> {
    // MOCK - fácil migrar a fetch() real
    return this.rooms.filter(
      (room) => !room.isPrivate && this.matchesFilter(room, filter)
    );
  }
}

export const roomServiceInstance = new RoomServiceImpl();
```

### Ventajas del Pattern:

1. **🔄 Fácil migración**: Mock → API real sin cambiar componentes
2. **🧪 Testeable**: Mock implementations para testing
3. **🔌 Intercambiable**: Diferentes implementaciones (dev/prod)

## 🚀 Estrategia de Migración a APIs Reales

### Actual: Mock Implementation

```tsx
export class VotingServiceImpl {
  private votings: BaseVoting[] = [...MOCK_VOTINGS];

  async fetchBaseVotingById(id: number): Promise<BaseVoting> {
    // MOCK
    const voting = this.votings.find((v) => v.id === id);
    if (!voting) throw new Error("Voting not found");
    return Promise.resolve(voting);
  }
}
```

### Migración: API Real

```tsx
export class VotingServiceImpl {
  private baseUrl = process.env.EXPO_PUBLIC_API_URL;

  async fetchBaseVotingById(id: number): Promise<BaseVoting> {
    // API REAL - los componentes NO cambian
    const response = await fetch(`${this.baseUrl}/votings/${id}`);
    if (!response.ok) throw new Error("Failed to fetch voting");
    return response.json();
  }
}
```

### 🎯 Pasos de Migración:

1. ✅ Mantener interface pública igual
2. ✅ Cambiar solo la implementación interna
3. ✅ Agregar error handling apropiado
4. ✅ Mantener tipos TypeScript
5. ✅ Testing con las mismas interfaces

## 📋 Principios Arquitectónicos

### ✅ **DO's Arquitectónicos:**

- **Separación por dominio**: Módulos cohesivos (voting/, rooms/)
- **Interfaces estables**: APIs públicas que no cambian
- **Tipado estricto**: TypeScript en toda la aplicación
- **Theming centralizado**: useThemeColor hook consistente
- **File-based routing**: Estructura clara con Expo Router
- **Mock-to-real path**: Servicios preparados para migración
- **Context para estado global**: User, Auth, etc.

### ❌ **DON'Ts Arquitectónicos:**

- **No organizar por tipo de archivo**: components/, hooks/, etc. globales
- **No hardcodear URLs**: Usar environment variables
- **No acoplar UI con lógica**: Separar en hooks y servicios
- **No ignorar TypeScript**: Evitar `any`, tipar correctamente
- **No estilos inline complejos**: Usar getStyles pattern
- **No lógica en componentes de layout**: Solo estructura

## 🔧 Setup y Configuración

### Dependencias Core

```json
{
  "expo": "latest",
  "expo-router": "latest",
  "react-hook-form": "latest",
  "zustand": "latest",
  "react-native": "latest",
  "typescript": "latest"
}
```

### Estructura de tsconfig.json

```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./"]
    }
  }
}
```

### Environment Setup

```bash
# .env.example
EXPO_PUBLIC_API_URL=http://localhost:3000
EXPO_PUBLIC_ENV=development
```

---

Este documento define la arquitectura base del proyecto vote-room. Para patrones de desarrollo específicos, consultar `vote-room-development.prompt.md`.
