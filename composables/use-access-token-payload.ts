export const useAccessTokenPayload = (accessToken: string) => {
  try {
    return JSON.parse(Buffer.from(accessToken?.split?.('.')?.[1], 'base64').toString());
  } catch {
    return null;
  }
}
