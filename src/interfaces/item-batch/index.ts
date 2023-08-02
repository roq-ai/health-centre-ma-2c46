import { ItemInterface } from 'interfaces/item';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ItemBatchInterface {
  id?: string;
  batch_number: string;
  item_id?: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  item?: ItemInterface;
  user?: UserInterface;
  _count?: {};
}

export interface ItemBatchGetQueryInterface extends GetQueryInterface {
  id?: string;
  batch_number?: string;
  item_id?: string;
  user_id?: string;
}
