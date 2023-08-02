import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface PeopleInterface {
  id?: string;
  name: string;
  role: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface PeopleGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  role?: string;
  user_id?: string;
}
