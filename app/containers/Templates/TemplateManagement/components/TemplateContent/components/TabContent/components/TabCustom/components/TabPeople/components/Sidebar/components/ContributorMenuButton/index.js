import { Hidden } from '@material-ui/core';
import { PEOPLE_FILTERS, PEOPLE_TAB_OPTIONS } from 'appConstants';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from '@material-ui/core/styles';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { VARIANTS } from 'variantsConstants';
import PropTypes from 'prop-types';
import Margin from 'viewComponents/Margin';
import P from 'viewComponents/Typography';
import Hr from 'components/Hr';
import Button from 'viewComponents/Button';

import Filters from './components/Filters';
import { CONFIG } from './config';
import styles from './styles';
import BuymoreContributorSeats from '../../../../../../../../../../../../../../../smartComponents/Subscription/BuymoreContributorSeats';
import JText from '../../../../../../../../../../../../../../../components/JText';

export class ContributorMenuButton extends PureComponent {
  handleClick = () =>
    this.props.resaga.setValue({
      peopleFilterSelected: PEOPLE_FILTERS.CONTRIBUTORS,
      peopleTabOptionSelected: PEOPLE_TAB_OPTIONS.ALL_CONTRIBUTORS,
    });

  buyMoreView = () => {
    if (this.props.canInvite && this.props.orgId) {
      return <BuymoreContributorSeats templateId={this.props.templateId} />;
    }
    return null;
  };

  render = () => {
    const { peopleFilterSelected, isMobile, classes } = this.props;
    const color = LOGIC_HELPERS.ifElse(
      peopleFilterSelected === PEOPLE_FILTERS.CONTRIBUTORS,
      'black',
      'gray',
    );
    return (
      <GridItem
        xs={LOGIC_HELPERS.ifElse(isMobile, 4, 12)}
        className={isMobile && classes.smGrid}
      >
        <div>
          <GridContainer direction="column">
            <GridItem xs={12}>
              <Hidden smDown>
                <GridContainer justify="space-between" alignitems="flex-end">
                  <GridItem>
                    <JText gray bold halfPaddingLeft md>
                      Contributors
                    </JText>
                  </GridItem>
                  <GridItem>{this.buyMoreView()}</GridItem>
                </GridContainer>
              </Hidden>
              <Hidden mdUp>
                <Button
                  onClick={this.handleClick}
                  variant={VARIANTS.INLINE}
                  size="xs"
                  dense
                  className={classes.btn}
                >
                  <P dense weight="bold" color={color}>
                    Contributors
                  </P>
                </Button>
              </Hidden>
              <Hidden smDown>
                <Hr noMarginBottom halfMarginTop />
              </Hidden>
            </GridItem>
          </GridContainer>
        </div>
        <Hidden smDown>
          <Margin left="md" bottom="sm" top="sm">
            <GridContainer direction="column">
              <Filters />
            </GridContainer>
          </Margin>
        </Hidden>
      </GridItem>
    );
  };
}

ContributorMenuButton.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  isMobile: PropTypes.bool,
  templateId: PropTypes.number,
  canInvite: PropTypes.bool,
  orgId: PropTypes.number,
  // parent props
  // resaga props
  peopleFilterSelected: PropTypes.string,
};

ContributorMenuButton.defaultProps = {
  isMobile: false,
};

export default compose(
  withStyles(styles, { name: 'ContributorMenuButton' }),
  resaga(CONFIG),
)(ContributorMenuButton);
