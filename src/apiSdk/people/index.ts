import axios from 'axios';
import queryString from 'query-string';
import { PeopleInterface, PeopleGetQueryInterface } from 'interfaces/people';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getPeople = async (query?: PeopleGetQueryInterface): Promise<PaginatedInterface<PeopleInterface>> => {
  const response = await axios.get('/api/people', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createPeople = async (people: PeopleInterface) => {
  const response = await axios.post('/api/people', people);
  return response.data;
};

export const updatePeopleById = async (id: string, people: PeopleInterface) => {
  const response = await axios.put(`/api/people/${id}`, people);
  return response.data;
};

export const getPeopleById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/people/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deletePeopleById = async (id: string) => {
  const response = await axios.delete(`/api/people/${id}`);
  return response.data;
};
