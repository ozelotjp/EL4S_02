export type IHasId = {
  id: string
}

/**
 * /clubs/{clubId}
 */
export type IClub = {
  name: string
  description: string
}

/**
 * /clubs/{clubId}/events/{eventId}
 * /events/{eventId}
 */
export type IClubEvent = {
  title: string
  date: firebase.firestore.Timestamp
  location: string
  description: string
}

/**
 * /users/{userId}
 */
export type IUser = {
  name: string
  class: string
}
