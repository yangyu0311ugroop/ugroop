/**
 * Created by paulcedrick on 6/16/17.
 */
import UGCard from 'ugcomponents/Card/index';
import PropTypes from 'prop-types';
import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import classnames from 'classnames';
import TemplateCardHeader from './components/Header';
import TemplateCardContent from './components/Content';
import TemplateCardFooter from './components/Footer';
import stylesheet from './styles';

export const TemplateCard = ({
  content,
  classes,
  isLoading,
  customData,
  rootClassName,
  cardImageUrl,
  showActions,
  templateQueryParam,
  baseUrl,
  renderAdditionalContent,
  renderActions,
}) => {
  let overflow = '';
  let loading = '';
  if (isLoading) {
    overflow = <div className={classes.templateOverride} />;
    loading = <CircularProgress className={classes.templateItemLoading} />;
  }

  const description = customData.shortDescription
    ? customData.shortDescription
        .trim()
        .split('\n')
        .map((line, i, arr) => {
          // since eslint throws error when I directly uses the index of the array
          // i reassigned it to a variable. I need the index since there's no
          // unique string I can assign for the key so I added the line plus
          // the index to make it somehow unique
          const stringLineIndex = i;
          const newLine = (
            <span key={`${line}-${stringLineIndex}`}>{line}</span>
          );
          if (i === arr.length - 1) {
            return newLine;
          }

          return (
            <span key={`${line}-${stringLineIndex}`}>
              {newLine} <br />
            </span>
          );
        })
    : '';

  const actions = showActions ? (
    <div className={classes.templateItemFooterActions}>{renderActions}</div>
  ) : (
    ''
  );

  const ilist = [{ url: cardImageUrl, key: 1 }];

  return (
    <Grid item xs={12} s={6} md={4} className={classnames(rootClassName)}>
      <div className={`${classes.templateItem}`}>
        {overflow}
        {loading}
        <UGCard withBorder={false}>
          <TemplateCardHeader images={ilist} />
          <TemplateCardContent
            baseUrl={baseUrl}
            description={description}
            queryParam={templateQueryParam}
            title={content}
            renderAdditionalContent={renderAdditionalContent}
            customData={customData}
          />
          <TemplateCardFooter customData={customData} renderActions={actions} />
        </UGCard>
      </div>
    </Grid>
  );
};

TemplateCard.propTypes = {
  content: PropTypes.node.isRequired,
  classes: PropTypes.object,
  isLoading: PropTypes.bool,
  customData: PropTypes.object.isRequired,
  rootClassName: PropTypes.string,
  cardImageUrl: PropTypes.string,
  showActions: PropTypes.bool,
  templateQueryParam: PropTypes.string,
  baseUrl: PropTypes.string,
  renderAdditionalContent: PropTypes.node,
  renderActions: PropTypes.node,
};

TemplateCard.defaultProps = {
  cardImageUrl: '',
  rootClassName: '',
  showActions: true,
  templateQueryParam: '',
  baseUrl: '',
  renderAdditionalContent: '',
  renderActions: '',
};

export default withStyles(stylesheet)(TemplateCard);
