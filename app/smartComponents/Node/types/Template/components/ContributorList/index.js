import GridContainer from 'components/GridContainer/index';
import { withStyles } from '@material-ui/core/styles';
import TextTruncate from 'react-text-truncate';
import resaga from 'resaga';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { FormattedMessage as M } from 'react-intl';
import { compose } from 'redux';
import classNames from 'classnames';
import { IMAGE_SIZES_CONSTANTS } from 'smartComponents/File/types/Photo/constants';
import AvatarById from 'ugcomponents/Person/AvatarById';
import { CONFIG } from './config';
import m from './messages';
import styles from './styles';

export class ContributorList extends PureComponent {
  renderAvatarText = () => {
    const { persons, firstPersonName, secondPersonName, classes } = this.props;
    let insideText = '';

    if (persons.length === 1) {
      insideText = firstPersonName;
    } else if (persons.length === 2) {
      insideText = (
        <M
          {...m.contributorsTwoPeople}
          values={{
            firstPerson: firstPersonName,
            secondPerson: secondPersonName,
          }}
        />
      );
    } else if (persons.length > 2) {
      insideText = (
        <M
          {...m.contributorsText}
          values={{ firstPerson: firstPersonName, excess: persons.length - 1 }}
        />
      );
    }

    return (
      <p className={classes.contributorText}>
        <TextTruncate line={1} maxCalculateTimes={1} text={insideText} />
      </p>
    );
  };

  renderAvatarMore = () => {
    const { persons, classes } = this.props;
    return persons.length > 3 ? (
      <AvatarById
        more={persons.length - 3}
        tooltipClass={classes.tooltip}
        rootClass={classNames(classes.avatar, classes.avatarBorder)}
        imgClass={classes.avatar}
      />
    ) : (
      <div />
    );
  };

  mapPersons = (person, index) => {
    const { classes } = this.props;
    if (index > 2) {
      return <span key={person} />;
    }

    return (
      <AvatarById
        imageSize={IMAGE_SIZES_CONSTANTS.XXS}
        key={person}
        tooltipClass={classes.tooltip}
        rootClass={classNames(classes.avatar, classes.avatarBorder)}
        imgClass={classes.avatar}
        userId={person}
        width={100}
      />
    );
  };

  renderAvatarList = () => {
    const { persons } = this.props;
    return persons.map(this.mapPersons);
  };

  render = () => {
    const { classes, persons } = this.props;

    if (!Array.isArray(persons)) {
      return <div />;
    }

    return (
      <GridContainer className={classes.root} spacing={0} alignItems="center">
        <div className={classes.avatarListContainer}>
          {this.renderAvatarList()}
          {this.renderAvatarMore()}
        </div>
        {this.renderAvatarText()}
      </GridContainer>
    );
  };
}

ContributorList.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props

  // resaga props
  persons: PropTypes.array,
  firstPersonName: PropTypes.string,
  secondPersonName: PropTypes.string,

  // resaga config props
  // eslint-disable-next-line
  dataStore: PropTypes.string.isRequired
};

ContributorList.defaultProps = {
  firstPersonName: '',
  secondPersonName: '',
  persons: [],
};

export default compose(
  withStyles(styles, { name: 'ContributorList' }),
  resaga(CONFIG),
)(ContributorList);
