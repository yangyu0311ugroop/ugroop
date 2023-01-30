import { defineMessages } from 'react-intl';

export default defineMessages({
  ownerHeader: {
    id:
      'app.containers.Profile.components.Organisation.components.TabHeader.components.HelpOrgRoles.ownerHeader',
    defaultMessage: 'Owner',
  },
  owner: {
    id:
      'app.containers.Profile.components.Organisation.components.TabHeader.components.HelpOrgRoles.owner',
    defaultMessage:
      'Person whom initially creates an organisation and manages subscription details. This person has full control over the uGroop experience, can add, delete and edit user roles and can access all the tours in the organisation with the exception of Personal workspaces that each user is allocated.',
  },
  adminHeader: {
    id:
      'app.containers.Profile.components.Organisation.components.TabHeader.components.HelpOrgRoles.adminHeader',
    defaultMessage: 'Administrator',
  },
  admin: {
    id:
      'app.containers.Profile.components.Organisation.components.TabHeader.components.HelpOrgRoles.admin',
    defaultMessage:
      'Someone who is assigned the role of management of the organisation except for subscription information. This person can view all users, add roles and manage permissions. An administrator cannot demote another admin but can deactivate any role. All administrators can access all the tours in the organisation.',
  },
  memberHeader: {
    id:
      'app.containers.Profile.components.Organisation.components.TabHeader.components.HelpOrgRoles.memberHeader',
    defaultMessage: 'Member',
  },
  member: {
    id:
      'app.containers.Profile.components.Organisation.components.TabHeader.components.HelpOrgRoles.member',
    defaultMessage:
      'This person has the capability to create, change and delete their own tours and/or the organisation tours.',
  },
  guestHeader: {
    id:
      'app.containers.Profile.components.Organisation.components.TabHeader.components.HelpOrgRoles.guestHeader',
    defaultMessage: 'Guest',
  },
  guest: {
    id:
      'app.containers.Profile.components.Organisation.components.TabHeader.components.HelpOrgRoles.guest',
    defaultMessage:
      'The only permission available to guests is VIEW function. They cannot create a tour but can only view a tour through a tour invitation.',
  },
  orgRoles: {
    id:
      'app.containers.Profile.components.Organisation.components.TabHeader.components.HelpOrgRoles.orgRoles',
    defaultMessage: 'Organisation Roles',
  },
  orgRoleHelp: {
    id:
      'app.containers.Profile.components.Organisation.components.TabHeader.components.HelpOrgRoles.orgRoleHelp',
    defaultMessage: 'Organisation Roles Help',
  },
  description: {
    id:
      'app.containers.Profile.components.Organisation.components.TabHeader.components.HelpOrgRoles.description',
    defaultMessage:
      'To increase the granularity and control of user account security, uGroop uses a concept of Roles within an organisation. There are 4 roles to choose from.',
  },
});
