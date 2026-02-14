# Mejores Prácticas - Vote-Room

Reglas y convenciones de desarrollo del proyecto.

---

## ✅ DO's de Desarrollo

### TypeScript

- ✅ **Usar TypeScript estricto** para todos los componentes
- ✅ **Tipar todas las props** con interfaces o types
- ✅ **Usar union types** para variants (`"primary" | "secondary"`)
- ✅ **Generic types** en hooks reutilizables (`<T extends FieldValues>`)

### Hooks y Estado

- ✅ **Hooks personalizados** para lógica reutilizable
- ✅ **useItemFetcherApp / useListFetcherApp** para data fetching
- ✅ **useWaitingApp** para acciones async (create, update, delete)
- ✅ **Separar lógica de presentación** - custom hooks vs components

### UI y Layout

- ✅ **Loading/Error/Empty states** en todos los data fetchers
- ✅ **KeyboardAvoidingView + ScrollView** para formularios
- ✅ **FlatList** para listas (no map sobre arrays largos)
- ✅ **Theming consistente** con `useThemeColor()`
- ✅ **getStyles pattern** para estilos dinámicos con theme

### Formularios

- ✅ **React Hook Form** para gestión de forms
- ✅ **Validación con rules** tipadas y mensajes claros
- ✅ **InputTextApp** para inputs consistentes
- ✅ **handleSubmit wrapper** para validación automática

### Código

- ✅ **Props destructuring** con valores por defecto
- ✅ **Early returns** para loading/error states
- ✅ **numberOfLines** para texto que puede ser largo
- ✅ **contentContainerStyle** con gap para espaciado

---

## ❌ DON'Ts de Desarrollo

### TypeScript

- ❌ **No usar `any`** - tipar correctamente siempre
- ❌ **No usar type assertions** innecesarios (`as`)
- ❌ **No ignorar TypeScript errors** con `@ts-ignore`

### Hooks y Estado

- ❌ **No repetir lógica de fetch** - crear hooks reutilizables
- ❌ **No ignorar error states** - siempre manejar errores
- ❌ **No lógica de negocio en componentes** - mover a hooks/servicios
- ❌ **No usar useState para forms** - usar React Hook Form

### UI y Estilos

- ❌ **No hardcodear colores** - usar `colors.primary`, etc
- ❌ **No hardcodear valores** - usar constants y theming
- ❌ **No inline styles complejos** - usar getStyles pattern
- ❌ **No componentes gigantes** - dividir en sub-componentes
- ❌ **No olvidar accessibility** - labels, hints, numberOfLines

### Performance

- ❌ **No map() en arrays largos** - usar FlatList
- ❌ **No inline functions en renderItem** - memoizar o extraer

---

## 🎯 Checklist de Code Review

Antes de commitear, verificar:

- [ ] ¿Todos los types están correctos? (no `any`)
- [ ] ¿Los loading/error states están manejados?
- [ ] ¿Se usa el hook correcto? (useItemFetcherApp vs useWaitingApp)
- [ ] ¿Los estilos usan theming? (`useThemeColor()`)
- [ ] ¿Los formularios usan React Hook Form?
- [ ] ¿Las listas usan FlatList con keyExtractor?
- [ ] ¿Los componentes están divididos lógicamente?
- [ ] ¿Se siguen los patterns del proyecto?

---

## 📐 Convenciones de Naming

```tsx
// Components: PascalCase
export function ButtonApp() {}
export default function MyScreen() {}

// Hooks: camelCase con "use" prefix
export function useItemFetcherApp() {}
export const useBaseVoting = create() {}

// Types/Interfaces: PascalCase con suffix
export type ButtonAppProps = {}
export interface FilterModalProps {}

// Constants: UPPER_CASE
export const MAX_LENGTH = 256;
export const DEFAULT_TIMEOUT = 5000;

// Files:
// - Components: PascalCase.tsx (ButtonApp.tsx)
// - Screens: lowercase folders (rooms/index.tsx)
// - Hooks: camelCase.ts (useItemFetcherApp.ts)
```

---

## 🔍 Debugging Tips

### Verificar datos recibidos:

```tsx
const { data, isLoading, error } = useItemFetcherApp(() => fetchData(), []);

// Log para debug
console.log("Data:", data);
console.log("Loading:", isLoading);
console.log("Error:", error);
```

### Verificar re-renders:

```tsx
useEffect(() => {
  console.log("Component rendered");
});
```

### Verificar deps de hooks:

```tsx
// ⚠️ Si el fetch se ejecuta muchas veces, revisar deps
useItemFetcherApp(() => fetchData(userId), [userId]); // ✅ Correcto
useItemFetcherApp(() => fetchData(userId), []); // ❌ userId cambió pero no refetch
```

---

## 📚 Ver también

- [01-components.md](./01-components.md) - Componentes base
- [02-forms.md](./02-forms.md) - Patrones de forms
- [03-hooks.md](./03-hooks.md) - Hooks reutilizables
- [04-loading-states.md](./04-loading-states.md) - Manejo de estados
- [05-layouts.md](./05-layouts.md) - Layouts y UI

---

**Importante:** Estas prácticas aseguran consistencia, mantenibilidad, y performance. Seguirlas evita bugs comunes y mejora la colaboración en equipo.
