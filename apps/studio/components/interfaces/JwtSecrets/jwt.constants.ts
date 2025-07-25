import { JwtSecretUpdateError, JwtSecretUpdateProgress } from '@skybase/shared-types/out/events'
import { JWTSigningKey } from 'data/jwt-signing-keys/jwt-signing-keys-query'

export const statusLabels: Record<JWTSigningKey['status'], string> = {
  in_use: 'Current key',
  standby: 'Standby key',
  previously_used: 'Previous key',
  revoked: 'Revoked',
}

export const statusColors: Record<JWTSigningKey['status'], string> = {
  standby: 'bg-surface-300 bg-opacity-100 text-foreground border border-foreground-muted',
  in_use: 'bg-brand-200 bg-opacity-100 text-brand-600 border-brand-500',
  previously_used: 'bg-purple-300 dark:bg-purple-100 text-purple-1200 border-purple-800',
  revoked: 'bg-destructive-200 bg-opacity-100 text-destructive-600 border-destructive-500',
}

export const JWT_SECRET_UPDATE_ERROR_MESSAGES = {
  [JwtSecretUpdateError.APIServicesConfigurationUpdateFailed]:
    'failed to update configuration for API services',
  [JwtSecretUpdateError.APIServicesRestartFailed]: 'failed to restart API services',
  [JwtSecretUpdateError.DatabaseAdminAPIConfigurationUpdateFailed]:
    'failed to update configuration for database admin API',
  [JwtSecretUpdateError.PostgreSQLRestartFailed]: 'failed to restart PostgreSQL service',
  [JwtSecretUpdateError.SkybaseAPIKeyUpdateFailed]: 'failed to update Skybase API key',
  [JwtSecretUpdateError.APIGatewayUpdateFailed]: 'failed to update API Gateway',
}

export const JWT_SECRET_UPDATE_PROGRESS_MESSAGES = {
  [JwtSecretUpdateProgress.RestartedAPIServices]: 'restarted API services',
  [JwtSecretUpdateProgress.RestartedPostgreSQL]: 'restarted PostgreSQL service',
  [JwtSecretUpdateProgress.Started]: 'started updating',
  [JwtSecretUpdateProgress.UpdatedAPIServicesConfiguration]:
    'updated configuration for API services',
  [JwtSecretUpdateProgress.UpdatedDatabaseAdminAPIConfiguration]:
    'updated configuration for database admin API',
  [JwtSecretUpdateProgress.UpdatedAPIGatewayConfiguration]: 'updated configuration for API Gateway',
}
