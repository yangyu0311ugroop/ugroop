import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CoolTheme from 'theme/coolTheme';
import { withKnobs } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import sb from 'utils/helpers/storybook';
import TableWithHOC, {
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableHeader,
  TableHeadCell,
} from './index';

const stories = sb.viewComponentsStoriesOf('Table');
stories.addDecorator(withKnobs);

stories.add(
  'Basic Usage',
  withInfo({
    text:
      'This is the basic usage of the component' +
      'Note: just remove withStyles function and that is how you will use the component',
    inline: false,
    propTables: [Table],
    propTablesExclude: [TableWithHOC],
  })(() => (
    <MuiThemeProvider theme={CoolTheme}>
      <TableWithHOC>
        <TableHeader>
          <TableRow>
            <TableHeadCell>First</TableHeadCell>
            <TableHeadCell>Second</TableHeadCell>
            <TableHeadCell>Third</TableHeadCell>
            <TableHeadCell>Fourth</TableHeadCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>1st Column</TableCell>
            <TableCell>2nd Column</TableCell>
            <TableCell>3rd Column</TableCell>
            <TableCell>4th Column</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>1st Column</TableCell>
            <TableCell>2nd Column</TableCell>
            <TableCell>3rd Column</TableCell>
            <TableCell>4th Column</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>1st Column</TableCell>
            <TableCell>2nd Column</TableCell>
            <TableCell>3rd Column</TableCell>
            <TableCell>4th Column</TableCell>
          </TableRow>
        </TableBody>
      </TableWithHOC>
    </MuiThemeProvider>
  )),
);
