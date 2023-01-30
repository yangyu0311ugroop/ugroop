/**
 * Created by paulcedrick on 7/17/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { padFacadeURL } from 'utils/helpers/request';
import H4 from 'components/H4';
import UGImageItem from '../UGCardHeaderImage/UGImageItem/index';
import stylesheet from './style';

const NUMBER_OF_ITEMS_TO_DISPLAY = 3;

export const UGCardHeaderFolder = ({
  classes,
  imageList,
  children,
  tourCount,
  subfolderCount,
}) => {
  const itemCount = tourCount + subfolderCount;
  let hasImage = false;

  const imgList = imageList
    .slice(0, NUMBER_OF_ITEMS_TO_DISPLAY)
    .map((item, index) => {
      const computedWidthImg = index * 16;
      const zIndexImg = imageList.length - index;
      const imgContainerStyle = {
        left: 0,
        zIndex: zIndexImg,
        position: 'absolute',
      };
      const imgSpanStyle = {
        width: `calc(100% - ${computedWidthImg}px)`,
        height: '100%',
        display: 'inline-block',
      };
      const overlayWidth = {
        width: `calc(100% - ${computedWidthImg}px)`,
      };

      let img = null;
      const key = `index-${item.key}`;
      if (itemCount > 0) {
        if (item.url) {
          hasImage = true;
          img = (
            <UGImageItem
              imageUrl={`${padFacadeURL(item.url)}?width=500`}
              alt=""
              imgStyle={classes.ugCardHeaderFolderImg}
            />
          );
        } else {
          img = <span style={imgSpanStyle} />;
        }
      } else if (index === 0) {
        overlayWidth.opacity = 1;
      } else {
        overlayWidth.backgroundColor = '#F6F8FA';
      }

      return (
        <div
          key={`ug-card-folder-pic-${key}`}
          className={classnames(classes.ugCardHeaderFolderImg, 'cardAnimation')}
          style={imgContainerStyle}
        >
          <div style={overlayWidth} className={classes.ugCardHeaderOverlay} />
          {img}
        </div>
      );
    });
  return (
    <div className={classes.ugCardHeaderFolder}>
      <div
        className={classnames({
          [classes.ugCardFolderHeaderEmpty]: !hasImage,
          [classes.ugCardFolderHeader]: true,
        })}
      >
        <H4
          className={classnames({
            [classes.ugCardFolderTitleEmpty]: !hasImage,
            [classes.ugCardFolderTitle]: hasImage,
          })}
        >
          {children}
        </H4>
      </div>
      <div className={classes.ugCardFolderImgList}>{imgList}</div>
    </div>
  );
};

UGCardHeaderFolder.propTypes = {
  imageList: PropTypes.array,
  classes: PropTypes.object,
  children: PropTypes.node,
  tourCount: PropTypes.number,
  subfolderCount: PropTypes.number,
};

UGCardHeaderFolder.defaultProps = {
  imageList: [],
  children: '',
  tourCount: 0,
  subfolderCount: 0,
};

export default withStyles(stylesheet)(UGCardHeaderFolder);
