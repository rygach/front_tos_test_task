import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import { serviceApi } from '../../api/generalApi';

export const checkUser = createAsyncThunk('auth/getProfile', async () => {
  const token = Cookies.get('token');
  if (token) {
    const response = await serviceApi.auth.check(token);
    return { response };
  }
});

export const userAuth = createAsyncThunk(
  'auth/userRegistration',
  async (params: { email: string; password: string }) => {
    const response = await `users?email=${params.email}&password=${params.password}`;
    return { response, params };
  },
);

export type LoginFormType = {
  email: string;
  password: string;
  token?: string;
};

type ErrorType = string | boolean | null | any;

// export type AuthState = {
//   profile: LoginFormType;
//   isFetching: boolean;
//   requestErrors: ErrorType;
// };

type UserType = {
  email: string;
  password: string;
  token?: string;
};

export interface AuthState {
  auth: boolean;
  loading: boolean;
  user: UserType;
}

// export const loginThunk = createAsyncThunk('auth/login', async (form: LoginFormType) => {
//   try {
//     dispatch(setFetching(true));
//     const result = await serviceApi.auth.login(form);
//     if (result) {
//       // console.log(result.data);
//       return result.data;
//     }
//   } catch (error) {
//     dispatch(setError(error));
//     return null;
//   } finally {
//     dispatch(setFetching(false));
//   }
// });

const initialProfile: LoginFormType = {
  email: '',
  password: '',
  token: '',
};

const initialState: AuthState = {
  user: { email: '', password: '', token: '' },
  auth: false,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogout(state: AuthState, action: PayloadAction) {
      state.auth = false;
      state.user = { email: '', password: '', token: '' };
      Cookies.remove('token');
    },

    // setFetching(state, { payload }: { payload: boolean }) {
    //   state.isFetching = payload;
    // },
    // setError(state, { payload }: { payload: ErrorType }) {
    //   state.requestErrors = payload.response.data;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(checkUser.pending, (state: AuthState, action: PayloadAction) => {
      state.loading = true;
    });
    builder.addCase(checkUser.fulfilled, () =>
      // state: AuthState,
      // { payload }: PayloadAction<{ response: { data: [contacts] | [] }; params: UserType }>,
      {
        // state.loading = false;
        // if (payload.response.data?.length == 0) {
        //   payload.params('/auth');
        // } else {
        //   state.auth = true;
        //   state.user = payload.response.data[0];
        // }
      },
    );
    builder.addCase(checkUser.rejected, (state: AuthState) => {
      state.loading = false;
    });

    builder.addCase(userAuth.pending, (state: AuthState, action: PayloadAction) => {});
    builder.addCase(userAuth.fulfilled, () =>
      // state: AuthState,
      // {
      //   payload,
      // }: PayloadAction<{
      //   response: { data: [contacts] | [] };
      //   params: { email: string; password: string; nav: CallableFunction };
      // }>,
      {
        // if (payload.response.data.length == 0) {
        //   alert('Введены не верные данные');
        // } else {
        //   Cookies.set('token', `${payload.response.data[0].token}`, { path: '/', expires: 60 });
        //   serviceApi.defaults.headers = {
        //     Authorization: `Bearer ${payload.response.data[0].token}`,
        //   } as CommonHeaderProperties;
        //   state.auth = true;
        //   payload.params.nav('/');
        // }
      },
    );
    builder.addCase(userAuth.rejected, (state: AuthState) => {});
  },
});

export const { setLogout } = authSlice.actions;

export default authSlice.reducer;
