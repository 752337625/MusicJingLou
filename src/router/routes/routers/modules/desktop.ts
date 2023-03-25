import { DESKTOP } from '/@/router/constant';
export default {
  path: 'desktop',
  name: 'desktop',
  redirect: '/layouts/desktop',
  component: DESKTOP,
  children: [
    {
      path: '/',
      redirect: 'desktop',
    },
  ],
};
