import { DO_NOTHING_FUNC } from 'appConstants';
import { withStyles } from '@material-ui/core/styles';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { LoadingText } from 'ugcomponents/Progress';
import ContentWrapper from './wrapper';
import { CONFIG } from './config';
import styles from './styles';

export class Content extends PureComponent {
  renderEmpty = () => {
    const { classes } = this.props;

    return (
      <div>
        <div className={classes.empty}>No new notifications right now...</div>
      </div>
    );
  };

  renderContentWrapper = ({ id, previousId, isFirst }) => {
    const { onClose } = this.props;
    return (
      <GridContainer spacing={0} direction="column">
        <ContentWrapper
          id={id}
          previousId={previousId}
          first={isFirst}
          onClose={onClose}
        />
      </GridContainer>
    );
  };

  renderItem = arrayIds => (id, index) => {
    let previousId;

    if (index) {
      previousId = get(arrayIds, index - 1);
    }
    const isFirst = index === 0;
    const isLast = index === arrayIds.length - 1;
    return (
      <GridItem key={id}>
        {this.renderContentWrapper({ id, previousId, isFirst, isLast })}
      </GridItem>
    );
  };

  renderContent = array => {
    if (!array.length) {
      return this.renderEmpty();
    }
    return array.map(this.renderItem(array));
  };

  render = () => {
    const { fetching, ugroopIds } = this.props;

    if (fetching) {
      return <LoadingText />;
    }
    return (
      <GridContainer direction="column" spacing={0}>
        {this.renderContent(ugroopIds)}
      </GridContainer>
    );
  };
}

Content.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  onClose: PropTypes.func,

  // resaga props
  ugroopIds: PropTypes.array,
  fetching: PropTypes.bool,
};

Content.defaultProps = {
  ugroopIds: [],
  onClose: DO_NOTHING_FUNC,
};

export default compose(
  withStyles(styles, { name: 'Content' }),
  resaga(CONFIG),
)(Content);
