import { api } from 'boot/axios';
import { User } from '../models/auth.model'

const createUser = async (data: User) => {
  return await api.get('/select_modulos_frontend');
};

const updateRecovery = async (data: User) => {
  return await api.post('/update_recovery_password', data);
}

export default {
  createUser,
  updateRecovery,
};
