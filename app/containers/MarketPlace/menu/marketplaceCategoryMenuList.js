import ListItem from '@material-ui/core/ListItem';
import classNames from 'classnames';
import { compose } from 'redux';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '../../../components/material-ui';
import { styles } from '../style';
import { parseQueryParam } from '../../../utils/helpers/url';
import { Span } from '../../../viewComponents/Typography';
import { convertCategoryName } from '../utils/categoryNameConvert';

const useStyles = makeStyles(styles);
function MarketPlaceCategoryMenuList(props) {
  const classes = useStyles();
  const [mouseIn, setMouseIn] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (props.location.pathname === '/marketplace') {
      if (props.location.search !== '') {
        const parsedQuery = parseQueryParam(props.location.search);
        if (parsedQuery.category === props.name) {
          setActive(true);
        } else {
          setActive(false);
        }
      } else {
        setActive(false);
      }
    }
  }, [props.location]);

  const onClickListItem = name => () => {
    props.history.push(`/marketplace?category=${name}`);
  };

  const isMouseIn = () => {
    if (mouseIn && !active) {
      return true;
    }
    return false;
  };

  const handleMouseOver = () => {
    setMouseIn(true);
  };

  const handleMouseOut = () => {
    setMouseIn(false);
  };
  return (
    <ListItem
      key={props.name}
      onMouseEnter={handleMouseOver}
      onMouseLeave={handleMouseOut}
      className={classNames(
        classes.listItemStyle,
        active ? classes.active : null,
        isMouseIn() ? classes.hoverOver : null,
      )}
      onClick={onClickListItem(props.name)}
      data-testid={`category-${props.name}`}
    >
      <Span
        className={classNames(
          classes.listItemText,
          active ? classes.activeText : null,
        )}
      >
        {convertCategoryName(props.name)}
      </Span>
    </ListItem>
  );
}

MarketPlaceCategoryMenuList.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
  name: PropTypes.string /* category name */,
};

export default compose(withRouter)(React.memo(MarketPlaceCategoryMenuList));
