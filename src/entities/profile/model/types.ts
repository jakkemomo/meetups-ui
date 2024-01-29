/**
 * ✅ DX Best Practice
 * Use branded type to entity id to
 * don't to be confused with other identifiers
 */
export type ProfileId = Brand<Id, 'ProfileId'>

export type ProfileDetails = {
  id: ProfileId
  username: string
  email: string
  firstName?: string
  lastName?: string
  image: Url,
  isEmailVerified: boolean,
}
