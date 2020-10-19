import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'DASHBOARD',
    url: '/home/dashboard/dashboard',
    // icon: 'fa fa-th-large'
  },
  {
    divider: true,
  },
  {
    name: 'USER MANAGEMENT',
    url: '/home/user-management',
    // icon: 'fa fa-users',
    children: [
      {
        name: 'Roles',
        url: '/home/user-management/roles',
        // icon: 'fa fa-caret-right'
      },
      {
        name: 'Workgroups',
        url: '/home/user-management/workgroups',
        // icon: 'fa fa-caret-right'
      },
      {
        name: 'Users',
        url: '/home/user-management/users',
        // icon: 'fa fa-caret-right'
      },
      {
        name: 'User Profile',
        url: '/home/user-management/user/profile',
        // icon: 'fa fa-user'
      },
    ],
  },
  {
    divider: true,
  },
  {
    name: 'CUSTOMERS',
    url: '/home/customers',
    // icon: 'fa fa-building',
    children: [
      {
        name: 'View customers',
        url: '/home/customers/customers',
        // icon: 'fa fa-caret-right'
      },
    ],
  },
  {
    divider: true,
  },
  {
    name: 'REPORTS',
    url: '/home/reports',
    // icon: 'fa fa-clipboard',
    children: [
      {
        name: 'Audit Trails',
        url: '/home/reports/audit-logs',
        // icon: 'fa fa-caret-right'
      },
    ],
  },
];
