export {};

declare global {
  interface User {
    id: number;
    name: string;
    birthdate?: string;
    avatarUrl?: string;
  }
}
