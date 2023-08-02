import { ItemInterface } from 'interfaces/item';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ItemTypeInterface {
  id?: string;
  type: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;
  item?: ItemInterface[];
  user?: UserInterface;
  _count?: {
    item?: number;
  };
}

export interface ItemTypeGetQueryInterface extends GetQueryInterface {
  id?: string;
  type?: string;
  user_id?: string;
}
