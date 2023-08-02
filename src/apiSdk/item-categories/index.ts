import axios from 'axios';
import queryString from 'query-string';
import { ItemCategoryInterface, ItemCategoryGetQueryInterface } from 'interfaces/item-category';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getItemCategories = async (
  query?: ItemCategoryGetQueryInterface,
): Promise<PaginatedInterface<ItemCategoryInterface>> => {
  const response = await axios.get('/api/item-categories', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createItemCategory = async (itemCategory: ItemCategoryInterface) => {
  const response = await axios.post('/api/item-categories', itemCategory);
  return response.data;
};

export const updateItemCategoryById = async (id: string, itemCategory: ItemCategoryInterface) => {
  const response = await axios.put(`/api/item-categories/${id}`, itemCategory);
  return response.data;
};

export const getItemCategoryById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/item-categories/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteItemCategoryById = async (id: string) => {
  const response = await axios.delete(`/api/item-categories/${id}`);
  return response.data;
};
