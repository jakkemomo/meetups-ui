import type { SessionDto } from '../api/types'
import type { Session } from '../model/types'

export function mapSession(dto: SessionDto): Session {
  return {
    access: dto.access,
    refresh: dto.refresh
  }
}
