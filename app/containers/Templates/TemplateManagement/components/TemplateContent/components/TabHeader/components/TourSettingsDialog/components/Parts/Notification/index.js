import JText from 'components/JText';
import React from 'react';
import { FormattedMessage as M } from 'react-intl';
import { TOUR_SETTINGS } from 'appConstants';
import GridItem from 'components/GridItem';
import GridContainer from 'components/GridContainer';
import { TourSetting } from 'smartComponents/TourSettings';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { VARIANTS } from 'variantsConstants';
import m from './messages';

export class Notification extends React.PureComponent {
  renderLabel = () => <M {...m.label} />;

  renderHeading = () => (
    <JText lg bold>
      <M {...m.heading} />
    </JText>
  );

  renderStatus = value => {
    const isOn = value === '1';
    const status = (
      <JText success={isOn} danger={!isOn} bold>
        {LOGIC_HELPERS.ifElse(isOn, 'Active', 'Inactive')}
      </JText>
    );
    return (
      <JText dark nowrap={false} italic>
        Notification is currently {status}
      </JText>
    );
  };

  render = () => (
    <GridItem>
      <GridContainer card highlight direction="column" spacing={2}>
        <GridItem>
          <GridContainer direction="column" spacing={0}>
            <GridItem>
              <JText dark lg>
                Push Notifications
              </JText>
            </GridItem>
            <GridItem>
              <JText gray nowrap={false}>
                Let people know when something changes.
              </JText>
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem>
          <GridContainer direction="column" spacing={0}>
            <GridItem>
              <TourSetting
                label={this.renderLabel()}
                settingKey={TOUR_SETTINGS.PUSH_NOTIFICATION}
                {...this.props}
              />
            </GridItem>
            <GridItem>
              <TourSetting
                settingKey={TOUR_SETTINGS.PUSH_NOTIFICATION}
                variant={VARIANTS.RENDER_PROP}
                {...this.props}
              >
                {this.renderStatus}
              </TourSetting>
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    </GridItem>
  );
}

Notification.propTypes = {};

Notification.defaultProps = {};

export default Notification;
