const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};

export const paths = {
  auth: `${ROOTS.AUTH}`,
  dashboard: `${ROOTS.DASHBOARD}`,
  products: {
    root: `${ROOTS.DASHBOARD}/products`,
    new: `${ROOTS.DASHBOARD}/products/new`,
    edit: (id: number) => `${ROOTS.DASHBOARD}/products/${id}/edit`,
  },
  categories: {
    root: `${ROOTS.DASHBOARD}/categories`,
    new: `${ROOTS.DASHBOARD}/categories/new`,
    edit: (id: number) => `${ROOTS.DASHBOARD}/categories/${id}/edit`,
  },
  splash: '/',
  information: '/information',
  menu: {
    root: (cat: string | null) => `/menu?cat=${cat}`,
    product: (id: number) => `/menu/product/${id}`,
  },
};
