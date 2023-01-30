import React, { PureComponent } from 'react';
import { LINK } from 'appConstants';
import resaga from 'resaga';
import PropTypes from 'prop-types';
import Container from 'components/Container';
import { compose } from 'redux';
import { H2 } from 'viewComponents/Typography';
import { withStyles } from '@material-ui/core/styles';
import Location from 'ugcomponents/Inputs/Location';
import Url from 'smartComponents/Node/parts/URL';
import RichTextEditor from 'ugcomponents/RichTextEditor';
import { CONFIG } from './config';
import styles from './styles';

export class Day extends PureComponent {
  render = () => {
    const {
      classes,
      content,
      description,
      dayId,
      icon,
      location,
      placeId,
    } = this.props;
    let displayDescription;
    if (description) {
      displayDescription = (
        <RichTextEditor
          initContent={description}
          toolBarId={`dayToolBar${dayId}`}
          wrapperClassname={classes.dayDescription}
          readOnly
        />
      );
    }
    return (
      <Container>
        <H2 weight="bolder" dense className={classes.wordBreak}>
          {content}
        </H2>
        <Location icon={icon} location={location} placeId={placeId} />
        <Url
          variant={LINK}
          id={dayId}
          editable={false}
          viewingClassName={classes.urlStyles}
        />
        {displayDescription}
      </Container>
    );
  };
}

Day.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  dayId: PropTypes.number.isRequired,
  // resaga props
  icon: PropTypes.string,
  placeId: PropTypes.string,
  location: PropTypes.string,
  content: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

Day.defaultProps = {
  icon: '',
  placeId: '',
  location: '',
};

export default compose(
  withStyles(styles, { name: 'Day' }),
  resaga(CONFIG),
)(Day);
