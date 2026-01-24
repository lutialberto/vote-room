export const ONBOARDING_STEPS: {
  id: string;
  titleEmoji: string;
  title: string;
  descriptions: string[];
}[] = [
  {
    id: "welcome",
    titleEmoji: "🎉",
    title: "¡Bienvenido!",
    descriptions: [
      "Vote Room te ayuda a tomar decisiones grupales de manera democrática y organizada.",
      "Tambien puedes usar Vote Room para encuestas, sondeos y otras formas de recopilación de opiniones.",
    ],
  },
  {
    id: "rooms",
    titleEmoji: "🏠",
    title: "Salas de votación",
    descriptions: [
      "Las salas son un espacio común para gestionar votaciones en grupo.",
      "Pueden ser públicas, accesibles para todos, o privadas, con acceso restringido.",
      "Crea tu propia sala y compartela con amigos, familiares o colegas.",
      "Explora salas públicas creadas por la comunidad.",
    ],
  },
  {
    id: "voting",
    titleEmoji: "🗳️",
    title: "Votaciones",
    descriptions: [
      "Crea votaciones simples, publícalas y compartelas en segundos.",
      "Si además eres propietario de una sala, puedes asignar la votación a una sala y notificar a los miembros automáticamente.",
      "Define quién puede votar, establece fechas límite y más con la configuración avanzada.",
    ],
  },
  {
    id: "events",
    titleEmoji: "📅",
    title: "Eventos",
    descriptions: [
      "Genera eventos compuestos de votaciones especiales",
      "Recibe recordatorios automáticos para ti y los miembros del evento antes de que comience una votación programada.",
      "Mantén a todos informados sobre las próximas votaciones y eventos importantes.",
    ],
  },
  {
    id: "invite-users",
    titleEmoji: "👥",
    title: "Invitar Usuarios",
    descriptions: [
      "Comparte códigos de sala o enlaces directos tanto para usuarios nuevos como para los ya existentes.",
      "Gestiona las invitaciones y controla quién puede participar en tus salas y votaciones.",
      "Recibe notificaciones cuando te inviten a nuevas salas.",
    ],
  },
  {
    id: "results",
    titleEmoji: "📊",
    title: "Ver Resultados",
    descriptions: [
      "Ve resultados en tiempo real luego de realizar tu voto o al finalizar la votación.",
      "Exporta resultados en varios formatos para compartir y analizar fácilmente.",
    ],
  },
];
