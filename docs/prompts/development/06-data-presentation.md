# Presentación de Datos - Vote-Room

Patrones para mostrar datos en cards, listas, y badges.

---

## 📊 Índice

1. [Card List Item Pattern](#1-card-list-item-pattern)

---

## 1. Card List Item Pattern

Para **items de lista** - card consistente y touchable con metadata.

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

const getStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    cardContent: {
      gap: 12,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
    titleSection: {
      flex: 1,
      gap: 4,
    },
    statusSection: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    description: {
      lineHeight: 20,
    },
    footer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 4,
    },
    metadata: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
  });
```

### 💡 Puntos clave:

- **CardApp** con shadow para elevación
- **TouchableOpacity** para navegación
- **numberOfLines** para truncar texto largo
- **Layout con flex** - header, content, footer
- **Icons + text** para metadata visual
- **formatRelativeTime** para fechas ("hace 2 horas")

---

## 🏷️ Status Badge Pattern

Para **estados visuales** (activo, finalizado, pendiente, etc).

```tsx
// ✅ Patrón: Badge de status
type StatusType = "active" | "finished" | "pending";

interface StatusBadgeProps {
  status: StatusType;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const colors = useThemeColor();
  const styles = getStyles(colors);

  const config = {
    active: { label: "Activo", color: colors.green },
    finished: { label: "Finalizado", color: colors.gray },
    pending: { label: "Pendiente", color: colors.orange },
  };

  const { label, color } = config[status];

  return (
    <View style={[styles.badge, { backgroundColor: color + "20" }]}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <ThemedText style={[styles.label, { color }]}>{label}</ThemedText>
    </View>
  );
}

const getStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    badge: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      gap: 4,
    },
    dot: {
      width: 6,
      height: 6,
      borderRadius: 3,
    },
    label: {
      fontSize: 12,
      fontWeight: "600",
    },
  });
```

### 💡 Puntos clave:

- **Config object** para colores/labels centralizados
- **Color + "20"** para background transparente
- **Dot + label** patrón visual común
- **Tipado estricto** con union types

---

## 📅 Date Formatting Utility

```tsx
// ✅ Utility: Formateo de fechas relativas
export function formatRelativeTime(date: string | Date): string {
  const now = new Date();
  const past = new Date(date);
  const diffMs = now.getTime() - past.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "Ahora";
  if (diffMins < 60) return `Hace ${diffMins}m`;
  if (diffHours < 24) return `Hace ${diffHours}h`;
  if (diffDays < 7) return `Hace ${diffDays}d`;

  return past.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
  });
}
```

---

## 🎯 Uso en FlatList

```tsx
export default function ItemListScreen() {
  const { data, isLoading, error, refetch } = useListFetcherApp(
    () => fetchItems(),
    []
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <ItemCard item={item} />}
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      contentContainerStyle={{ padding: 16 }}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refetch} />
      }
    />
  );
}
```

---

## 📚 Ver también

- [01-components.md](./01-components.md) - CardApp base component
- [05-layouts.md](./05-layouts.md#2-flatlist-pattern-con-refreshcontrol) - FlatList setup
- [03-hooks.md](./03-hooks.md#2-data-fetching-hook-para-listas) - useListFetcherApp

---

**Nota:** Mantén el diseño de cards consistente en todo el proyecto. Usa este template como base y adapta el contenido específico de cada dominio.
