import axios from 'axios';
import Cookies from 'js-cookie';
import { LoginFormType } from '../redux/slices/authSlice';
import { ContactType } from '../redux/slices/contactsSlice';

const axiosSource = () => {
  return axios.create({
    baseURL: 'http://localhost:5000/',
    // с данным заголовком выводило ошибку CORS
    // headers: {
    //   Authorization: Cookies.get('token') ? 'Bearer ' + Cookies.get('token') : ('' as string),
    // },
  });
};

export const serviceApi = {
  auth: {
    check: (token: string) => {
      axiosSource().get(`/users?token=${token}`);

      // axiosSource()
      //   .post<LoginFormType>(`/users`, form, {
      //     headers: {
      //       Authorization: `Basiz ${token}`,
      //     },
      //   })
      //   .then((res) => {
      //     console.log(res.data);
      //   });
      // console.log(form);
    },
    login: () => {},
  },
  contacts: {
    getContacts: () => axiosSource().get('/auth/cont'),
    create: (params: any) => axiosSource().post(`/auth/addcont`, params),
    update: (params: ContactType) => axiosSource().put(`/contacts/${params._id}`, params),
    remove: (_id: string) => axiosSource().delete(`/auth/cont/${_id}`),
  },
};

export default axiosSource;
