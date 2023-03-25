import { TYAY } from '/@/router/constant';
export default {
  path: 'tray',
  name: 'tray',
  redirect: '/layouts/tray',
  component: TYAY,
  meta: {},
  props: false,
  children: [
    {
      path: '/',
      redirect: 'tray',
    },
  ],
};
