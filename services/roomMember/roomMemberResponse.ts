import { Room } from "@/models/Room";
import { RoomMember } from "@/models/RoomMember";

export let roomMembersMockResponse: RoomMember[] = [
  // ROOM1: "Votación Familiar" - memberCount: 5 - Familia Alice
  { id: 1, roomCode: "ROOM1", userId: 1 }, // Alice (owner)
  { id: 2, roomCode: "ROOM1", userId: 2 }, // Bob
  { id: 3, roomCode: "ROOM1", userId: 3 }, // Charlie
  { id: 4, roomCode: "ROOM1", userId: 4 }, // Diana
  { id: 5, roomCode: "ROOM1", userId: 5 }, // Ethan

  // WORK2: "Reunión de Trabajo" - memberCount: 12 - Compañeros de trabajo
  { id: 6, roomCode: "WORK2", userId: 2 }, // Bob (owner)
  { id: 7, roomCode: "WORK2", userId: 1 }, // Alice
  { id: 8, roomCode: "WORK2", userId: 6 }, // Fiona
  { id: 9, roomCode: "WORK2", userId: 7 }, // George
  { id: 10, roomCode: "WORK2", userId: 8 }, // Hannah
  { id: 11, roomCode: "WORK2", userId: 9 }, // Ian
  { id: 12, roomCode: "WORK2", userId: 4 }, // Diana
  { id: 13, roomCode: "WORK2", userId: 5 }, // Ethan

  // PARTY: "Fiesta de Cumpleaños" - memberCount: 8 - Amigos de Charlie
  { id: 14, roomCode: "PARTY", userId: 3 }, // Charlie (owner)
  { id: 15, roomCode: "PARTY", userId: 1 }, // Alice
  { id: 16, roomCode: "PARTY", userId: 5 }, // Ethan
  { id: 17, roomCode: "PARTY", userId: 6 }, // Fiona
  { id: 18, roomCode: "PARTY", userId: 8 }, // Hannah
  { id: 19, roomCode: "PARTY", userId: 9 }, // Ian

  // TRIP: "Viaje con Amigos" - memberCount: 4 - Grupo pequeño de viaje
  { id: 20, roomCode: "TRIP", userId: 4 }, // Diana (owner)
  { id: 21, roomCode: "TRIP", userId: 2 }, // Bob
  { id: 22, roomCode: "TRIP", userId: 6 }, // Fiona
  { id: 23, roomCode: "TRIP", userId: 7 }, // George

  // BOOKCLUB: "Club de Lectura" - memberCount: 6 - Lectores
  { id: 24, roomCode: "BOOKCLUB", userId: 5 }, // Ethan (owner)
  { id: 25, roomCode: "BOOKCLUB", userId: 3 }, // Charlie
  { id: 26, roomCode: "BOOKCLUB", userId: 7 }, // George
  { id: 27, roomCode: "BOOKCLUB", userId: 8 }, // Hannah
  { id: 28, roomCode: "BOOKCLUB", userId: 9 }, // Ian

  // GAMENIGHT: "Noche de Juegos" - memberCount: 5 - Gamers
  { id: 29, roomCode: "GAMENIGHT", userId: 6 }, // Fiona (owner)
  { id: 30, roomCode: "GAMENIGHT", userId: 1 }, // Alice
  { id: 31, roomCode: "GAMENIGHT", userId: 3 }, // Charlie
  { id: 32, roomCode: "GAMENIGHT", userId: 4 }, // Diana
  { id: 33, roomCode: "GAMENIGHT", userId: 9 }, // Ian

  // COMMUNITY: "Reunión Comunitaria" - memberCount: 10 - Vecinos
  { id: 34, roomCode: "COMMUNITY", userId: 7 }, // George (owner)
  { id: 35, roomCode: "COMMUNITY", userId: 1 }, // Alice
  { id: 36, roomCode: "COMMUNITY", userId: 2 }, // Bob
  { id: 37, roomCode: "COMMUNITY", userId: 3 }, // Charlie
  { id: 38, roomCode: "COMMUNITY", userId: 4 }, // Diana
  { id: 39, roomCode: "COMMUNITY", userId: 5 }, // Ethan
  { id: 40, roomCode: "COMMUNITY", userId: 6 }, // Fiona
  { id: 41, roomCode: "COMMUNITY", userId: 8 }, // Hannah
  { id: 42, roomCode: "COMMUNITY", userId: 9 }, // Ian

  // STUDY: "Grupo de Estudio" - memberCount: 7 - Estudiantes
  { id: 43, roomCode: "STUDY", userId: 2 }, // Bob (owner)
  { id: 44, roomCode: "STUDY", userId: 1 }, // Alice
  { id: 45, roomCode: "STUDY", userId: 5 }, // Ethan
  { id: 46, roomCode: "STUDY", userId: 8 }, // Helena
  { id: 47, roomCode: "STUDY", userId: 9 }, // Ivan
  { id: 48, roomCode: "STUDY", userId: 10 }, // Julia
  { id: 49, roomCode: "STUDY", userId: 11 }, // Kevin

  // MOVIE: "Noche de Películas" - memberCount: 3 - Amigos de Helena
  { id: 50, roomCode: "MOVIE", userId: 8 }, // Helena (owner)
  { id: 51, roomCode: "MOVIE", userId: 3 }, // Charlie
  { id: 52, roomCode: "MOVIE", userId: 6 }, // Fiona

  // FITNESS: "Rutina de Ejercicios" - memberCount: 6 - Grupo de gimnasio
  { id: 53, roomCode: "FITNESS", userId: 4 }, // Diana (owner)
  { id: 54, roomCode: "FITNESS", userId: 1 }, // Alice
  { id: 55, roomCode: "FITNESS", userId: 7 }, // George
  { id: 56, roomCode: "FITNESS", userId: 9 }, // Ivan
  { id: 57, roomCode: "FITNESS", userId: 10 }, // Julia
  { id: 58, roomCode: "FITNESS", userId: 11 }, // Kevin

  // MUSIC: "Festival de Música" - memberCount: 12 - Organizadores de evento
  { id: 59, roomCode: "MUSIC", userId: 9 }, // Ivan (owner)
  { id: 60, roomCode: "MUSIC", userId: 2 }, // Bob
  { id: 61, roomCode: "MUSIC", userId: 3 }, // Charlie
  { id: 62, roomCode: "MUSIC", userId: 5 }, // Ethan
  { id: 63, roomCode: "MUSIC", userId: 6 }, // Fiona
  { id: 64, roomCode: "MUSIC", userId: 7 }, // George
  { id: 65, roomCode: "MUSIC", userId: 8 }, // Helena
  { id: 66, roomCode: "MUSIC", userId: 10 }, // Julia
  { id: 67, roomCode: "MUSIC", userId: 11 }, // Kevin
  { id: 68, roomCode: "MUSIC", userId: 12 }, // Leo
  { id: 69, roomCode: "MUSIC", userId: 13 }, // Maria
  { id: 70, roomCode: "MUSIC", userId: 14 }, // Nicolas

  // COOKING: "Clase de Cocina" - memberCount: 8 - Cocineros aficionados
  { id: 71, roomCode: "COOKING", userId: 1 }, // Alice (owner)
  { id: 72, roomCode: "COOKING", userId: 3 }, // Charlie
  { id: 73, roomCode: "COOKING", userId: 4 }, // Diana
  { id: 74, roomCode: "COOKING", userId: 8 }, // Helena
  { id: 75, roomCode: "COOKING", userId: 11 }, // Kevin
  { id: 76, roomCode: "COOKING", userId: 12 }, // Leo
  { id: 77, roomCode: "COOKING", userId: 13 }, // Maria
  { id: 78, roomCode: "COOKING", userId: 15 }, // Oscar

  // SPORTS: "Torneo de Fútbol" - memberCount: 16 - Equipos de fútbol
  { id: 79, roomCode: "SPORTS", userId: 10 }, // Julia (owner)
  { id: 80, roomCode: "SPORTS", userId: 1 }, // Alice
  { id: 81, roomCode: "SPORTS", userId: 2 }, // Bob
  { id: 82, roomCode: "SPORTS", userId: 3 }, // Charlie
  { id: 83, roomCode: "SPORTS", userId: 4 }, // Diana
  { id: 84, roomCode: "SPORTS", userId: 5 }, // Ethan
  { id: 85, roomCode: "SPORTS", userId: 6 }, // Fiona
  { id: 86, roomCode: "SPORTS", userId: 7 }, // George
  { id: 87, roomCode: "SPORTS", userId: 9 }, // Ivan
  { id: 88, roomCode: "SPORTS", userId: 11 }, // Kevin
  { id: 89, roomCode: "SPORTS", userId: 12 }, // Leo
  { id: 90, roomCode: "SPORTS", userId: 13 }, // Maria
  { id: 91, roomCode: "SPORTS", userId: 14 }, // Nicolas
  { id: 92, roomCode: "SPORTS", userId: 15 }, // Oscar
  { id: 93, roomCode: "SPORTS", userId: 16 }, // Paula
  { id: 94, roomCode: "SPORTS", userId: 17 }, // Roberto

  // TECH: "Meetup de Tecnología" - memberCount: 15 - Desarrolladores
  { id: 95, roomCode: "TECH", userId: 5 }, // Ethan (owner)
  { id: 96, roomCode: "TECH", userId: 2 }, // Bob
  { id: 97, roomCode: "TECH", userId: 8 }, // Helena
  { id: 98, roomCode: "TECH", userId: 9 }, // Ivan
  { id: 99, roomCode: "TECH", userId: 11 }, // Kevin
  { id: 100, roomCode: "TECH", userId: 12 }, // Leo
  { id: 101, roomCode: "TECH", userId: 13 }, // Maria
  { id: 102, roomCode: "TECH", userId: 14 }, // Nicolas
  { id: 103, roomCode: "TECH", userId: 15 }, // Oscar
  { id: 104, roomCode: "TECH", userId: 16 }, // Paula
  { id: 105, roomCode: "TECH", userId: 17 }, // Roberto
  { id: 106, roomCode: "TECH", userId: 18 }, // Sofia
  { id: 107, roomCode: "TECH", userId: 19 }, // Tomás
  { id: 108, roomCode: "TECH", userId: 20 }, // Valentina
  { id: 109, roomCode: "TECH", userId: 21 }, // Xavier

  // ART: "Taller de Arte" - memberCount: 5 - Artistas
  { id: 110, roomCode: "ART", userId: 11 }, // Kevin (owner)
  { id: 111, roomCode: "ART", userId: 6 }, // Fiona
  { id: 112, roomCode: "ART", userId: 8 }, // Helena
  { id: 113, roomCode: "ART", userId: 13 }, // Maria
  { id: 114, roomCode: "ART", userId: 16 }, // Paula

  // VOLUNTEER: "Voluntariado" - memberCount: 9 - Voluntarios
  { id: 115, roomCode: "VOLUNTEER", userId: 3 }, // Charlie (owner)
  { id: 116, roomCode: "VOLUNTEER", userId: 1 }, // Alice
  { id: 117, roomCode: "VOLUNTEER", userId: 4 }, // Diana
  { id: 118, roomCode: "VOLUNTEER", userId: 7 }, // George
  { id: 119, roomCode: "VOLUNTEER", userId: 10 }, // Julia
  { id: 120, roomCode: "VOLUNTEER", userId: 12 }, // Leo
  { id: 121, roomCode: "VOLUNTEER", userId: 14 }, // Nicolas
  { id: 122, roomCode: "VOLUNTEER", userId: 17 }, // Roberto
  { id: 123, roomCode: "VOLUNTEER", userId: 19 }, // Tomás
];
