import type { Document } from "./document";

export interface User extends Document {
  displayName: string;
  image: string;
  email: string;
  googleId: string;
}
