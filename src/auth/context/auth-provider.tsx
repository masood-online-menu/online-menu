'use client';

import { useEffect, useReducer, useCallback, useMemo } from 'react';
// utils
import axios, { endpoints } from '@/utils/axios';
//
import { AuthContext } from './auth-context';
import { setSession } from './utils';
import { ActionMapType, AuthStateType, AuthUserType } from '../types';
import Cookie from 'js-cookie';
import { useRouter } from 'next/navigation';
import { paths } from '@/routes/paths';
import { useDispatch } from 'react-redux';
import { setRestaurant } from '@/redux/slices/restaurant';

// ----------------------------------------------------------------------

// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// ----------------------------------------------------------------------

enum Types {
  INITIAL = 'INITIAL',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

type Payload = {
  [Types.INITIAL]: {
    user: AuthUserType;
  };
  [Types.LOGIN]: {
    user: AuthUserType;
  };
  [Types.LOGOUT]: undefined;
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

// ----------------------------------------------------------------------

const initialState: AuthStateType = {
  user: null,
  loading: true,
};

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === Types.INITIAL) {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGIN) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      user: null,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

const STORAGE_KEY = 'token';

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const dispatchApp = useDispatch();

  const router = useRouter();
  const initialize = useCallback(async () => {
    try {
      const accessToken = Cookie.get(STORAGE_KEY);

      if (accessToken) {
        setSession(accessToken);

        const response = await axios.get(`/auth/getUser/${accessToken}`);

        dispatchApp(setRestaurant(response.data.restaurant));
        dispatch({
          type: Types.INITIAL,
          payload: {
            user: response.data,
          },
        });
      } else {
        router.push(paths.auth);
        dispatch({
          type: Types.INITIAL,
          payload: {
            user: null,
          },
        });
      }
    } catch (error) {
      router.push(paths.auth);
      console.error(error);
      dispatch({
        type: Types.INITIAL,
        payload: {
          user: null,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (username: string, password: string) => {
    const data = {
      username,
      password,
    };

    const response = await axios.post(endpoints.auth, data);

    const { id, user } = response.data;

    setSession(id);
    Cookie.set('token', id);

    dispatch({
      type: Types.LOGIN,
      payload: {
        user: response.data,
      },
    });
  }, []);

  // LOGOUT
  const logout = useCallback(async () => {
    setSession(null);
    Cookie.remove('token');
    router.push(paths.auth);
    dispatch({
      type: Types.LOGOUT,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      method: 'jwt',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      //
      login,
      logout,
    }),
    [login, logout, state.user, status]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}
