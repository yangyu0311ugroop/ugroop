import { ability } from 'apis/components/Ability/ability';
import { TOUR_CONTRIBUTOR_ROLE_TYPES } from 'apis/components/Ability/roles';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from '@material-ui/core/styles';
import { INVITATION_STORE_HOC } from 'datastore/invitationStore/hoc';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import PeopleTabRedirect from 'smartComponents/Node/logics/PeopleTabRedirect';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { NODE_SHARE, TOUR_CONTRIBUTOR } from 'utils/modelConstants';
import { VARIANTS } from 'variantsConstants';
import P, { H6, Span } from 'viewComponents/Typography';
import KnownAs from 'smartComponents/Person/parts/KnownAs';

import { CONFIG, CONFIG_0 } from './config';
import styles from './styles';

export class Contributors extends PureComponent {
  renderSeeMore = () => props => {
    const {
      ownerId,
      people,
      calculatedVisibleChildren,
      calculatedPeopleTabId,
    } = this.props;

    const isPeopleTabPublic =
      calculatedVisibleChildren.indexOf(calculatedPeopleTabId) !== -1;
    const shouldBeClickable =
      ability.can('execute', { type: NODE_SHARE }) &&
      (isPeopleTabPublic || calculatedPeopleTabId < 0);

    return (
      <GridItem
        clickable={shouldBeClickable}
        onClick={LOGIC_HELPERS.ifElse(
          shouldBeClickable,
          props.handlePeopleRedirect({
            peopleView: TOUR_CONTRIBUTOR,
          }),
          null,
        )}
      >
        <P dense>
          <Span weight="bold" dense>
            <KnownAs id={ownerId} variant={VARIANTS.STRING_ONLY} />
          </Span>{' '}
          {people.length === 0 ? null : `and ${people.length} others`}
        </P>
      </GridItem>
    );
  };

  render = () => (
    <GridContainer card direction="column">
      <GridItem>
        <H6 transform="uppercase" color="gray" weight="bold" dense>
          Organisers
        </H6>
      </GridItem>
      <PeopleTabRedirect>{this.renderSeeMore()}</PeopleTabRedirect>
    </GridContainer>
  );
}

Contributors.propTypes = {
  // hoc props

  // parent props

  // resaga props
  people: PropTypes.array,
  ownerId: PropTypes.number,
  calculatedVisibleChildren: PropTypes.array,
  calculatedPeopleTabId: PropTypes.number,
};

Contributors.defaultProps = {
  people: [],
  calculatedVisibleChildren: [],
  calculatedPeopleTabId: 0,
};

export default compose(
  withStyles(styles, { name: 'Contributors' }),
  resaga(CONFIG_0),
  INVITATION_STORE_HOC.selectUserNodeUserIds({
    nodeIds: 'templateId',
    roles: TOUR_CONTRIBUTOR_ROLE_TYPES,
    outputProp: 'people',
  }),
  resaga(CONFIG),
)(Contributors);
