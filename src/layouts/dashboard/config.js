
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';

import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
import ListBulletIcon from '@heroicons/react/24/solid/ListBulletIcon';
import PhotoIcon from '@heroicons/react/24/solid/PhotoIcon';
import { SvgIcon } from '@mui/material';

export const items = [
 
  {
    title: 'ImagesList',
    path: '/',
    icon: (
      <SvgIcon fontSize="small">
        <PhotoIcon />
      </SvgIcon>
    )
  },
  
  {
    title: 'EnquiryList',
    path: '/EnquiryList',
    icon: (
      <SvgIcon fontSize="small">
        <ListBulletIcon />
      </SvgIcon>
    )
  },
  
  // {
  //   title: 'Login',
  //   path: '/auth/login',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <LockClosedIcon />
  //     </SvgIcon>
  //   )
  // },
  // {
  //   title: 'Register',
  //   path: '/auth/register',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <UserPlusIcon />
  //     </SvgIcon>
  //   )
  // },
 
];
