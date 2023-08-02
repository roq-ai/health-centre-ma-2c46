import { ItemInterface } from 'interfaces/item';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface TransactionInterface {
  id?: string;
  transaction_type: string;
  item_id?: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  item?: ItemInterface;
  user?: UserInterface;
  _count?: {};
}

export interface TransactionGetQueryInterface extends GetQueryInterface {
  id?: string;
  transaction_type?: string;
  item_id?: string;
  user_id?: string;
}
