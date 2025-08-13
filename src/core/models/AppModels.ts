import { JwtPayload } from "jwt-decode";

export interface UserProfile {
  userId: string;
  userPrincipalName: string;
  displayName: string;
}

export interface Token extends JwtPayload{
  oid: string;
  preferred_username: string;
  name: string;
}
