# Layouts y UI - Vote-Room

Patrones de layout para formularios, listas, y modales.

---

## 📱 Índice

1. [KeyboardAvoidingView Pattern](#1-keyboardavoidingview-pattern)
2. [FlatList Pattern con RefreshControl](#2-flatlist-pattern-con-refreshcontrol)
3. [Modal Pattern](#3-modal-pattern)

---

## 1. KeyboardAvoidingView Pattern

Para **pantallas con formularios** - evita que el teclado tape los inputs.

```tsx
// ✅ Patrón: Layout que evita el keyboard
<KeyboardAvoidingView
  style={{ flex: 1 }}
  behavior={Platform.OS === "ios" ? "padding" : "height"}
  keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
>
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        gap: 20,
        paddingHorizontal: 20,
        paddingBottom: 40,
      }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {/* Form content */}
    </ScrollView>
  </TouchableWithoutFeedback>
</KeyboardAvoidingView>
```

### 💡 Puntos clave:

- **behavior** diferente por plataforma (iOS vs Android)
- **keyboardVerticalOffset** para ajuste fino (header height, etc)
- **TouchableWithoutFeedback** - permite cerrar keyboard tocando fuera
- **keyboardShouldPersistTaps="handled"** - permite tap en buttons mientras keyboard está abierto
- **contentContainerStyle** con `flexGrow: 1` - permite scroll completo
- **gap** para espaciado consistente

### 🎯 Cuándo usar:

- ✅ Pantallas con formularios (create, edit)
- ✅ Screens donde el usuario escribe
- ❌ NO en listas simples sin inputs (usa FlatList directamente)

---

## 2. FlatList Pattern con RefreshControl

Para **listas de datos** - optimizado con pull-to-refresh y estados vacíos.

```tsx
// ✅ Patrón: Lista optimizada con pull-to-refresh
<FlatList
  data={data}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => <ItemCard {...item} />}
  ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
  contentContainerStyle={{ padding: 16 }}
  showsVerticalScrollIndicator={false}
  refreshControl={
    <RefreshControl
      refreshing={isLoading}
      onRefresh={refetch}
      colors={[colors.primary]}
    />
  }
  ListEmptyComponent={() => (
    <View style={styles.emptyState}>
      <IconApp name="inbox-outline" size={48} colorName="gray" />
      <ThemedText type="subtitle">No hay elementos</ThemedText>
      <ThemedText type="hint">
        Los elementos aparecerán aquí cuando estén disponibles
      </ThemedText>
    </View>
  )}
  ListHeaderComponent={() => (
    <View style={{ marginBottom: 16 }}>
      <ThemedText type="title">Lista de Items</ThemedText>
    </View>
  )}
/>
```

### 💡 Puntos clave:

- **keyExtractor** - siempre usar ID único
- **ItemSeparatorComponent** - espaciado entre items
- **RefreshControl** - pull-to-refresh integrado
- **ListEmptyComponent** - mostrar cuando data está vacío
- **ListHeaderComponent** - header opcional (título, filtros, etc)
- **showsVerticalScrollIndicator={false}** - UX más clean

### 🔄 Integración con hooks:

```tsx
export default function ListScreen() {
  const { data, isLoading, error, refetch } = useListFetcherApp(
    () => fetchItems(),
    []
  );
  const colors = useThemeColor();

  if (isLoading && data.length === 0) {
    return <SpinnerApp visible={true} />;
  }

  if (error && data.length === 0) {
    return <ErrorView error={error} onRetry={refetch} />;
  }

  return (
    <FlatList
      data={data}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={refetch}
          colors={[colors.primary]}
        />
      }
      // ... rest of props
    />
  );
}
```

---

## 3. Modal Pattern

Para **popups y overlays** - tipado consistente con form integration.

```tsx
// ✅ Patrón: Modal tipado consistente
interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: FilterType) => void;
}

export default function FilterModal({
  visible,
  onClose,
  onApply,
}: FilterModalProps) {
  const { handleSubmit, control, reset } = useForm<FilterType>();

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <ThemedView style={styles.container}>
        <View style={styles.header}>
          <ThemedText type="subtitle">Filtros</ThemedText>
          <TouchableOpacity onPress={onClose}>
            <IconApp name="close" size={24} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>{/* Form fields */}</ScrollView>

        <View style={styles.footer}>
          <ButtonApp label="Aplicar" onPress={handleSubmit(onApply)} />
          <ButtonApp label="Limpiar" type="secondary" onPress={() => reset()} />
        </View>
      </ThemedView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  footer: {
    padding: 16,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
});
```

### 💡 Puntos clave:

- **Props tipadas** con interface
- **visible** controla visibilidad
- **onRequestClose** para Android back button
- **animationType** - "slide", "fade", "none"
- **presentationStyle="pageSheet"** - iOS style (modal no full-screen)
- **ThemedView** para background que respeta tema
- **Header/Content/Footer** layout estándar

### 🎯 Uso típico:

```tsx
export default function ParentScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  const handleApplyFilters = (filters: FilterType) => {
    console.log("Filters applied:", filters);
    setModalVisible(false);
    // Aplicar filtros...
  };

  return (
    <View>
      <ButtonApp label="Filtrar" onPress={() => setModalVisible(true)} />

      <FilterModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onApply={handleApplyFilters}
      />
    </View>
  );
}
```

---

## 📚 Ver también

- [02-forms.md](./02-forms.md) - Formularios dentro de KeyboardAvoidingView
- [03-hooks.md](./03-hooks.md) - useListFetcherApp para datos de FlatList
- [04-loading-states.md](./04-loading-states.md) - Estados en listas
- [06-data-presentation.md](./06-data-presentation.md) - Cards para FlatList items

---

**Nota:** Estos patterns cubren el 90% de las pantallas del proyecto. Usa estos layouts como base y personaliza cuando sea necesario.
