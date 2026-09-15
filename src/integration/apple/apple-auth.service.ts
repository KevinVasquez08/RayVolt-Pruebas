import { Injectable } from '@nestjs/common';

export interface AppleUserPayload {
  providerUserId: string;
  email: string;
  fullName?: string;
}

@Injectable()
export class AppleAuthService {
  /**
   * Verifica el identityToken de Apple y extrae los datos del usuario.
   * TODO: Implementar verificación de JWT firmado por Apple (JWKS).
   */
  async verifyIdentityToken(identityToken: string): Promise<AppleUserPayload> {
    throw new Error('AppleAuthService.verifyIdentityToken no implementado.');
  }
}