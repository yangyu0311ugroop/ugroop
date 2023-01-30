import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { FormattedMessage as M } from 'react-intl';
import { compose } from 'redux';
import resaga from 'resaga';
import { Helmet } from 'react-helmet';
import { PAGE_HELMETS } from 'appConstants';
import { H1 } from 'viewComponents/Typography';
import { CONFIG } from './config';
import m from './messages';
import styles from './styles';

export class Documents extends PureComponent {
  render = () => {
    const { classes } = this.props;

    return (
      <GridContainer className={classes.root} justify="center" card>
        <Helmet
          title={PAGE_HELMETS.DOCUMENTS}
          meta={[{ name: 'description', content: 'Description of Documents' }]}
        />
        <GridItem>
          <H1>
            <M {...m.sample} />
          </H1>
        </GridItem>
      </GridContainer>
    );
  };
}

Documents.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props

  // resaga props
};

Documents.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'Documents' }),
  resaga(CONFIG),
)(Documents);
