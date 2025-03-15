import type {SessionUser} from "./index";

export type Session = {
  user: SessionUser,
  accessToken: string
}