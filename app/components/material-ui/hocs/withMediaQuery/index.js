import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { LOGIC_HELPERS } from 'utils/helpers/logic';

export const withMediaQuery = (
  query,
  propName = 'mediaQueryMatched',
  // eslint-disable-next-line react/prop-types
) => Component => ({ smDown, ...props }) => {
  const mediaQuery = useMediaQuery(query);

  return (
    <Component
      {...{
        [propName]: LOGIC_HELPERS.ifElse(
          smDown !== undefined,
          smDown,
          mediaQuery,
        ),
      }}
      {...props}
    />
  );
};

export const mdDownQuery = theme => theme.breakpoints.down('md');

export const smDownQuery = theme => theme.breakpoints.down('sm');

export const xsDownQuery = theme => theme.breakpoints.down('xs');

export const withMDDown = withMediaQuery(mdDownQuery, 'mdDown');

export const withSMDown = withMediaQuery(smDownQuery, 'smDown');

export const withXSDown = withMediaQuery(xsDownQuery, 'xsDown');
