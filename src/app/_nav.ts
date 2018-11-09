export const navigation = [

  {
    name: 'Dashboard',
    url: '/staffs/dashboard',
    icon: 'icon-speedometer'
  },
  {
    name: 'Attendance',
    url: '/staffs/students-attendance',
    icon: 'icon-calculator'
  },
  {
    title: true,
    name: 'Manage Institute'
  },
  {
    name: 'Term',
    url: '/term/term-list',
    icon: 'icon-notebook',
  },
  {
    name: 'Departments',
    url: '/departments/departments-list',
    icon: 'icon-book-open',
  },
  {
    name: 'Events',
    url: '/events/events-list',
    icon: 'icon-trophy',
  },
  {
    title: true,
    name: 'Manage People'
  },
  {
    name: 'Students',
    url: '/students/students-list',
    icon: 'icon-graduation',
  },
  {
    name: 'Staff',
    url: '/staffs/staffs-list',
    icon: 'icon-people',
  },
  {
    title: true,
    name: 'Manage Batch'
  },
  {
    name: 'Batch',
    url: '/batch/batch-list',
    icon: 'icon-menu',
  },
  {
    name: 'Course',
    url: '/course/course-list',
    icon: 'icon-book-open',
  },
  {
    name: 'Assessment',
    url: '/course/add-assessment',
    icon: 'icon-energy',
  },
  {
    name: 'Time Table',
    url: '/time-table',
    icon: 'icon-bell',
    children: [
      {
        name: 'Manual',
        url: '/time-table/manual-tt',
        icon: 'icon-hourglass'
      },
      {
        name: 'Automatic',
        url: '/time-table/automatic-tt',
        icon: 'icon-hourglass'
      },
    ]
  },
  {
    name: 'Fees',
    url: '/fees',
    icon: 'fa fa-rupee',
    children: [
      {
        name: 'Assign Fees',
        url: '/fees/assign-fees',
        icon: 'icon-hourglass'
      },
      {
        name: 'Manage Fees',
        url: '/fees/manage-fees',
        icon: 'icon-hourglass'
      },
      {
        name: 'Fees Type',
        url: '/fees/add-feetype',
        icon: 'icon-hourglass'
      },
      {
        name: 'Fees Year',
        url: '/fees/add-feeyear',
        icon: 'icon-hourglass'
      },{
        name: 'Sub Group',
        url: '/fees/add-subgroup',
        icon: 'icon-hourglass'
      },
      {
        name: 'Manage Fee Term',
        url: '/fees/manage-feeterm',
        icon: 'icon-hourglass'
      }     
    ]
  },
  {
    name: 'Penalty',
    url: '/penalty',
    icon: 'fa fa-window-close-o',
    children: [
      {
        name: 'Add Penalty',
        url: '/penalty/add-penalty',
        icon: 'icon-hourglass'
      }
      // {
      //   name: 'Assign Penalty',
      //   url: '/penalty/assign-penalty',
      //   icon: 'icon-hourglass'
      // },
      // {
      //   name: 'Manage Penalty',
      //   url: '/penalty/manage-penalty',
      //   icon: 'icon-hourglass'
      // }
     
    ]
  }
  
];


export const navigation_students = [
  {
    name: 'Dashboard',
    url: '/students/dashboard',
    icon: 'icon-speedometer'
  },
  {
    name: 'Leave Request',
    url: '/students/leave-request',
    icon: 'icon-shield'
  },
];

export const navigation_staff = [
  {
    name: 'Dashboard',
    url: '/staffs/dashboard',
    icon: 'icon-speedometer'
  },
  {
    name: 'Attendance',
    url: '/staffs/students-attendance',
    icon: 'icon-calculator'
  },
  {
    name: 'Leave Request',
    url: '/staffs/leave-request',
    icon: 'icon-shield'
  },
];