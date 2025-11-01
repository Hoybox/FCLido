// src/services/types.ts

// ðŸ§© DÃ©finition des types utilisÃ©s dans le projet

export interface Player {
  firstName: string;
  lastName: string;
  nickname?: string;
  position?: string;
  age?: number;
  strongFoot?: string;
}

// âœ… Types ajoutÃ©s pour corriger les erreurs
export enum Page {
  HOME = "home",
  PLAYERS = "players",
  CALENDAR = "calendar",
  RANKING = "ranking",
  PANINI = "panini",
  MEDIA = "media",
  PENALTY = "penalty",
  LOGIN = "login",
  CLUB = "club"
}

export enum EventType {
  MATCH = "match",
  TRAINING = "training",
  EVENT = "event"
}

export enum Role {
  ADMIN = "admin",
  COACH = "coach",
  PLAYER = "player",
  VISITOR = "visitor"
}



