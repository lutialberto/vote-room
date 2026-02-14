# Formularios - Vote-Room

Patrones de formularios con React Hook Form, validación, y componentes de input reutilizables.

---

## 📝 Índice

1. [Form Principal con React Hook Form](#1-form-principal-con-react-hook-form)
2. [Input Component Reutilizable](#2-input-component-reutilizable)
3. [RadioButton Component Pattern](#3-radiobutton-component-pattern)

---

## 1. Form Principal con React Hook Form

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

### 💡 Puntos clave:

- **React Hook Form** para gestión de state
- **Validación tipada** con rules
- **KeyboardAvoidingView** para UX en móvil
- **handleSubmit** wrapper para validación automática

---

## 2. Input Component Reutilizable

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

### 💡 Puntos clave:

- **Generic component** con TypeScript (`<T extends FieldValues>`)
- **useController** para integración con React Hook Form
- **Error visual** - borde rojo cuando hay error
- **Contador de caracteres** opcional con maxLength
- **Multiline support** con estilos específicos

---

## 3. RadioButton Component Pattern

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

### 💡 Puntos clave:

- **Opciones tipadas** con value/label/selected
- **Controlled component** - parent maneja el state
- **Disabled state** opcional

---

## 🎯 Validación Común

### Reglas de validación típicas:

```tsx
// Campo requerido
rules: {
  required: "Este campo es requerido"
}

// Longitud mínima/máxima
rules: {
  minLength: { value: 3, message: "Mínimo 3 caracteres" },
  maxLength: { value: 50, message: "Máximo 50 caracteres" }
}

// Pattern (email, etc)
rules: {
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: "Email inválido"
  }
}

// Custom validation
rules: {
  validate: (value) => value !== "admin" || "Nombre no permitido"
}
```

---

## 📚 Ver también

- [03-hooks.md](./03-hooks.md#3-async-action-hook-con-loading) - useWaitingApp para submit async
- [04-loading-states.md](./04-loading-states.md) - Loading states durante submit
- [05-layouts.md](./05-layouts.md#1-keyboardavoidingview-pattern) - Layout completo para forms

---

**Nota:** Siempre usa React Hook Form para formularios. Evita manejar state manualmente con useState para inputs.
