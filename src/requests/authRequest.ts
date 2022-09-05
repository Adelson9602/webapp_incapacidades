import { api } from 'boot/axios';
import { User, Cliente, Menu } from '../models/auth.models'

const postLogin = async (data: User) => {
  return await api.post<Cliente[]>('/login', data);
}

const getPermissions = async (idRol: number, user: number) => {
  return await api.get<Menu[]>(`/get_user_permissions/${idRol}/${user}`);
}

export default {
  postLogin,
  getPermissions
};
