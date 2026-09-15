import { Injectable } from '@nestjs/common';

export interface GoogleUserPayload {
  providerUserId: string;
  email: string;
  fullName: string;
}

@Injectable()
export class GoogleAuthService {
  /**
   * Verifica el ID Token de Google y extrae los datos del usuario.
   * TODO: Implementar verificación con 'google-auth-library'.
   */
  async verifyIdToken(idToken: string): Promise<GoogleUserPayload> {
    throw new Error('GoogleAuthService.verifyIdToken no implementado.');
  }
}