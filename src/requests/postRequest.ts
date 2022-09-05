import { api } from 'boot/axios';
import { CreateUser } from '../models/post.models'
import { User } from '../models/auth.models'

const createUser = async (data: CreateUser) => {
  return await api.post('/user', data);
};

const updateRecovery = async (data: User) => {
  return await api.post('/update_recovery_password', data);
}

export default {
  createUser,
  updateRecovery,
};
