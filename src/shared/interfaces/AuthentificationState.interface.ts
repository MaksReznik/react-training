import { Roles } from '../../pages/authentification/enums/Roles.enum';

export interface AuthentificationState {
  username: string;
  password: string;
  role: Roles;
}
