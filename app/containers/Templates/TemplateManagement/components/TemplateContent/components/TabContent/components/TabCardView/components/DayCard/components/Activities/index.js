import FlexContainer from 'components/GridContainer/index';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';

import FlexItem from 'components/GridItem';
import Heading from 'smartComponents/Node/parts/Heading';
import Activity from './components/Activity';
import { CONFIG } from './config';
import styles from './styles';

export class Activities extends PureComponent {
  renderActivities = () => {
    const { sections, classes } = this.props;

    return sections.map((id, index) => (
      <FlexContainer spacing={0} direction="column">
        <Heading
          id={id}
          first={index === 0}
          component={FlexItem}
          cardFormStyle={classes.subHeaderCard}
          // noHeading={type !== TAB_OTHER}
        />
        <FlexItem>
          <Activity
            id={id}
            key={id}
            lastItem={index === sections.length - 1}
            isLazyLoad={this.props.isLazyLoad}
          />
        </FlexItem>
      </FlexContainer>
    ));
  };

  render = () => {
    const { classes, sections } = this.props;

    if (sections.length < 1) {
      return null;
    }

    return (
      <FlexContainer spacing={0} direction="column" className={classes.root}>
        <div className={classes.activityContainer}>
          {this.renderActivities()}
        </div>
      </FlexContainer>
    );
  };
}

Activities.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  isLazyLoad: PropTypes.bool,
  // resaga props
  sections: PropTypes.array,
};

Activities.defaultProps = {
  sections: [],
};

export default compose(
  withStyles(styles, { name: 'Activities' }),
  resaga(CONFIG),
)(Activities);
