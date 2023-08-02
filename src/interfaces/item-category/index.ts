import { ItemInterface } from 'interfaces/item';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ItemCategoryInterface {
  id?: string;
  category: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;
  item?: ItemInterface[];
  user?: UserInterface;
  _count?: {
    item?: number;
  };
}

export interface ItemCategoryGetQueryInterface extends GetQueryInterface {
  id?: string;
  category?: string;
  user_id?: string;
}
