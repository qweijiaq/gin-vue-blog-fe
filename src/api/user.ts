import { useAxios, type baseResponse } from ".";

export interface loginEmailType {
  user_name: string;
  password: string;
}

export function loginEmailApi(
  request: loginEmailType
): Promise<baseResponse<string>> {
  return useAxios.post("/api/email_login", request);
}
