# Hooks Personalizados - Vote-Room

Hooks reutilizables para data fetching, acciones async, y estado global con Zustand.

---

## 🔗 Índice

1. [Data Fetching Hook Individual](#1-data-fetching-hook-individual)
2. [Data Fetching Hook para Listas](#2-data-fetching-hook-para-listas)
3. [Async Action Hook con Loading](#3-async-action-hook-con-loading)
4. [Domain-Specific Hook con Zustand](#4-domain-specific-hook-con-zustand)

---

## 1. Data Fetching Hook Individual

Para fetch de un **item único** (ej: detalle de una votación, perfil de usuario).

```tsx
// ✅ Patrón: Hook para fetch de item único
export function useItemFetcherApp<T>(
  fetchFn: () => Promise<T>,
  deps: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchWrapper = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchFn();
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchFn]);

  useEffect(() => {
    fetchWrapper();
  }, deps);

  return {
    data,
    isLoading,
    error,
    refetch: fetchWrapper,
  };
}
```

### 💡 Uso típico:

```tsx
// En un componente de detalle
const {
  data: voting,
  isLoading,
  error,
  refetch,
} = useItemFetcherApp(() => votingService.fetchVotingById(id), [id]);

if (isLoading) return <SpinnerApp visible={true} />;
if (error) return <ErrorView error={error} onRetry={refetch} />;
if (!data) return <EmptyView />;

return <VotingDetail voting={voting} />;
```

---

## 2. Data Fetching Hook para Listas

Para fetch de **arrays/listas** (ej: lista de rooms, lista de votaciones).

```tsx
// ✅ Patrón: Hook para arrays/listas
export function useListFetcherApp<T>(
  fetchFn: () => Promise<T[]>,
  deps: any[] = []
) {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchWrapper = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchFn();
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchFn]);

  useEffect(() => {
    fetchWrapper();
  }, deps);

  return {
    data,
    isLoading,
    error,
    refetch: fetchWrapper,
  };
}
```

### 💡 Uso típico:

```tsx
// En una lista/index screen
const {
  data: rooms,
  isLoading,
  error,
  refetch,
} = useListFetcherApp(() => roomService.fetchMyRooms(), []);

return (
  <FlatList
    data={rooms}
    renderItem={({ item }) => <RoomCard room={item} />}
    refreshControl={
      <RefreshControl refreshing={isLoading} onRefresh={refetch} />
    }
    ListEmptyComponent={<EmptyView />}
  />
);
```

---

## 3. Async Action Hook con Loading

Para **operaciones async** como create, update, delete (acciones que ejecuta el usuario).

```tsx
// ✅ Patrón: Hook para operaciones async (create, update, delete)
export function useWaitingApp<T, K>({
  functionToWait,
  success,
  failure,
}: {
  functionToWait: (arg: T) => Promise<K>;
  success?: (result: K) => void;
  failure?: (error: Error) => void;
}) {
  const [isWaiting, setIsWaiting] = useState<boolean>(false);

  const execPromise = useCallback(
    async (arg: T) => {
      setIsWaiting(true);
      try {
        const result = await functionToWait(arg);
        success?.(result);
      } catch (error) {
        const err = error as Error;
        if (failure) {
          failure(err);
        } else {
          Alert.alert("Error", err.message || "Ocurrió un error");
        }
      } finally {
        setIsWaiting(false);
      }
    },
    [functionToWait, success, failure]
  );

  return {
    isWaiting,
    execPromise,
  };
}
```

### 💡 Uso típico:

```tsx
// Para crear una votación
const { isWaiting, execPromise: handleCreate } = useWaitingApp({
  functionToWait: votingService.createVoting,
  success: (voting) => {
    Alert.alert("Éxito", "Votación creada");
    router.push(`/votings/${voting.id}`);
  },
  failure: (error) => {
    Alert.alert("Error", error.message);
  },
});

// En el form submit
const onSubmit = (formData: VotingFormData) => {
  handleCreate(formData);
};

return (
  <SpinnerApp visible={isWaiting}>
    <Form onSubmit={onSubmit} />
  </SpinnerApp>
);
```

### 🔄 Diferencia clave: useItemFetcherApp vs useWaitingApp

| Hook                | Propósito                                       | Trigger                     | Ejemplo                       |
| ------------------- | ----------------------------------------------- | --------------------------- | ----------------------------- |
| `useItemFetcherApp` | **Fetch/READ** - Obtener datos                  | Automático (useEffect)      | Ver detalle de room           |
| `useWaitingApp`     | **CREATE/UPDATE/DELETE** - Acciones del usuario | Manual (usuario hace click) | Crear votación, eliminar room |

---

## 4. Domain-Specific Hook con Zustand

Para **estado global** específico de un dominio (persiste entre pantallas).

```tsx
// ✅ Patrón: Hook de dominio con estado global
import { create } from "zustand";

type BaseVotingState = {
  data: BaseVotingForCreation | null;
  saveBaseVotingData: (data: BaseVotingForCreation) => void;
  resetBaseVotingData: () => void;
};

export const useBaseVoting = create<BaseVotingState>((set) => ({
  data: null,
  saveBaseVotingData: (data: BaseVotingForCreation) => set({ data }),
  resetBaseVotingData: () => set({ data: null }),
}));
```

### 💡 Uso típico:

```tsx
// En pantalla 1: Guardar datos base
function Step1Screen() {
  const { saveBaseVotingData } = useBaseVoting();

  const onSubmit = (formData: BaseVotingForCreation) => {
    saveBaseVotingData(formData);
    router.push("/voting/step2");
  };

  return <Form onSubmit={onSubmit} />;
}

// En pantalla 2: Usar datos guardados
function Step2Screen() {
  const { data: baseVotingData, resetBaseVotingData } = useBaseVoting();

  const onComplete = async () => {
    const fullVoting = { ...baseVotingData, ...step2Data };
    await createVoting(fullVoting);
    resetBaseVotingData(); // Limpiar después de crear
    router.push("/success");
  };

  return <CompleteForm baseData={baseVotingData} onSubmit={onComplete} />;
}
```

### 🎯 Cuándo usar Zustand:

- ✅ Multi-step forms que persisten entre pantallas
- ✅ Estado que necesitan múltiples componentes no-relacionados
- ✅ Configuración global de la app (tema, usuario autenticado, etc)
- ❌ NO para estado local de un solo componente (usa useState)
- ❌ NO para data fetching (usa useItemFetcherApp/useListFetcherApp)

---

## 📚 Ver también

- [04-loading-states.md](./04-loading-states.md) - Cómo manejar los estados de loading/error
- [02-forms.md](./02-forms.md) - Usar useWaitingApp en submit de forms
- [05-layouts.md](./05-layouts.md#2-flatlist-pattern-con-refreshcontrol) - Usar hooks con FlatList

---

**Nota:** Estos hooks son los bloques fundamentales para manejo de datos async en el proyecto. Úsalos consistentemente en lugar de reimplementar la lógica.
