import { api } from 'boot/axios';
import { UserData, Rols } from '../models/generals.models'
import { User } from '../models/auth.models'

const createUser = async (data: UserData) => {
  return await api.post('/user', data);
};

const updateRecovery = async (data: User) => {
  return await api.post('/update_recovery_password', data);
}

const createRol = async (data: Rols) => {
  return await api.post('/rol', data);
}

export default {
  createUser,
  updateRecovery,
  createRol
};
