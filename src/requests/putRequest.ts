import { api } from 'boot/axios';
import { NewState, StateNotification } from 'src/models/generals.models';

const updateStateDisability = async (data: NewState) => {
  return await api.put<any>('/update_state_disability/', data);
}

const updateStateNotification = async (data: StateNotification) => {
  return await api.put<any>('/update_state_notification/', data);
}

const updateUser = async (data: any) => {
  return await api.put<any>('/update_user/', data);
}

export default {
  updateStateDisability,
  updateStateNotification,
  updateUser
};
