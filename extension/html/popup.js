import React from 'react';
import ReactDOM from 'react-dom';

import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Icon from '@material-ui/core/Icon';

import { withStyles } from '@material-ui/core/styles';


const OPEN_DELAY = 250; // for animations

const octocat = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>

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

        <MenuItem title="Report bugs and suggestions" onClick={() => {
          setTimeout(() => chrome.tabs.create({ url: 'https://github.com/eirikbirkeland/gttbooster' }), OPEN_DELAY);
        }}>
          <Icon>{octocat}</Icon>
          <ListItemText classes={{ primary: classes.primary }} inset primary="Report bugs and suggestions" />
        </MenuItem>
      </MenuList>
    )
  }
}
const NewClass = withStyles(styles)(Page);

ReactDOM.render(<NewClass />, document.getElementById('root'));