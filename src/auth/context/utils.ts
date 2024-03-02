
// ----------------------------------------------------------------------

import axios from 'axios';

export const setSession = (accessToken: string | null) => {
  if (accessToken) {
    sessionStorage.setItem('accessToken', accessToken);

    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

  } else {
    sessionStorage.removeItem('accessToken');

    delete axios.defaults.headers.common.Authorization;
  }
};
