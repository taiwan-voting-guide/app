export { }

declare global {
  interface User {
    id: number
    name: string
    birthdate?: string
    avatarUrl?: string
  }

  interface PoliticiansResult {
    politicians: Array<{ name: string; birthdate: string; avatarUrl: string; sex: string }>
  }
}
