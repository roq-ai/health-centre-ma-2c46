import axios from 'axios';
import queryString from 'query-string';
import { ItemBatchInterface, ItemBatchGetQueryInterface } from 'interfaces/item-batch';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getItemBatches = async (
  query?: ItemBatchGetQueryInterface,
): Promise<PaginatedInterface<ItemBatchInterface>> => {
  const response = await axios.get('/api/item-batches', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createItemBatch = async (itemBatch: ItemBatchInterface) => {
  const response = await axios.post('/api/item-batches', itemBatch);
  return response.data;
};

export const updateItemBatchById = async (id: string, itemBatch: ItemBatchInterface) => {
  const response = await axios.put(`/api/item-batches/${id}`, itemBatch);
  return response.data;
};

export const getItemBatchById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/item-batches/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteItemBatchById = async (id: string) => {
  const response = await axios.delete(`/api/item-batches/${id}`);
  return response.data;
};
