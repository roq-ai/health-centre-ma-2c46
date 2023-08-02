import axios from 'axios';
import queryString from 'query-string';
import { ItemTypeInterface, ItemTypeGetQueryInterface } from 'interfaces/item-type';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getItemTypes = async (
  query?: ItemTypeGetQueryInterface,
): Promise<PaginatedInterface<ItemTypeInterface>> => {
  const response = await axios.get('/api/item-types', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createItemType = async (itemType: ItemTypeInterface) => {
  const response = await axios.post('/api/item-types', itemType);
  return response.data;
};

export const updateItemTypeById = async (id: string, itemType: ItemTypeInterface) => {
  const response = await axios.put(`/api/item-types/${id}`, itemType);
  return response.data;
};

export const getItemTypeById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/item-types/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteItemTypeById = async (id: string) => {
  const response = await axios.delete(`/api/item-types/${id}`);
  return response.data;
};
