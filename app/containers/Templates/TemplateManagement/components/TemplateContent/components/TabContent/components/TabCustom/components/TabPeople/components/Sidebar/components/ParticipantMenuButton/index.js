import { Hidden } from '@material-ui/core';
import { PEOPLE_FILTERS, PEOPLE_TAB_OPTIONS } from 'appConstants';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from '@material-ui/core/styles';
import Hr from 'components/Hr';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';

import ParticipantList from 'smartComponents/Node/components/ParticipantList';
import { LOGIC_HELPERS } from 'utils/helpers/logic';

import { VARIANTS } from 'variantsConstants';
import P from 'viewComponents/Typography';
import Margin from 'viewComponents/Margin';
import Button from 'viewComponents/Button';

import Filters from './components/Filters';
import { CONFIG, CONFIG_0 } from './config';
import styles from './styles';
import BuymoreTourSeats from '../../../../../../../../../../../../../../../smartComponents/Subscription/BuymoreTourSeats';
import JText from '../../../../../../../../../../../../../../../components/JText';

export class ParticipantMenuButton extends PureComponent {
  handleClick = () =>
    this.props.resaga.setValue({
      peopleFilterSelected: PEOPLE_FILTERS.PARTICIPANTS,
      peopleTabOptionSelected: PEOPLE_TAB_OPTIONS.ALL_PARTICIPANTS,
    });

  buyMoreView = () => {
    if (this.props.canInvite && this.props.orgId) {
      return <BuymoreTourSeats templateId={this.props.tid} />;
    }
    return null;
  };

  // eslint-disable-next-line no-unused-vars
  renderContent = (content, props) => {
    const { peopleFilterSelected, isMobile, classes, paxLabel } = this.props;
    if (!content) return null;

    const color = LOGIC_HELPERS.ifElse(
      peopleFilterSelected === PEOPLE_FILTERS.PARTICIPANTS,
      'black',
      'gray',
    );
    const filters = (
      <Margin left="md" top="sm" bottom="sm">
        <GridContainer direction="column">{content}</GridContainer>
      </Margin>
    );

    return (
      <GridItem
        xs={LOGIC_HELPERS.ifElse(isMobile, 4, 12)}
        className={isMobile && classes.smGrid}
      >
        <div>
          <GridContainer direction="column">
            <GridItem>
              <Hidden smDown>
                <GridContainer justify="space-between" alignitems="flex-end">
                  <GridItem>
                    <JText gray bold halfPaddingLeft md>
                      {paxLabel}
                    </JText>
                  </GridItem>
                  <GridItem>{this.buyMoreView()}</GridItem>
                </GridContainer>
              </Hidden>
              <Hidden mdUp>
                <Button
                  variant={VARIANTS.INLINE}
                  size="xs"
                  dense
                  onClick={this.handleClick}
                  className={classes.btn}
                >
                  <P dense weight="bold" color={color}>
                    {paxLabel}
                  </P>
                </Button>
              </Hidden>
            </GridItem>
            <Hidden smDown>
              <Hr noMarginBottom halfMarginTop />
            </Hidden>
          </GridContainer>
        </div>
        <Hidden smDown>{filters}</Hidden>
      </GridItem>
    );
  };

  render = () => {
    const { templateId } = this.props;
    return (
      <React.Fragment>
        <ParticipantList variant={VARIANTS.LOGIC} />
        <Filters templateId={templateId}>{this.renderContent}</Filters>
      </React.Fragment>
    );
  };
}

ParticipantMenuButton.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,

  // parent props
  isMobile: PropTypes.bool,
  orgId: PropTypes.number,

  // resaga props
  templateId: PropTypes.number,
  peopleFilterSelected: PropTypes.string,
  paxLabel: PropTypes.string,
  canInvite: PropTypes.bool,
  tid: PropTypes.number,
};

ParticipantMenuButton.defaultProps = {
  templateId: 0,
  isMobile: false,
  canInvite: false,
  tid: 0,
};

export default compose(
  withStyles(styles, { name: 'ParticipantMenuButton' }),
  resaga(CONFIG_0),
  resaga(CONFIG),
)(ParticipantMenuButton);
