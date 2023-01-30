import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import Hr from 'components/Hr';
import { withStyles } from 'components/material-ui';
import ScrollToTopOnMount from 'containers/PersonalSettings/components/ScrollToTopOnMount';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import Dietaries from 'smartComponents/Person/parts/Dietaries';
import { CONFIG } from './config';
import styles from './styles';

export class DietaryRequirements extends PureComponent {
  render = () => {
    const { classes, personId } = this.props;

    return (
      <>
        <ScrollToTopOnMount />

        <div className={classes.offsetGrid}>
          <GridContainer
            direction="column"
            spacing={2}
            className={classes.root}
          >
            <GridItem>
              <Hr half />
            </GridItem>

            <GridItem>
              <GridContainer
                card
                highlight
                cardPadding={4}
                direction="column"
                spacing={0}
              >
                <GridItem>
                  <Dietaries id={personId} />
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
        </div>
      </>
    );
  };
}

DietaryRequirements.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  // resaga: PropTypes.object.isRequired,

  // parent props
  personId: PropTypes.number,

  // resaga props
};

DietaryRequirements.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'DietaryRequirements' }),
  resaga(CONFIG),
)(DietaryRequirements);
