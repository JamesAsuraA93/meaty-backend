export const jwtConstants = {
  secret: 'asd86y30guurg430rv0u24reotgu93o4u09u9204f23r',
};

export enum AuthStrategy {
  JWT = 'JWT',
}

export enum AuthError {
  InvalidLoginCredentials = 'Invalid login credentials',
  InvalidToken = 'Invalid token',
  LogoutToken = 'Token is Logout',
}
