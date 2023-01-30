import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from '@material-ui/core/styles';
import { PERSON_PROFILE_VIEW_STORE } from 'containers/Profile/components/Person/constants';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { Helmet } from 'react-helmet';
import { PAGE_HELMETS } from 'appConstants';

// parts
import EditProfileForm from 'smartComponents/Person/components/EditProfileForm';
import PhoneList from 'smartComponents/Person/components/Phones';
import Medicals from 'smartComponents/Person/parts/Medicals';
import Dietaries from 'smartComponents/Person/parts/Dietaries';

// view
import Margin from 'viewComponents/Margin';
import { H3 } from 'viewComponents/Typography';

import ProfilePhoto from 'smartComponents/Person/parts/Photo';
import { CONFIG } from './config';
import styles from './styles';

export class Profile extends PureComponent {
  render = () => {
    const { classes, id, personId } = this.props;

    return (
      <GridContainer className={classes.root} card>
        <Helmet
          title={PAGE_HELMETS.PERSON_PROFILE}
          meta={[{ name: 'description', content: 'Description of Profile' }]}
        />
        <GridItem xs={12} md={5}>
          <Margin bottom="md">
            <H3 noMargin>Basic Information</H3>
          </Margin>
          <EditProfileForm id={id} />
        </GridItem>
        <GridItem xs={12} md={7}>
          <GridContainer direction="column" spacing={1}>
            <GridItem>
              <GridContainer
                direction="column"
                alignItems="center"
                className={classes.profileAvatar}
              >
                <GridItem>
                  <ProfilePhoto id={id} editable />
                </GridItem>
              </GridContainer>
            </GridItem>
            <GridItem>
              <PhoneList id={id} viewStore={PERSON_PROFILE_VIEW_STORE} />
            </GridItem>
            <GridItem>
              <Medicals id={personId} />
            </GridItem>
            <GridItem>
              <Dietaries id={personId} />
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  };
}

Profile.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number.isRequired,

  // resaga props
  personId: PropTypes.number.isRequired,
};

Profile.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'Profile' }),
  resaga(CONFIG),
)(Profile);
