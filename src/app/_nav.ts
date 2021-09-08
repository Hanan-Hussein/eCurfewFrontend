import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  // {
  //   name: 'DASHBOARD',
  //   url: '/home/dashboard/dashboard',
  //   // icon: 'fa fa-th-large'
  // },
  // {
  //   divider: true,
  // },
  {
    name: 'MASTER DATA',
    url: '/home/master-data',
    // icon: 'fa fa-users',
    children: [
      {
        name: 'Police Station',
        url: '/home/master-data/police-station',
        // icon: 'fa fa-caret-right'
      },
      {
        name: 'Rank',
        url: '/home/master-data/rank',
        // icon: 'fa fa-caret-right'
      },
      {
        name: 'Category',
        url: '/home/master-data/category',
        // icon: 'fa fa-caret-right'
      },
      // {
      //   name: 'Customer Status',
      //   url: '/home/master-data/customer-status',
      //   // icon: 'fa fa-user'
      // },
    ],
  },
  {
    name: 'USER MANAGEMENT',
    url: '/home/user-management',
    // icon: 'fa fa-users',
    children: [
      // {
      //   name: 'Roles',
      //   url: '/home/user-management/roles',
      //   // icon: 'fa fa-caret-right'
      // },
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
        name: 'Change Password',
        url: '/home/user-management/user/profile',
        // icon: 'fa fa-user'
      },
      {
        name: 'User Profile',
        url: '/home/user-management/profile'
      },
      {
        name: 'Locked Users',
        url: '/home/user-management/user/locked-users',
        // icon: 'fa fa-user'
      },
    ],
  },
  {
    divider: true,
  },

  {
    divider: true,
  },
  {
    name: 'POLICE',
    url: '/home/police',
    // icon: 'fa fa-users',
    children: [
      {
        name: 'Police Officer',
        url: '/home/police/policeofficer',
      },
      {
        name: 'Locked Police Officer',
        url: '/home/police/locked-police-officer',
      }
    ],
  },
  {
    name: 'CITIZENS AND FINES',
    url: '/home/citizens',
    // icon: 'fa fa-building',
    children: [
      {
        name: 'Essential Workers',
        url: '/home/citizens/essential-workers',
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
      // {
      //   name: 'Authentication Reports',
      //   url: '/home/reports/authentication-report',
      //   // icon: 'fa fa-caret-right'
      // },
      // {
      //   name: 'Customer Authorized and Unauthorized Reports',
      //   url: '/home/reports/customer-authorized-unauthorized-reports',
      //   // icon: 'fa fa-caret-right'
      // },
      // {
      //   name: 'User Authorized and Unauthorized Reports',
      //   url: '/home/reports/user-authorized-unauthorized-reports',
      //   // icon: 'fa fa-caret-right'
      // },
      {
        name: 'Audit Trails',
        url: '/home/reports/audit-logs',
        // icon: 'fa fa-caret-right'
      },
      {
        name: 'Session Trails',
        url: '/home/reports/session-logs',
        // icon: 'fa fa-caret-right'
      },
    ],
  },
];
