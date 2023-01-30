import React, { PureComponent } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { CircularProgress } from '@material-ui/core';
import classnames from 'classnames';
import UGCard from 'ugcomponents/Card';

import FolderContent from './components/Content';
import Header from './components/Header';
import Footer from './components/Footer';
import styles from './styles';

export class FolderCard extends PureComponent {
  renderLoading = () => {
    const { classes } = this.props;
    return <CircularProgress className={classes.ugTemplateFolderLoading} />;
  };

  renderOverflow = () => {
    const { classes } = this.props;
    return <div className={classes.ugTemplateFolderOverride} />;
  };

  renderCard = () => {
    const {
      classes,
      id,
      content,
      baseUrl,
      isLoading,
      cardImageUrl,
      showActions,
      renderActions,
      templateQueryParam,
      folderCount,
      tourCount,
      templateIds,
      folderIds,
      tourContent,
      folderContent,
    } = this.props;

    const actions = showActions ? renderActions() : '';

    const ilist = [{ url: cardImageUrl, key: 1 }, { key: 2 }, { key: 3 }];

    const loading = isLoading ? this.renderLoading() : <div />;
    const overflow = isLoading ? this.renderOverflow() : <div />;

    return (
      <div className={classes.ugTemplateFolder}>
        {overflow}
        {loading}
        <UGCard withBorder={false}>
          <Header
            id={id}
            images={ilist}
            content={content}
            baseUrl={baseUrl}
            folderCount={folderCount}
            tourCount={tourCount}
          />
          <FolderContent
            itemBaseUrl={baseUrl}
            templateQueryParam={templateQueryParam}
            templateIds={templateIds}
            folderIds={folderIds}
            tourContent={tourContent}
            folderContent={folderContent}
          />
          <Footer
            actions={actions}
            subfolderCount={folderCount}
            tourCount={tourCount}
          />
        </UGCard>
      </div>
    );
  };

  render = () => {
    const { rootClassName } = this.props;
    return (
      <Grid item xs={12} md={4} className={classnames(rootClassName)}>
        {this.renderCard()}
      </Grid>
    );
  };
}

FolderCard.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent
  content: PropTypes.string,
  id: PropTypes.number.isRequired,
  baseUrl: PropTypes.string,
  isLoading: PropTypes.bool,
  rootClassName: PropTypes.string,
  cardImageUrl: PropTypes.string,
  showActions: PropTypes.bool,
  renderActions: PropTypes.func,
  templateQueryParam: PropTypes.string,
  folderCount: PropTypes.number,
  tourCount: PropTypes.number,
  templateIds: PropTypes.array,
  folderIds: PropTypes.array,
  tourContent: PropTypes.array,
  folderContent: PropTypes.array,
};

FolderCard.defaultProps = {
  content: '',
  rootClassName: '',
  cardImageUrl: '',
  showActions: true,
  renderActions: '',
  templateQueryParam: '',
};

export default withStyles(styles, { name: 'FolderCard' })(FolderCard);
