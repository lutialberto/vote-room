# Loading States - Vote-Room

Patrones para manejar estados de carga, errores, y datos vacíos de forma consistente.

---

## 🔄 Índice

1. [Loading Spinner Pattern](#1-loading-spinner-pattern)
2. [Loading con SpinnerApp Overlay](#2-loading-con-spinnerapp-overlay)

---

## 1. Loading Spinner Pattern

Para **data fetching** - mostrar estados while cargando datos.

```tsx
// ✅ Patrón: Loading states consistentes
export default function DataComponent() {
  const { data, isLoading, error, refetch } = useItemFetcherApp(
    () => fetchData(),
    []
  );

  if (isLoading) {
    return <SpinnerApp visible={true} />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <ThemedText type="subtitle">Error al cargar datos</ThemedText>
        <ThemedText>{error.message}</ThemedText>
        <ButtonApp label="Reintentar" onPress={refetch} type="secondary" />
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.emptyContainer}>
        <ThemedText>No hay datos disponibles</ThemedText>
      </View>
    );
  }

  return <DataView data={data} />;
}
```

### 💡 Puntos clave:

- **Early returns** para cada estado
- **Orden:** loading → error → empty → content
- **Error con retry** - permite al usuario reintentar
- **Empty state** - diferente de error

---

## 2. Loading con SpinnerApp Overlay

Para **acciones del usuario** (create, update, delete) - overlay que bloquea UI mientras procesa.

```tsx
// ✅ Patrón: Overlay spinner para acciones
export default function ActionComponent() {
  const { isWaiting, execPromise: handleAction } = useWaitingApp({
    functionToWait: performAction,
    success: () => Alert.alert("Éxito", "Acción completada"),
  });

  return (
    <SpinnerApp visible={isWaiting}>
      <View>
        <ButtonApp
          label="Ejecutar Acción"
          onPress={() => handleAction({ id: 1 })}
        />
      </View>
    </SpinnerApp>
  );
}
```

### 💡 Puntos clave:

- **SpinnerApp wrapper** - overlay que bloquea interacción
- **visible={isWaiting}** - controla visibilidad
- **UI permanece visible** bajo el overlay
- **Previene doble-submit** bloqueando la UI

---

## 🎯 Cuándo usar cada patrón

| Situación                              | Patrón                         | Hook                                      |
| -------------------------------------- | ------------------------------ | ----------------------------------------- |
| **Cargando lista/detalle** desde API   | Loading Spinner (early return) | `useItemFetcherApp` / `useListFetcherApp` |
| **Usuario crea/actualiza/elimina**     | SpinnerApp Overlay             | `useWaitingApp`                           |
| **Refresh de lista** (pull-to-refresh) | RefreshControl en FlatList     | `refetch` de hooks                        |

---

## 📝 Template de Error View

```tsx
// ✅ Component reutilizable para errores
function ErrorView({ error, onRetry }: { error: Error; onRetry: () => void }) {
  const colors = useThemeColor();

  return (
    <View style={styles.errorContainer}>
      <IconApp name="alert-circle-outline" size={48} colorName="red" />
      <ThemedText type="subtitle">Error al cargar</ThemedText>
      <ThemedText type="hint" style={{ textAlign: "center" }}>
        {error.message}
      </ThemedText>
      <ButtonApp
        label="Reintentar"
        icon="refresh-outline"
        onPress={onRetry}
        type="secondary"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    gap: 12,
  },
});
```

---

## 📝 Template de Empty View

```tsx
// ✅ Component reutilizable para estado vacío
function EmptyView({
  icon = "inbox-outline",
  title = "No hay elementos",
  subtitle = "Los elementos aparecerán aquí cuando estén disponibles",
}: {
  icon?: IconName;
  title?: string;
  subtitle?: string;
}) {
  return (
    <View style={styles.emptyContainer}>
      <IconApp name={icon} size={64} colorName="gray" />
      <ThemedText type="subtitle">{title}</ThemedText>
      <ThemedText type="hint" style={{ textAlign: "center" }}>
        {subtitle}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
    gap: 12,
  },
});
```

---

## 📚 Ver también

- [03-hooks.md](./03-hooks.md) - Hooks que retornan estos estados
- [05-layouts.md](./05-layouts.md#2-flatlist-pattern-con-refreshcontrol) - Loading en listas
- [07-best-practices.md](./07-best-practices.md) - Siempre manejar error states

---

**Nota:** SIEMPRE manejar los 4 estados: loading, error, empty, y content. Nunca ignorar el error state.
