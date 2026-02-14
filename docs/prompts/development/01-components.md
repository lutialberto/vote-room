# Componentes Base - Vote-Room

Patrones de componentes reutilizables con TypeScript, theming y props tipadas.

---

## 🎨 Índice

1. [Componente Base con Props Tipadas](#1-componente-base-con-props-tipadas)
2. [Card Wrapper Pattern](#2-card-wrapper-pattern)
3. [Themed Text Pattern](#3-themed-text-pattern)

---

## 1. Componente Base con Props Tipadas

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

### 💡 Puntos clave:

- **Props tipadas** extendiendo componente nativo
- **Valores por defecto** en destructuring
- **Theming con hook** useThemeColor()
- **getStyles pattern** para estilos dinámicos

---

## 2. Card Wrapper Pattern

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

### 💡 Puntos clave:

- **Wrapper reutilizable** para contenido
- **Tipos de card** con estilos diferentes
- **Shadow multiplataforma** (shadow + elevation)

---

## 3. Themed Text Pattern

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

### 💡 Puntos clave:

- **Variants tipadas** con union types
- **Color dinámico** desde theme
- **Estilos predefinidos** consistentes

---

## 📚 Ver también

- [02-forms.md](./02-forms.md) - Componentes de formulario
- [06-data-presentation.md](./06-data-presentation.md) - Uso de cards para datos
- [07-best-practices.md](./07-best-practices.md) - Mejores prácticas

---

**Nota:** Todos los componentes deben seguir este patrón de theming y tipado para mantener consistencia en el proyecto.
