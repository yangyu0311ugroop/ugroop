import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { FormattedMessage as M } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import Container from 'components/Container';
import KnownAs from 'smartComponents/Person/parts/KnownAs';
import ProfilePhoto from 'smartComponents/Person/parts/Photo';
import CreatedAt from 'smartComponents/Person/parts/CreatedAt';
import { VARIANTS } from 'variantsConstants';
import P from 'viewComponents/Typography';

import m from './messages';
import { CONFIG } from './config';
import styles from './styles';

export class Header extends PureComponent {
  render = () => {
    const { classes, userId } = this.props;

    return (
      <Container>
        <GridContainer spacing={0} className={classes.root}>
          <GridItem className={classes.grow}>
            <GridContainer spacing={0} direction="column">
              <GridItem>
                <KnownAs id={userId} />
              </GridItem>
              <GridItem>
                <P>
                  <CreatedAt
                    variant={VARIANTS.TEXT_WITH_LABEL_INLINE}
                    label={<M {...m.joinedLabel} />}
                    id={userId}
                  />
                </P>
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem>
            <ProfilePhoto id={userId} editable />
          </GridItem>
        </GridContainer>
      </Container>
    );
  };
}

Header.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  userId: PropTypes.number.isRequired,

  // resaga props
};

Header.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'Header' }),
  resaga(CONFIG),
)(Header);
