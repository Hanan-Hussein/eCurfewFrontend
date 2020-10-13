import { INavData } from "@coreui/angular";

export const navItems: INavData[] = [
  {
    name: "DASHBOARD",
    url: "/home/dashboard/dashboard",
    // icon: 'fa fa-th-large'
  },
  {
    divider: true,
  },
  {
    name: "USER MANAGEMENT",
    url: "/home/user-management",
    // icon: 'fa fa-users',
    children: [
      {
        name: "Roles",
        url: "/home/user-management/roles",
        // icon: 'fa fa-caret-right'
      },
      {
        name: "Workgroups",
        url: "/home/user-management/workgroups",
        // icon: 'fa fa-caret-right'
      },
      {
        name: "Users",
        url: "/home/user-management/users",
        // icon: 'fa fa-caret-right'
      },
      {
        name: "User Profile",
        url: "/home/user-management/user/profile",
        // icon: 'fa fa-user'
      },
    ],
  },
  // {
  // divider: true
  // },
  // {
  // name: 'Master Data',
  // url: '/home/business',
  // icon: 'fa fa-building',
  // children: [
  // {
  // name: 'Countries',
  // url: '/home/master-data/countries',
  // icon: 'fa fa-caret-right'
  // },
  // {
  // name: 'Currency',
  // url: '/home/master-data/currency',
  // icon: 'fa fa-caret-right'
  // },
  // ]
  // },
  {
    divider: true,
  },
  {
    name: "SYSTEM CONFIGS",
    url: "/home/product",
    // icon: 'fa fa-shopping-cart',
    children: [
      // {
      // name: 'Forex',
      // url: '/home/system-config/forexs',
      // icon: 'fa fa-caret-right'
      // },
      {
        name: "Providers",
        url: "/home/system-config/providers",
        // icon: 'fa fa-caret-right'
      },
      {
        name: "Provider Fees & Charges",
        url: "/home/system-config/providers-charges",
        // icon: 'fa fa-caret-right'
      },
      {
        name: "Merchant Fees & Charges",
        url: "/home/system-config/merchant-fees-charges",
        // icon: 'fa fa-caret-right'
      },
      {
        name: "Customer Fees & Charges",
        url: "/home/system-config/customer-fees-charges",
        // icon: 'fa fa-caret-right'
      },
      {
        name: "Configurations",
        url: "/home/system-config/switch-config",
        // icon: 'fa fa-caret-right'
      },
      // {
      // name: 'Global Configs',
      // url: '/home/system-config/global-config',
      // icon: 'fa fa-caret-right'
      // },
      // {
      // name: 'Commissions Configs',
      // url: '/home/system-config/commission-config',
      // icon: 'fa fa-caret-right'
      // },
      // {
      // name: 'Email Template',
      // url: '/home/system/email',
      // icon: 'fa fa-caret-right'
      // },
      // {
      // name: 'SMS Template',
      // url: '/home/system/sms',
      // icon: 'fa fa-caret-right'
      // },
    ],
  },
  {
    name: "MERCHANTS MANAGEMENT",
    url: "/home/merchants-management",
    // icon: 'fa fa-building',
    children: [
      {
        name: "Merchants",
        url: "/home/merchants-management/merchants",
        // icon: 'fa fa-caret-right'
      },
      {
        name: "Merchants Dashboard",
        url: "/home/merchants-management/merchants-dashboard",
        // icon: 'fa fa-caret-right'
      },
    ],
  },
  {
    divider: true,
  },
  {
    name: "CUSTOMERS",
    url: "/home/customers",
    // icon: 'fa fa-building',
    children: [
      {
        name: "View customers",
        url: "/home/customers/customers",
        // icon: 'fa fa-caret-right'
      },
    ],
  },
  {
    divider: true,
  },
  {
    name: "REPORTS",
    url: "/home/reports",
    // icon: 'fa fa-clipboard',
    children: [
      {
        name: "Income Reports",
        url: "/home/reports/income-reports",
        // icon: 'fa fa-caret-right'
      },
      {
        name: "Topup Reports",
        url: "/home/reports/top-up-reports",
        // icon: 'fa fa-caret-right'
      },
      {
        name: "Accounting Entries",
        url: "/home/reports/accounting-entries",
        // icon: 'fa fa-caret-right'
      },
      {
        name: "Consumption Reports",
        url: "/home/reports/consumption-reports",
        // icon: 'fa fa-caret-right'
      },
      {
        name: "Audit Trails",
        url: "/home/reports/audit-logs",
        // icon: 'fa fa-caret-right'
      },
    ],
  },
];
