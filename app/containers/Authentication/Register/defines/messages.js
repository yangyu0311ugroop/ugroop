/*
 * RegisterPage Messages
 *
 * This contains all the text for the RegisterPage component.
 */
import { defineMessages } from 'react-intl';

const m = defineMessages({
  nameHelper: {
    id: 'app.containers.Form.Register.nameHelper',
    defaultMessage: 'what is your organisation name?',
  },
  nameLabel: {
    id: 'app.containers.Form.Register.nameLabel',
    defaultMessage: 'Organisation Name',
  },
  orgNameMinLength: {
    id: 'app.containers.Form.Register.orgNameMinLength',
    defaultMessage: 'try a bit longer (minimum 6 characters)',
  },
  orgNameMaxLength: {
    id: 'app.containers.Form.Register.nameMaxLength',
    defaultMessage: 'too long (maximum 50 characters)',
  },
  addLabel: {
    id: 'app.containers.Form.Register.addLabel',
    defaultMessage: 'Address',
  },
  registrationSidebarHeading: {
    id: 'app.containers.Form.Register.registrationSidebarHeading',
    defaultMessage: 'Start organising your tour today',
  },
  planTogether: {
    id: 'app.containers.Form.Register.planTogether',
    defaultMessage: 'Plan together. Travel better.',
  },
  loginNotYou: {
    id: 'app.containers.Form.Register.loginNotYou',
    defaultMessage: 'Not you?',
  },
  goToLoginQuestion: {
    id: 'app.containers.Form.Register.goToLoginQuestion',
    defaultMessage: 'Go to login?',
  },
  goToLogin: {
    id: 'app.containers.Form.Register.goToLogin',
    defaultMessage: 'login',
  },
  registrationAskName: {
    id: 'app.containers.Form.Register.registrationAskName',
    defaultMessage: 'What is your name?',
  },
  registrationEnterPassword: {
    id: 'app.containers.Form.Register.registrationEnterPassword',
    defaultMessage: 'Enter your desired password',
  },
  registrationEnterEmail: {
    id: 'app.containers.Form.Register.registrationEnterEmail',
    defaultMessage: 'Enter your preferred email address',
  },
  aboutOrganisation: {
    id: 'app.containers.Form.Register.aboutOrganisation',
    defaultMessage:
      'Please register your organisation to collaborate and share. Ideal for businesses, clubs,\n' +
      'educational institutions, tour operators and providers, travel agents and travel arrangers including\n' +
      'meetings, incentives, conferencing and exhibition management.',
    // defaultMessage: 'Tell us about your organisation',
  },
  siteAddressLabel: {
    id: 'app.containers.Form.Register.siteAddressLabel',
    defaultMessage: 'Address',
  },
  addHelper: {
    id: 'app.containers.Form.Register.addHelper',
    defaultMessage: 'where is it based?',
  },
  addMinLength: {
    id: 'app.containers.Form.Register.addMinLength',
    defaultMessage: 'try a bit longer (minimum 2 characters)',
  },
  orgFirstNameLabel: {
    id: 'app.containers.Form.Register.firstLabel',
    defaultMessage: 'First Name',
  },
  nameIsWords: {
    id: 'app.containers.Form.Register.nameIsWords',
    defaultMessage: 'does not look like a name',
  },
  nameMinLength: {
    id: 'app.containers.Form.Register.nameMinLength',
    defaultMessage: 'try a bit longer (minimum 2 chars)',
  },
  nameMaxLength: {
    id: 'app.containers.Form.Register.nameMaxLength',
    defaultMessage: 'too long (maximum 50 chars)',
  },
  lastLabel: {
    id: 'app.containers.Form.Register.lastLabel',
    defaultMessage: 'Last Name',
  },
  emailLabel: {
    id: 'app.containers.Form.Register.emailLabel',
    defaultMessage: 'Email Address',
  },
  emailIsEmail: {
    id: 'app.containers.Form.Register.emailIsEmail',
    defaultMessage: 'does not look like an email',
  },
  passwordLabel: {
    id: 'app.containers.Form.Register.passwordLabel',
    defaultMessage: 'Password',
  },
  accountCreated: {
    id: 'app.containers.Form.Register.accountCreated',
    defaultMessage:
      "Your account has now been created (we're excited too!) and a verification link has been sent to your email ",
  },
  thankYouForJoining: {
    id: 'app.containers.Form.Register.thankYouForJoining',
    defaultMessage:
      'Hi there, and thank you for joining the most powerful and easy to use group travel management platform. ',
  },
  specialBenefit: {
    id: 'app.containers.Form.Register.specialBenefit',
    defaultMessage:
      "You can plan, organise, and follow all of life's planned adventures (personal, academic, business, and family) all through uGroop.",
  },
  availableServices: {
    id: 'app.containers.Form.Register.availableServices',
    defaultMessage:
      'Everything from your itinerary, bookings, tickets, activities, and anything else that you plan to do is always available on your mobile device, even without an internet connection (for those really going bush!). So no matter where you are in the world, we have you covered.',
  },
  notReceiveEmail: {
    id: 'app.containers.Form.Register.notReceiveEmail',
    defaultMessage: "I didn't receive any email.",
  },
  resendEmail: {
    id: 'app.containers.Form.Register.resendEmail',
    defaultMessage: 'Please send to me again',
  },
  checkEmail: {
    id: 'app.containers.Form.Register.checkEmail',
    defaultMessage:
      ' Your account has now been created and a verification link has been sent to your email',
  },
  whenReady: {
    id: 'app.containers.Form.Register.whenReady',
    defaultMessage:
      'Please activate this link and then login to finish setting up your account. Unverified accounts will be removed after 24 hours',
  },
  pleaseActivateAccount: {
    id: 'app.containers.Form.Register.pleaseActivateAccount',
    defaultMessage:
      "Please activate this link within 24 hours to login and complete the initial setup process (it's super easy, we promise).",
  },
  enjoyUgroop: {
    id: 'app.containers.Form.Register.enjoyUgroop',
    defaultMessage:
      'We would like you to both enjoy and benefit from using uGroop to manage all group adventures whether they be for fun, competition or learning, academic, business, or personal use.',
  },
  orgEnjoyUgroop: {
    id: 'app.containers.Form.Register.orgEnjoyUgroop',
    defaultMessage:
      'We would like you to both enjoy and benefit from using uGroop to collaborate and manage your educational tours and excursions.',
  },
  subscriptionFree: {
    id: 'app.containers.Form.Register.subscriptionFree',
    defaultMessage:
      'Finally, your subscription is FREE for 90 days at which time you can choose from one of our pricing plans best suited to your needs.',
  },
  emailUs: {
    id: 'app.containers.Form.Register.emailUs',
    defaultMessage:
      ' with your thoughts, suggestions or anytime you need some assistance.',
  },
  emailUsAnytime: {
    id: 'app.containers.Form.Register.emailUsAnytime',
    defaultMessage:
      'We’re fairly sure we’ve covered everything, but you can email us anytime at ',
  },
  handleTheRest: {
    id: 'app.containers.Form.Register.handleTheRest',
    defaultMessage:
      'There aren’t any tray tables here, so kick up your feet and stretch out, we’ll handle the rest.',
  },
  loginNow: {
    id: 'app.containers.Form.Register.loginNow',
    defaultMessage: 'Login now',
  },
  alreadyRegister: {
    id: 'app.containers.Form.Register.alreadyRegister',
    defaultMessage:
      'Already have a uGroop account with this email address? Please {login}.',
  },
  backToLogin: {
    id: 'app.containers.Form.Register.backToLogin',
    defaultMessage: 'login here',
  },
  emailExist: {
    id: 'app.containers.Form.Register.emailExist',
    defaultMessage:
      'This email is taken. Try another one or did you forget your password?',
  },
  orgNameExist: {
    id: 'app.containers.Form.Register.orgNameExist',
    defaultMessage: 'This organisation name is taken',
  },
  requiredButton: {
    id: 'app.containers.Form.Register.requiredButton',
    defaultMessage: 'all fields are required',
  },
  validButton: {
    id: 'app.containers.Form.Register.validButton',
    defaultMessage: 'Register',
  },
  invalidButton: {
    id: 'app.containers.Form.Register.invalidButton',
    defaultMessage: 'Register',
  },
  successButton: {
    id: 'app.containers.Form.Register.successButton',
    defaultMessage: 'successfully registered',
  },
  sendingButton: {
    id: 'app.containers.Form.Register.sendingButton',
    defaultMessage: 'Registering..',
  },
  captchaButton: {
    id: 'app.containers.Form.Register.captchaButton',
    defaultMessage: 'verifying captcha..',
  },
  timedOutButton: {
    id: 'app.containers.Form.Register.timedOutButton',
    defaultMessage: 'no response from server. try again?',
  },
  bySigninUp: {
    id: 'app.containers.Form.Register.bySigninUp',
    defaultMessage:
      'By registering you are agreeing to the {privacy} and {tos} provided by uGroop.',
  },
  privacy: {
    id: 'app.containers.Form.Register.policy',
    defaultMessage: 'Privacy Policy',
  },
  tos: {
    id: 'app.containers.Form.Register.terms',
    defaultMessage: 'Terms of Service',
  },
  tourInvitationSender: {
    id: 'app.containers.Form.Register.tourInvitationSender',
    defaultMessage: '{sender} from {org}',
  },
  inviteYouToJoinTour: {
    id: 'app.containers.Form.Register.inviteYouToJoinTour',
    defaultMessage: ' invited you to work on their tour {tour} as a {role}.',
  },
  inviteYouToOwnTour: {
    id: 'app.containers.Form.Register.inviteYouToOwnTour',
    defaultMessage: ' wants to transfer the ownership of tour {tour} to you',
  },
  inviteFollower: {
    id: 'app.containers.Form.Register.inviteFollower',
    defaultMessage: ' from {org} has invited you to follow the tour {tour}',
  },
  inviteFollowerSender: {
    id: 'app.containers.Form.Register.inviteFollowerSender',
    defaultMessage: '{sender}',
  },
  inviteYouToJoinOrg: {
    id: 'app.containers.Form.Register.inviteYouToJoin',
    defaultMessage: '{sender} has invited you to be {role} of {org}.',
  },
  invitationInfoTour: {
    id: 'app.containers.Form.Register.invitationInfoOrg',
    defaultMessage:
      'By completing this form and registering you will have access to the tour information as described in your invitation email.',
  },
  loginAs: {
    id: 'app.containers.Form.Register.loginAs',
    defaultMessage:
      'You have been invited to register using the following email address and this will be the username for your account:',
  },
  loginAsWarning: {
    id: 'app.containers.Form.Register.loginAsWarning',
    defaultMessage:
      'Should you not wish to use this email address, please ask {sender} to re-invite you with your preferred email address.',
  },
  registrationType: {
    id: 'app.containers.Form.Register.registrationType',
    defaultMessage: 'Registration Type',
  },
  thankYouOrganisation: {
    id: 'app.containers.Form.Register.thankYouOrganisation',
    defaultMessage:
      'Hi there, and thank you for registering your organisation.',
  },
  orgAccountCreated: {
    id: 'app.containers.Form.Register.orgAccountCreated',
    defaultMessage:
      'Your account has now been created and a verification link has been sent to your email',
  },
  congratulationsOnJoining: {
    id: 'app.containers.Form.Register.congratulationsOnJoining',
    defaultMessage:
      'Congratulations on joining the most powerful and easy to use group travel management platform!',
  },
  introductionJoining: {
    id: 'app.containers.Form.Register.introductionJoining',
    defaultMessage: 'Group travel just got a lot easier, good work. ',
  },
  accountCreatedWithVerification: {
    id: 'app.containers.Form.Register.accountCreatedWithVerification',
    defaultMessage:
      'Your account is all set to go, and a verification link should now be in your email at ',
  },
  checkSpamFolder: {
    id: 'app.containers.Form.Register.checkSpamFolder',
    defaultMessage: 'Check the Spam folder just in case.',
  },
  requestForActivation: {
    id: 'app.containers.Form.Register.requestForActivation',
    defaultMessage:
      'Please activate this link within a day and then complete a short set-up process, super easy, we promise. ',
  },
  needAssistance: {
    id: 'app.containers.Form.Register.needAssistance',
    defaultMessage:
      'If you need any assitance while using uGroop click on the orange button at the bottom right of your screen. We would be happy to help. ',
  },
  planAndTravel: {
    id: 'app.containers.Form.Register.planAndTravel',
    defaultMessage: 'Plan together and travel better, the uGroop team ',
  },
  loginAndBookmark: {
    id: 'app.containers.Form.Register.loginAndBookmark',
    defaultMessage:
      "and don't forget to bookmark the page and with Chrome create a shortcut on your desktop or mobile device. ",
  },
  copyRight: {
    id: 'app.containers.Form.Register.copyRight',
    defaultMessage: 'Copyright message. ',
  },
  uGroopTeam: {
    id: 'app.containers.Form.Register.uGroopTeam',
    defaultMessage: 'the uGroop team ',
  },
  registrationTypeLabel: {
    id: 'app.containers.Form.Register.registrationTypeLabel',
    defaultMessage: 'Will you use uGroop for personal use only?',
  },
  goBack: {
    id: 'app.containers.Form.Register.goBack',
    defaultMessage: 'Go Back',
  },
});

export default m;
