import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import Hr from 'components/Hr';
import { withStyles } from 'components/material-ui';
import ScrollToTopOnMount from 'containers/PersonalSettings/components/ScrollToTopOnMount';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import Medicals from 'smartComponents/Person/parts/Medicals';
import { CONFIG } from './config';
import styles from './styles';
import { PERSON_DATA_STORE } from '../../../../../../appConstants';

export class MedicalConditions extends PureComponent {
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
                  <Medicals id={personId} dataStore={PERSON_DATA_STORE} />
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
        </div>
      </>
    );
  };
}

MedicalConditions.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  // resaga: PropTypes.object.isRequired,

  // parent props
  personId: PropTypes.number,

  // resaga props
};

MedicalConditions.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'MedicalConditions' }),
  resaga(CONFIG),
)(MedicalConditions);
