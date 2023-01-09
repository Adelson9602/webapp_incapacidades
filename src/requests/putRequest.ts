import { api } from 'boot/axios';
import { NewState } from 'src/models/generals.models';

const updateStateDisability = async (data: NewState) => {
  return await api.put<any>('/update_state_disability/', data);
}

export default {
  updateStateDisability,
};
