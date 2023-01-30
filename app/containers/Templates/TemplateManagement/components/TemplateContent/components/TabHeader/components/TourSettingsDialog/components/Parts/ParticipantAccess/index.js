import JText from 'components/JText';
import React from 'react';
import { FormattedMessage as M } from 'react-intl';
import { NODE_SETTING_PARTICIPANT_ACCESS_HELPERS } from 'utils/helpers/nodeSettings';
import GridContainer from 'components/GridContainer';
import { compose } from 'redux';
import resaga from 'resaga';
import Hr from 'components/Hr';
import PropTypes from 'prop-types';
import GridItem from 'components/GridItem';
import Role from './components/Role';
import m from './messages';
import { CONFIG } from './config';

export class ParticipantAccess extends React.PureComponent {
  renderRole = role => (
    <React.Fragment>
      <GridItem key={role}>
        <Role role={role} {...this.props} paxLabel={this.props.paxLabel} />
      </GridItem>
      <Hr half />
    </React.Fragment>
  );

  renderHeading = () => (
    <JText dark lg>
      <M {...m.heading} values={{ paxLabel: this.props.paxLabel }} />
    </JText>
  );

  render = () => (
    <GridItem>
      <GridContainer card highlight direction="column" spacing={2}>
        <GridItem>
          <GridContainer direction="column" spacing={0}>
            <GridItem>{this.renderHeading()}</GridItem>
            <GridItem>
              <JText gray nowrap={false}>
                <M
                  {...m.subHeading}
                  values={{ paxLabel: this.props.paxLabel }}
                />
              </JText>
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem>
          <GridContainer direction="column" spacing={1}>
            {Object.values(
              NODE_SETTING_PARTICIPANT_ACCESS_HELPERS.KEY_ROLES,
            ).map(this.renderRole)}
          </GridContainer>
        </GridItem>
      </GridContainer>
    </GridItem>
  );
}

ParticipantAccess.propTypes = {
  paxLabel: PropTypes.string,
};

ParticipantAccess.defaultProps = {
  paxLabel: '',
};

export default compose(resaga(CONFIG))(ParticipantAccess);
