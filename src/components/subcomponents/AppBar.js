import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  SwipeableDrawer,
  InputBase,
  Hidden,
  Badge,
  Drawer,
  Box,
  Link,
} from '@material-ui/core';
import { makeStyles, fade, withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import ImageIcon from '@material-ui/icons/Image';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import ShortTextIcon from '@material-ui/icons/ShortText';
import BookIcon from '@material-ui/icons/Book';
import InfoIcon from '@material-ui/icons/Info';
import LinkIcon from '@material-ui/icons/Link';
import HelpIcon from '@material-ui/icons/Help';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import SearchIcon from '@material-ui/icons/Search';
import FilterListIcon from '@material-ui/icons/FilterList';

const drawerWidth = 240;

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  sidenav: {
    paddingTop: 65,
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  search: {
    flex: '1 1 100%',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default function TopBar(props) {
  const {
    version,
    onChangeSearchInput,
    inputRef,
    handleOpenFilter,
    filtersCount,
  } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const toggleSideNav = () => {
    if (open) setOpen(false);
    else setOpen(true);
  };

  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div>
      {/* App Bar */}
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          {/* <IconButton edge="start" color="inherit" aria-label="home" href="/">
            <MenuIcon />
          </IconButton> */}
          <React.Fragment key="drawer">
            <IconButton edge="start" color="inherit" aria-label="home" onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor='left'
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
            >
              <Box
                style={{ width: 300 }}
                role="presentation"
                onClick={() => setDrawerOpen(false)}
                onKeyDown={() => setDrawerOpen(false)}
              >
                <List>
                  {[['Home', '#/', <HomeIcon />], 
                    ['Words With Images', '#/imgwords', <ImageIcon />],
                    ['All Words', '#/allwords', <ClearAllIcon />], 
                    ['Sentences', '#/sentences', <ShortTextIcon />],
                    ['Stories', '#/stories', <BookIcon />]].map((page, index) => (
                    <ListItem button component={Link} key={page[1]} href={page[1]} style={{color: '#000000'}}>
                      <ListItemIcon>
                        {page[2]}
                      </ListItemIcon>
                      <ListItemText primary={page[0]} />
                    </ListItem>
                  ))}
                </List>
                <Divider />
                <List>
                  {[['Grammar', 'https://www.ling.upenn.edu/~gene/Kashaya/grammar/index.html', <LinkIcon />],
                    ['Pronunciation', 'https://www.ling.upenn.edu/~gene/Kashaya/Vocabulary/sounds.html', <LinkIcon />],
                    ['Dictionary', 'https://www.webonary.org/kashaya/', <LinkIcon />]].map((page, index) => (
                    <ListItem button component={Link} key={page[1]} href={page[1]} style={{color: '#000000'}}>
                      <ListItemIcon>
                        {page[2]}
                      </ListItemIcon>
                      <ListItemText primary={page[0]} />
                    </ListItem>
                  ))}
                </List>
                <Divider />
                <List>
                  {[['About Kashaya', '#/about', <InfoIcon />],
                    ['Using This Website', '#/how', <HelpIcon />]].map((page, index) => (
                    <ListItem button component={Link} key={page[1]} href={page[1]} style={{color: '#000000'}}>
                      <ListItemIcon>
                        {page[2]}
                      </ListItemIcon>
                      <ListItemText primary={page[0]} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Drawer>
          </React.Fragment>

          <Hidden xsDown>
            {version === 'imgwords' ? (
              <Typography variant="h6" className={classes.title}>
                Words with Images
              </Typography>
            ) : version === 'allwords' ? (
              <Typography variant="h6" className={classes.title}>
                All Words
              </Typography>
            ) : version === 'sentences' ? (
              <Typography variant="h6" className={classes.title}>
                Sentences
              </Typography>
            ) : version === '/how' ? (
              <Typography variant="h6" className={classes.title}>
                How to use this website
              </Typography>
            ) : version === '/about' ? (
              <Typography variant="h6" className={classes.title}>
                About Kashaya
              </Typography>
            ) : (
              <div />
            )}
          </Hidden>
          <Hidden smUp>
            {version === '/how' ? (
              <Typography variant="h6" className={classes.title}>
                How to use this website
              </Typography>
            ) : version === '/about' ? (
              <Typography variant="h6" className={classes.title}>
                About Kashaya
              </Typography>
            ) : (
              <div />
            )}
            <Typography variant="h6" className={classes.title}>
              {' '}
            </Typography>
          </Hidden>
          {version === 'allwords' ||
          version === 'imgwords' ||
          version === 'sentences' ? (
            <div>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  onChange={onChangeSearchInput}
                  type="search"
                  placeholder="Search"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                  ref={inputRef}
                />
              </div>
            </div>
          ) : (
            <div />
          )}
          {version === 'allwords' ||
          version === 'imgwords' ||
          version === 'sentences' ? (
            <IconButton
              style={{ padding: 0, marginLeft: 15 }}
              aria-label="filter list"
              onClick={() => handleOpenFilter()}
            >
              {filtersCount === 0 || !filtersCount ? (
                <FilterListIcon />
              ) : (
                <StyledBadge badgeContent={filtersCount} color="secondary">
                  <FilterListIcon />
                </StyledBadge>
              )}
            </IconButton>
          ) : (
            <div />
          )}
        </Toolbar>
      </AppBar>
      {/* Side Nav */}
      <SwipeableDrawer
        classes={{ paper: classes.drawerPaper }}
        className={classes.drawer}
        anchor="left"
        open={open}
        onClose={() => toggleSideNav()}
        onOpen={() => toggleSideNav()}
      >
        <List className={classes.sidenav}>
          <Divider />
          <ListItem
            button
            component="a"
            href="#/all"
            onClick={() => toggleSideNav()}
          >
            <ListItemIcon>
              {' '}
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Vocab List 1" />
          </ListItem>
          <ListItem
            button
            component="a"
            href="#/all2"
            onClick={() => toggleSideNav()}
          >
            <ListItemIcon>
              {' '}
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Vocab List 2" />
          </ListItem>
        </List>
      </SwipeableDrawer>
    </div>
  );
}

TopBar.propTypes = {
  version: PropTypes.string.isRequired,
  onChangeSearchInput: PropTypes.func.isRequired,
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]).isRequired,
  handleOpenFilter: PropTypes.func.isRequired,
  filtersCount: PropTypes.number.isRequired,
};
