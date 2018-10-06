import React from 'react';
import ReactDOM from 'react-dom';

import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Icon from '@material-ui/core/Icon';

import { withStyles } from '@material-ui/core/styles';


const OPEN_DELAY = 250;

const styles = theme => ({
  absolute: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3,
  },
});

class Page extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <MenuList>
        <MenuItem title="Open the settings page for GTT Booster" onClick={() => {
          setTimeout(chrome.runtime.openOptionsPage, OPEN_DELAY);
        }}>
          <Icon>settings</Icon>
          <ListItemText classes={{ primary: classes.primary }} inset primary="Options" />
        </MenuItem>

        <span title="The Knowledge Base is down and currently not being maintained">
          <MenuItem disabled onClick={() => {
            setTimeout(() => chrome.tabs.create({ url: 'https://base.gtt-booster.com' }), OPEN_DELAY);
          }}>
            <Icon>info</Icon>
            <ListItemText classes={{ primary: classes.primary }} inset primary="Knowledge Base" />
          </MenuItem>
        </span>

        <MenuItem title="My LinkedIn profile" onClick={() => {
          setTimeout(() => chrome.tabs.create({ url: 'https://linkedin.com/in/eirikbirkeland/' }), OPEN_DELAY);
        }}>
          <Icon>contact_mail</Icon>
          <ListItemText classes={{ primary: classes.primary }} inset primary="Get in touch ☺" />
        </MenuItem>
      </MenuList>
    )
  }
}
const NewClass = withStyles(styles)(Page);

ReactDOM.render(<NewClass />, document.getElementById('root'));