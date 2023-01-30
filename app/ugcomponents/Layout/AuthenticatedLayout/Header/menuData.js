import { FEEDBACK_EMAIL } from 'appConstants';
/**
 * Created by Yang on 20/2/17.
 */
export const menuData = {
  // This mainMenuList are just sample data
  mainMenuList: [
    {
      icon: 'sample-icon2',
      text: 'Tours',
      url: '/admin/templates',
      baseUrl: '/admin/templates/organisation',
      children: [
        {
          title: 'Organisation Tours',
          link: '/admin/templates/organisation',
        },
        {
          title: 'My Tours',
          link: '/admin/templates/my',
        },
        {
          title: 'Shared Tours',
          link: '/admin/templates/shared',
        },
      ],
    },
    {
      text: 'Checklists',
      url: '/admin/checklists',
      baseUrl: '/admin/checklists/my',
      children: [
        {
          title: 'My checklists',
          link: '/admin/checklists/my',
        },
        {
          title: 'Assigned checklists',
          link: '/admin/checklists/assigned',
        },
      ],
    },
    // TODO: (edil) Comment out assets for the moment
    // {
    //   icon: 'sample-icon3',
    //   text: 'Assets',
    //   url: '/admin/assets',
    //   baseUrl: '/admin/assets/my',
    //   children: [
    //     {
    //       title: 'My Assets',
    //       link: '/admin/assets/my',
    //     },
    //     {
    //       title: 'Shared Assets',
    //       link: '/admin/assets/shared',
    //     },
    //     {
    //       title: 'Organisation Assets',
    //       link: '/admin/assets/organisation',
    //     },
    //     {
    //       title: 'All Assets',
    //       link: '/admin/assets/all',
    //     },
    //   ],
    // },
  ],
  menuList: [
    {
      isOpen: '',
      dropDownType: 'notification',
      menu: {
        type: 'notification',
        icon: 'lnr-alarm',
        key: 'notification',
      },
      popover: {
        type: 'notification',
        titleBar: {
          buttonTitle: 'Notifications',
          title: '',
        },
        lists: [],
      },
    },
    {
      isOpen: '',
      dropDownType: 'invites',
      menu: {
        type: 'icon',
        icon: 'lnr-users-plus',
        badgeNumber: 3,
        key: 'invites',
      },
      popover: {
        type: 'invite',
        titleBar: {
          buttonTitle: 'Invites',
          title: '',
        },
        lists: [],
      },
    },
    {
      isOpen: '',
      dropDownType: 'discussion',
      menu: {
        type: 'discussion',
        icon: 'lnr-bubbles',
        key: 'discussion',
      },
      popover: {
        type: 'discussion',
        titleBar: {
          buttonTitle: 'Discussions',
          title: '',
        },
        lists: [],
      },
    },
    {
      isOpen: '',
      dropDownType: 'user',
      menu: {
        type: 'profile',
        alt: 'avatar9',
        img:
          'http://keenthemes.com/preview/metronic/theme/assets/layouts/layout4/img/avatar9.jpg',
        profileName: 'Yang4',
        key: 'profile3',
      },
      popover: {
        type: 'profile',
        lists: [
          {
            icon: 'lnr-earth',
            link: `mailto:${FEEDBACK_EMAIL}`,
            key: '5',
            menuName: 'Support',
          },
        ],
      },
    },
  ],
  previousClickIndex: 0,
};
