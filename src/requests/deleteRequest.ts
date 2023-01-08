import { api } from 'boot/axios';

const deleteDisability = async (numeroIncapacidad: number) => {
  return await api.delete<any>(`/delete_disability/${numeroIncapacidad}`);
}

export default {
  deleteDisability,
};
