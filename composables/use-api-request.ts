export const useApiRequest = async (
  url: string,
  options?: any,
): Promise<any> => {
  try {
    const runtimeConfig = useRuntimeConfig();
    const accessToken = useCookie('accessToken')?.value || null;
    const baseURL = runtimeConfig.privateApiBaseUrl || runtimeConfig.public.publicApiBaseUrl;
    return await $fetch(url, {
      baseURL,
      ...options,
      onRequest({ options }: { options: any }) {
        if (accessToken) {
          options.headers = {
            authorization: `Bearer ${accessToken}`,
            ...options.headers,
          };
        }
      },
    });
  } catch (error) {
    throw error;
  }
}