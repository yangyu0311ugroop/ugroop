import { INVITATION_VIEW_STORE } from 'appConstants';
import { shallow } from 'enzyme';
import React from 'react';
import InvitationCard from 'ugcomponents/Card/InvitationCard';
import UGAdminMenuItems from '../index';
import UGProfileMenuItems from '../UGProfileMenuItems';

const renderComponent = (props = {}) =>
  shallow(<UGAdminMenuItems {...props} />);

describe('<UGAdminPopoverMenu />', () => {
  it('should render UGProfileMenuItems component', () => {
    const renderedComponent = renderComponent({ type: 'profile' });
    expect(
      renderedComponent.contains(<UGProfileMenuItems type="profile" />),
    ).toEqual(true);
  });
  it('should render UGInvitationMenuItems component', () => {
    const renderedComponent = renderComponent({ type: 'invite' });
    expect(
      renderedComponent.contains(
        <InvitationCard viewStore={INVITATION_VIEW_STORE} />,
      ),
    ).toEqual(true);
  });
  it('should render other component', () => {
    const renderedComponent = renderComponent({ type: 'other' });
    expect(
      renderedComponent.contains(<UGProfileMenuItems type="other" />),
    ).toEqual(true);
  });
});
