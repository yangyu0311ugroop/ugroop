import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import Hr from 'components/Hr';
import JText from 'components/JText';
import { withStyles } from 'components/material-ui';
import ScrollToTopOnMount from 'containers/PersonalSettings/components/ScrollToTopOnMount';
import { PERSON_PROFILE_VIEW_STORE } from 'containers/Profile/components/Person/constants';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import PhoneList from 'smartComponents/Person/components/Phones';
import { CONFIG } from './config';
import styles from './styles';

export class Phones extends PureComponent {
  render = () => {
    const { classes, userId } = this.props;

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
              <JText gray nowrap={false}>
                Your number can be used to deliver important notifications, help
                you sign in, and more.
              </JText>
            </GridItem>

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
                  <GridContainer
                    direction="column"
                    spacing={3}
                    className={classes.formWidth}
                  >
                    <GridItem>
                      <JText bold gray sm uppercase>
                        Manage phone numbers
                      </JText>
                    </GridItem>

                    <GridItem>
                      <PhoneList
                        id={userId}
                        viewStore={PERSON_PROFILE_VIEW_STORE}
                      />
                    </GridItem>
                  </GridContainer>
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
        </div>
      </>
    );
  };
}

Phones.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  // resaga: PropTypes.object.isRequired,

  // parent props
  userId: PropTypes.number,

  // resaga props
};

Phones.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'Phones' }),
  resaga(CONFIG),
)(Phones);
