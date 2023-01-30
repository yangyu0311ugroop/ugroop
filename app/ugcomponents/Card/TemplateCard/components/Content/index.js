import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import UGLink from 'components/Link';
import TextTruncate from 'react-text-truncate';
import H4 from 'components/H4';
import UGCardContent from 'ugcomponents/Card/UGCardContent';
import P from 'viewComponents/Typography';
import mHelper from 'utils/helpers/moment';
import { isEmptyString } from 'utils/stringAdditions';
import styles from './styles';

export const Content = ({
  classes,
  renderAdditionalContent,
  description,
  title,
  queryParam,
  baseUrl,
  customData,
}) => {
  let start = '';

  if (!isEmptyString(customData.startDate)) {
    start = mHelper.renderDate(customData.startDate);
  } else if (!isEmptyString(customData.weekDay)) {
    start = mHelper.getDay(customData.weekDay);
  }

  const startSection = !isEmptyString(start) ? (
    <div className={classes.startDateContainer}>
      <P weight="light" dense className={classes.startDate}>
        Start - {start}
      </P>
    </div>
  ) : (
    ''
  );

  return (
    <UGCardContent className={classes.templateContent}>
      <UGLink className={classes.ugcardLink} to={`${baseUrl}?${queryParam}`}>
        <H4 className={classes.ugCardItemTitle}>
          <TextTruncate lines={2} text={title} maxCalculateTimes={1} />
        </H4>
      </UGLink>
      {startSection}
      <div className={classes.templateItemBodyContainer}>
        <TextTruncate lines={4} text={description} maxCalculateTimes={1} />
      </div>
      {renderAdditionalContent}
    </UGCardContent>
  );
};

Content.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.node.isRequired,
  baseUrl: PropTypes.string.isRequired,

  renderAdditionalContent: PropTypes.node,
  queryParam: PropTypes.string,
  customData: PropTypes.object,
};

Content.defaultProps = {
  renderAdditionalContent: '',
  queryParam: '',
  customData: {},
};

export default withStyles(styles, { name: 'Content' })(Content);
