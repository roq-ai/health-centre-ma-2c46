import { ItemBatchInterface } from 'interfaces/item-batch';
import { TransactionInterface } from 'interfaces/transaction';
import { ItemTypeInterface } from 'interfaces/item-type';
import { ItemCategoryInterface } from 'interfaces/item-category';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ItemInterface {
  id?: string;
  name: string;
  type_id?: string;
  category_id?: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;
  item_batch?: ItemBatchInterface[];
  transaction?: TransactionInterface[];
  item_type?: ItemTypeInterface;
  item_category?: ItemCategoryInterface;
  user?: UserInterface;
  _count?: {
    item_batch?: number;
    transaction?: number;
  };
}

export interface ItemGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  type_id?: string;
  category_id?: string;
  user_id?: string;
}
