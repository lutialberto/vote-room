# Vote-Room Development - Guía de Desarrollo

## 🎨 Patrones de Componentes

### 1. Componente Base con Props Tipadas

```tsx
// ✅ Patrón: Props interface + destructuring + theming
export type ButtonAppProps = TouchableOpacityProps & {
  type?: "primary" | "secondary" | "cancel";
  label?: string;
  labelStyle?: TextStyle;
  icon?: IconName;
};

export function ButtonApp({
  style,
  label,
  labelStyle,
  type = "primary",
  ...otherProps
}: ButtonAppProps) {
  const colors = useThemeColor();
  const styles = getStyles(colors);

  return (
    <TouchableOpacity
      style={[
        styles.container,
        type === "secondary" && { backgroundColor: colors.secondary },
        type === "cancel" && { backgroundColor: colors.cancel },
        style,
      ]}
      {...otherProps}
    >
      <View style={{ gap: 8, flexDirection: "row", alignItems: "center" }}>
        {otherProps.icon && (
          <IconApp
            name={otherProps.icon}
            size={labelStyle?.fontSize ?? 16}
            color={labelStyle?.color?.toString() ?? colors.text}
          />
        )}
        {label && <ThemedText style={labelStyle}>{label}</ThemedText>}
      </View>
    </TouchableOpacity>
  );
}

const getStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 24,
      paddingVertical: 10,
      paddingHorizontal: 15,
      backgroundColor: colors.primary,
    },
  });
```

### 2. Card Wrapper Pattern

```tsx
// ✅ Patrón: Wrapper component reutilizable
export function CardApp(props: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  type?: "default" | "withShadow";
}) {
  const colors = useThemeColor();
  const styles = getStyles(colors);

  return (
    <ThemedView
      style={[
        styles.container,
        props.type === "withShadow" && styles.withShadow,
        props.style,
      ]}
    >
      {props.children}
    </ThemedView>
  );
}

const getStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    container: {
      borderRadius: 12,
      padding: 16,
      backgroundColor: colors.cardBackground,
    },
    withShadow: {
      shadowColor: "black",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
      margin: 4,
    },
  });
```

### 3. Themed Text Pattern

```tsx
// ✅ Patrón: Component con variants tipadas
export type ThemedTextProps = TextProps & {
  colorName?: ColorName;
  type?:
    | "default"
    | "title"
    | "subtitle"
    | "inputError"
    | "inputLabel"
    | "hint";
};

export function ThemedText({
  style,
  colorName = "text",
  type = "default",
  ...rest
}: ThemedTextProps) {
  const colors = useThemeColor();
  const styles = getStyles(colors);
  const color = colors[colorName];

  return <Text style={[styles[type], { color }, style]} {...rest} />;
}

const getStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    default: { fontSize: 16 },
    title: { fontSize: 32, fontWeight: "bold" },
    subtitle: { fontSize: 18, fontWeight: "600" },
    inputError: { color: colors.red, fontSize: 12 },
    inputLabel: { fontSize: 14, fontWeight: "500", marginBottom: 4 },
    hint: { fontSize: 12, opacity: 0.6 },
  });
```

## 📝 Patrones de Formularios

### 1. Form Principal con React Hook Form

```tsx
// ✅ Patrón: Form tipado con validación
type FormData = {
  name: string;
  description: string;
};

export default function FormExample() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Procesar datos
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1, gap: 20 }}
      >
        <InputTextApp
          inputControl={{
            control,
            name: "name",
            rules: {
              required: "El nombre es requerido",
              minLength: {
                value: 3,
                message: "Mínimo 3 caracteres",
              },
            },
          }}
          textInputProps={{
            placeholder: "Ingresa nombre...",
          }}
          label="Nombre"
        />

        <InputTextApp
          inputControl={{
            control,
            name: "description",
          }}
          label="Descripción - opcional"
          type="multiline"
          maxLength={256}
          textInputProps={{
            multiline: true,
            numberOfLines: 3,
          }}
        />

        <ButtonApp label="Guardar" onPress={handleSubmit(onSubmit)} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
```

### 2. Input Component Reutilizable

```tsx
// ✅ Patrón: Input generic con React Hook Form
export type InputTextAppProps<T extends FieldValues> = {
  inputControl: UseControllerProps<T>;
  label?: string;
  errorMessage?: string;
  containerStyle?: StyleProp<ViewStyle>;
  textInputProps?: TextInputProps;
  maxLength?: number;
  type?: "text" | "multiline";
};

export default function InputTextApp<T extends FieldValues>({
  inputControl,
  errorMessage,
  label,
  containerStyle,
  textInputProps = {},
  maxLength,
  type = "text",
}: InputTextAppProps<T>) {
  const {
    field,
    fieldState: { error },
  } = useController(inputControl);
  const colors = useThemeColor();
  const styles = getStyles(colors);

  return (
    <View style={containerStyle}>
      {label && <ThemedText type="inputLabel">{label}</ThemedText>}

      <TextInput
        value={field.value || ""}
        onChangeText={field.onChange}
        style={[
          styles.input,
          type === "multiline" && styles.multiline,
          { borderColor: error ? colors.red : colors.border },
        ]}
        maxLength={maxLength}
        {...textInputProps}
      />

      {maxLength && (
        <ThemedText type="hint" style={styles.counter}>
          {(field.value || "").length}/{maxLength}
        </ThemedText>
      )}

      {(error || errorMessage) && (
        <ThemedText type="inputError">
          {error?.message || errorMessage}
        </ThemedText>
      )}
    </View>
  );
}

const getStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    input: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 16,
      backgroundColor: colors.background,
    },
    multiline: {
      minHeight: 80,
      textAlignVertical: "top",
    },
    counter: {
      alignSelf: "flex-end",
      marginTop: 4,
    },
  });
```

### 3. RadioButton Component Pattern

```tsx
// ✅ Patrón: Radio buttons tipados
export type RadioButtonAppOption = {
  label: string;
  selected: boolean;
  value: string;
};

export type RadioButtonAppProps = {
  options: RadioButtonAppOption[];
  onPress: (value: string) => void;
  enabled?: boolean;
};

export function RadioButtonApp({
  options,
  onPress,
  enabled = true,
}: RadioButtonAppProps) {
  const colors = useThemeColor();
  const styles = getStyles(colors);

  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          style={styles.optionContainer}
          onPress={() => enabled && onPress(option.value)}
          disabled={!enabled}
        >
          <View
            style={[
              styles.radioIcon,
              { borderColor: colors.primary },
              option.selected && { backgroundColor: colors.primary },
            ]}
          />
          <ThemedText>{option.label}</ThemedText>
        </TouchableOpacity>
      ))}
    </View>
  );
}
```

## 🔗 Patrones de Hooks Personalizados

### 1. Data Fetching Hook Individual

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

// 💡 Uso típico:
const { data, isLoading, error, refetch } = useItemFetcherApp(
  () => fetchVotingById(id),
  [id]
);
```

### 2. Data Fetching Hook para Listas

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

### 3. Async Action Hook con Loading

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

// 💡 Uso típico:
const { isWaiting, execPromise: handleSave } = useWaitingApp({
  functionToWait: saveVoting,
  success: () => router.push("/success"),
  failure: (error) => Alert.alert("Error", error.message),
});
```

### 4. Domain-Specific Hook con Zustand

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

// 💡 Uso en componentes:
const { saveBaseVotingData, resetBaseVotingData } = useBaseVoting();
```

## 🔄 Patrones de Loading y Estados

### 1. Loading Spinner Pattern

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

### 2. Loading con SpinnerApp Overlay

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

## 📱 Patrones de Layout y UI

### 1. KeyboardAvoidingView Pattern

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

### 2. FlatList Pattern con RefreshControl

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

### 3. Modal Pattern

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
```

## 📊 Patrones de Presentación de Datos

### 1. Card List Item Pattern

```tsx
// ✅ Patrón: Item card consistente
export default function ItemCard({ item }: { item: ItemType }) {
  const colors = useThemeColor();
  const styles = getStyles(colors);

  return (
    <CardApp type="withShadow">
      <TouchableOpacity
        onPress={() => router.push(`/items/${item.id}`)}
        style={styles.cardContent}
      >
        <View style={styles.header}>
          <View style={styles.titleSection}>
            <ThemedText type="subtitle" numberOfLines={2}>
              {item.title}
            </ThemedText>
            <ThemedText type="hint">por {item.ownerName}</ThemedText>
          </View>

          <View style={styles.statusSection}>
            <StatusBadge status={item.status} />
            {item.hasNotifications && (
              <IconApp name="notifications" size={16} colorName="primary" />
            )}
          </View>
        </View>

        <ThemedText numberOfLines={3} style={styles.description}>
          {item.description}
        </ThemedText>

        <View style={styles.footer}>
          <View style={styles.metadata}>
            <IconApp name="people" size={16} colorName="gray" />
            <ThemedText type="hint">{item.memberCount} miembros</ThemedText>
          </View>

          <ThemedText type="hint">
            {formatRelativeTime(item.lastActivity)}
          </ThemedText>
        </View>
      </TouchableOpacity>
    </CardApp>
  );
}
```

## 📋 Mejores Prácticas de Desarrollo

### ✅ **DO's de Desarrollo:**

- **Usar TypeScript estricto** para todos los componentes
- **Hooks personalizados** para lógica reutilizable
- **Loading/Error states** en todos los data fetchers
- **KeyboardAvoidingView** + ScrollView para formularios
- **Validación con React Hook Form** y mensajes claros
- **useCallback/useMemo** para optimización cuando corresponde
- **Separar lógica de presentación** con hooks
- **Theming consistente** con useThemeColor

### ❌ **DON'Ts de Desarrollo:**

- **No hardcodear valores** - usar constants y theming
- **No usar `any`** - tipar correctamente siempre
- **No repetir lógica de fetch** - crear hooks reutilizables
- **No ignorar error states** - siempre manejar errores
- **No inline styles complejos** - usar getStyles pattern
- **No lógica de negocio en componentes** - mover a hooks/servicios
- **No olvidar accessibility** - labels, hints, etc.
- **No componentes gigantes** - dividir en sub-componentes

---

Este documento cubre los patrones de desarrollo específicos del proyecto vote-room. Para arquitectura general, consultar `vote-room-architecture.prompt.md`.
