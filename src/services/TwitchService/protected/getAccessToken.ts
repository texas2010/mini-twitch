export interface AccessTokenSuccessResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export interface AccessTokenRequest {
  client_id: string;
  client_secret: string;
  grant_type: string;
}
