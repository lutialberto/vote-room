export const USER_CREATION_STEPS: {
  id: string;
  titleEmoji: string;
  title: string;
  descriptions: string[];
}[] = [
  {
    id: "welcome",
    titleEmoji: "🎉",
    title: "Crea tu cuenta",
    descriptions: [
      "Genera un usuario en segundos escribiendo únicamente un nombre de usuario.",
      "Cuando la cuenta se genere se te brindará un id de usuario único.",
      "Ya estarás listo para acceder a las funcionalidades básicas de la plataforma.",
    ],
  },
  {
    id: "email",
    titleEmoji: "📧",
    title: "Correo Electrónico",
    descriptions: [
      "Agrega un correo electrónico a tu cuenta para mejorar la seguridad y recuperación de la misma.",
      "Agregando un correo electrónico accederás a funcionalidades adicionales.",
      "También podrás ingresar a tu cuenta desde diferentes dispositivos.",
    ],
  },
  {
    id: "kyc",
    titleEmoji: "✅",
    title: "Verificación KYC",
    descriptions: [
      "Realiza el proceso de verificación KYC para aumentar la confianza en tus interacciones dentro de la plataforma.",
      "Este tipo de verificación es requerido para acceder a funcionalidades avanzadas y a votaciones con mayor nivel de seriedad y profesionalismo.",
    ],
  },
];
