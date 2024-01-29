import {AccessToken, AccessTokenDto, Session, SessionDto} from '../model/types'

export function mapSession(dto: SessionDto): Session {
  return {
    access: dto.access,
    refresh: dto.refresh
  }
}

export function mapAccessToken(dto: AccessTokenDto): AccessToken {
  return {
    access: dto.access
  }
}