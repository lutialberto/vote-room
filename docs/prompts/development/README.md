# Vote-Room Development Patterns

Guías específicas de desarrollo organizadas por tema.

## 📚 Índice de Guías

### Componentes y UI

- **[01-components.md](./01-components.md)** - Componentes base (ButtonApp, CardApp, ThemedText)
- **[05-layouts.md](./05-layouts.md)** - Layouts y patrones UI (KeyboardAvoidingView, FlatList, Modal)
- **[06-data-presentation.md](./06-data-presentation.md)** - Presentación de datos (Cards, listas, metadata)

### Formularios y Validación

- **[02-forms.md](./02-forms.md)** - Formularios con React Hook Form, InputTextApp, RadioButton, validación

### Data Fetching y Estado

- **[03-hooks.md](./03-hooks.md)** - Hooks personalizados (useItemFetcherApp, useListFetcherApp, useWaitingApp, Zustand)
- **[04-loading-states.md](./04-loading-states.md)** - Estados de carga, errores, y vacío

### Convenciones

- **[07-best-practices.md](./07-best-practices.md)** - DO's y DON'Ts del proyecto

---

## 🎯 Guía Rápida por Caso de Uso

| Necesito...                      | Ver archivo                                                            |
| -------------------------------- | ---------------------------------------------------------------------- |
| **Crear un formulario**          | [02-forms.md](./02-forms.md)                                           |
| **Hacer fetch de datos**         | [03-hooks.md](./03-hooks.md)                                           |
| **Mostrar una lista**            | [05-layouts.md](./05-layouts.md#2-flatlist-pattern-con-refreshcontrol) |
| **Crear un componente base**     | [01-components.md](./01-components.md)                                 |
| **Manejar loading/error states** | [04-loading-states.md](./04-loading-states.md)                         |
| **Mostrar datos en cards**       | [06-data-presentation.md](./06-data-presentation.md)                   |
| **Modal o popup**                | [05-layouts.md](./05-layouts.md#3-modal-pattern)                       |

---

## 📖 Documentación Relacionada

- [vote-room-architecture.prompt.md](../vote-room-architecture.prompt.md) - Arquitectura general del proyecto
- [../../README.md](../../README.md) - Documentación principal

---

**Tip:** Todos estos archivos están diseñados para ser usados como contexto por AI assistants y desarrolladores. Cada archivo es autocontenido pero incluye links a contenido relacionado.
