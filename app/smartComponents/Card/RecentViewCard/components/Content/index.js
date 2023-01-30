import { withStyles } from '@material-ui/core/styles';
import GridContainer from 'components/GridContainer';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { LoadingText } from 'ugcomponents/Progress';
import RecentItem from './components/RecentItem';
import { CONFIG } from './config';
import styles from './styles';

export class Content extends PureComponent {
  renderEmpty = () => {
    const { classes } = this.props;

    return (
      <div>
        <div className={classes.empty}>Nothing to see yet</div>
      </div>
    );
  };

  renderContent = array => {
    if (!array.length) {
      return this.renderEmpty();
    }
    return array.map(id => <RecentItem id={id} />);
  };

  render = () => {
    const { fetching, ids } = this.props;

    if (fetching) {
      return <LoadingText />;
    }
    return (
      <GridContainer direction="column" spacing={0}>
        {this.renderContent(ids)}
      </GridContainer>
    );
  };
}

Content.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // resaga props
  ids: PropTypes.array,
  fetching: PropTypes.bool,
};

Content.defaultProps = {
  ids: [],
};

export default compose(
  withStyles(styles, { name: 'Content' }),
  resaga(CONFIG),
)(Content);
