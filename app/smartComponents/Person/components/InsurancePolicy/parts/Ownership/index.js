import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage as M } from 'react-intl';
import resaga from 'resaga';
import { LINK } from 'appConstants';
import { VARIANTS } from 'variantsConstants';
import GridItem from 'components/GridItem';
import GridContainer from 'components/GridContainer';
import P from 'viewComponents/Typography';
import PersonName from 'ugcomponents/Person/Name';
import Name from 'smartComponents/Node/parts/Name';
import { CONFIG_1 } from './config';
import m from './messages';

export class Ownership extends React.PureComponent {
  renderAvatar = () => {
    const { personUserId, personNodeId } = this.props;

    if (personUserId) {
      return <Name userId={personUserId} variant={VARIANTS.AVATAR} />;
    }

    if (personNodeId) {
      return <Name id={personNodeId} variant={VARIANTS.AVATAR} />;
    }

    return null;
  };

  renderMessage = () => {
    const { futureTense, personUserId, personNodeId, isUserOwned } = this.props;

    if (isUserOwned) {
      return (
        <M
          {...m.ownershipUser}
          values={{
            user: <PersonName id={personUserId} variant={LINK} bold={false} />,
          }}
        />
      );
    }

    if (personNodeId) {
      return futureTense ? (
        <M {...m.ownershipNodeFuture} />
      ) : (
        <M {...m.ownershipNode} />
      );
    }

    return null;
  };

  render = () => {
    const message = this.renderMessage();

    if (message) {
      const avatar = this.renderAvatar();
      return (
        <GridItem>
          <GridContainer wrap="nowrap" alignItems="center">
            {avatar && <GridItem>{avatar}</GridItem>}
            <GridItem>
              <P dense fontStyle="italic">
                {message}
              </P>
            </GridItem>
          </GridContainer>
        </GridItem>
      );
    }

    return null;
  };
}

Ownership.propTypes = {
  // parent
  futureTense: PropTypes.bool,

  // resaga value
  personUserId: PropTypes.number,
  personNodeId: PropTypes.number,
  isUserOwned: PropTypes.bool,
};

Ownership.defaultProps = {
  futureTense: false,

  personUserId: null,
  personNodeId: null,
};

export default compose(resaga(CONFIG_1))(Ownership);
