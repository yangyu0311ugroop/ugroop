import Container from 'components/Container';
import { withStyles } from 'components/material-ui';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { compose } from 'redux';
import resaga from 'resaga';
import ComingSoon from 'components/ComingSoon';
import classnames from 'classnames';
import LeftSideBar from 'containers/Templates/OrganisationTemplates/components/LeftSideBar';
import { withRouter } from 'react-router-dom';
import { CONFIG, CONFIG_ORGANISATION_ID } from './config';
import styles from './styles';

export class SharedTours extends PureComponent {
  render = () => {
    const { classes, rootNodeId, id } = this.props;

    return (
      <Container>
        <GridContainer direction="column" className={classes.root} spacing={0}>
          <GridItem>
            <GridContainer spacing={0} className={classes.body}>
              <GridItem className={classes.leftSideBar}>
                <LeftSideBar organisationId={id} id={rootNodeId} />
              </GridItem>
              <GridItem className={classnames(classes.grow)}>
                <ComingSoon />
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </Container>
    );
  };
}

SharedTours.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props

  // resaga props
  id: PropTypes.number,
  rootNodeId: PropTypes.number,
};

SharedTours.defaultProps = {
  rootNodeId: 0,
};

export default compose(
  withStyles(styles, { name: 'SharedTours' }),
  resaga(CONFIG_ORGANISATION_ID),
  resaga(CONFIG),
  withRouter,
)(SharedTours);
