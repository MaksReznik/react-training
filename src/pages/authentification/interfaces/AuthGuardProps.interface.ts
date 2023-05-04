import { Roles } from '../enums/Roles.enum';

export interface AuthGuardProps {
  canBeAccessedBy: Roles[];
}
