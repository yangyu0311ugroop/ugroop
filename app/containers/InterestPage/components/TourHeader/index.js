import { withStyles } from '@material-ui/core/styles';
import GridContainer from 'components/GridContainer/index';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import resaga from 'resaga';
import { CONFIG } from './config';
import styles from './styles';

export class TourHeader extends PureComponent {
  renderHelmet = () => {
    const { title } = this.props;
    return (
      <Helmet
        title={title}
        meta={[{ name: 'description', content: 'Interest Page' }]}
      />
    );
  };

  render() {
    return (
      <GridContainer spacing={0} direction="column">
        {this.renderHelmet()}
      </GridContainer>
    );
  }
}

TourHeader.propTypes = {
  // hoc props
  // classes: PropTypes.object.isRequired,

  // resaga props
  title: PropTypes.string,
};

TourHeader.defaultProps = {
  title: '',
};

export default compose(
  withStyles(styles, { name: 'TourHeader' }),
  resaga(CONFIG),
)(TourHeader);
