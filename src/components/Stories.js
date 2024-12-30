import React, { useState, useRef } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Paper,
  IconButton,
  TableHead,
  TableRow,
  Button,
  Grid,
  Hidden,
} from '@material-ui/core';
import { makeStyles, fade } from '@material-ui/core/styles';
import LoopIcon from '@material-ui/icons/Loop';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import AppBar from './subcomponents/AppBar';
import storyData from '../static/result_stories.json';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: '100vh',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 80,
    paddingBottom: 40,
  },
  toolbarRoot: {
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
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
}));



/**---------------------------------
 * -------AllList Component--------
 * --------------------------------*/
export default function Stories() {
  const classes = useStyles();

  /**
   * Sorting table
   */
  // eslint-disable-next-line
  const [orderBy, setOrderBy] = useState('kashaya');

  const handleOrderByChange = () => {
    if (orderBy === 'english') {
      setOrderBy('kashaya');
    } else {
      setOrderBy('english');
    }
  };
  

  /**
   * Audio
   */
  const playWord = (speakerParam) => {
    new Audio(speakerParam).play();
    // audioMap[speaker].play();
  };

  /**
   * Select dropdown
   */
  const [textName, setTextName] = useState('');
  const [activeStory, setActiveStory] = useState({lines: []});
  
  const handleSelect = (event) => {
    setTextName(event.target.value);
    setActiveStory(storyData.find((story) => story.file === event.target.value))
  }

  /**
   * Render
   */
  return (
    <div className={classes.root}>
      <AppBar
        onChangeSearchInput={() => null}
        inputRef={useRef('')}
        handleOpenFilter={() => null}
        filtersCount={0}
        version="stories"
      />
      <Container maxWidth="lg" className={classes.container}>
        <FormControl>
          <InputLabel id='text-select-label'>Select text...</InputLabel>
          <Select
            labelId='text-select-label'
            id='text-select'
            value={textName}
            onChange={handleSelect}
          >
            {storyData.map((story) => (
              <MenuItem key={story.file} value={story.file}><b>{story.title}</b></MenuItem>
            ))}
          </Select>
          <FormHelperText>Name of Story</FormHelperText>
        </FormControl>
        {/* Table Container */}
        <div style={{padding: '15px 0px 15px 0px'}}>
          <Typography>{activeStory.note}</Typography>
        </div>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            {/* Table Head */}
            <TableHead>
              <TableRow>
                <TableCell align="left">
                  <Grid container direction="row">
                    <Typography>#</Typography>
                  </Grid>
                </TableCell>
                <TableCell align="left">
                  <Grid container direction="row">
                    {orderBy === 'english' ? (
                      <Typography style={{ paddingTop: 3 }}>
                        English Sentence
                      </Typography>
                    ) : (
                      <Typography style={{ paddingTop: 3 }}>
                        Kashaya Sentence
                      </Typography>
                    )}
                    <IconButton
                      size="small"
                      onClick={() => handleOrderByChange()}
                    >
                      <LoopIcon />
                    </IconButton>
                  </Grid>
                </TableCell>
                <Hidden xsDown>
                  <TableCell align="left">
                    <Typography>Listen</Typography>
                  </TableCell>
                </Hidden>
                {/* <TableCell style={{width: "30%"}}><Typography>Category</Typography></TableCell> */}
              </TableRow>
            </TableHead>
            {/* Table Body */}
            <TableBody>
              {activeStory.lines.map(
                (row) => (
                  <TableRow key={row.frame}>
                    <TableCell align="left">
                      <Typography>{row.frame}</Typography>
                    </TableCell>
                    <Hidden xsDown>
                      <TableCell align="left">
                        {orderBy === 'english' ? (
                          <div>
                            <Typography style={{ fontWeight: 700 }}>
                              {row.english}
                            </Typography>
                            <Typography>{row.source}</Typography>
                          </div>
                        ) : (
                          <div>
                            <Typography style={{ fontWeight: 700 }}>
                              {row.source}
                            </Typography>
                            <Typography>{row.english}</Typography>
                          </div>
                        )}
                      </TableCell>
                    </Hidden>
                    <Hidden smUp>
                      <TableCell align="left">
                        {orderBy === 'english' ? (
                          <div>
                            <Typography style={{ fontWeight: 700 }}>
                              {row.english}
                            </Typography>
                            <Typography>{row.source}</Typography>
                          </div>
                        ) : (
                          <div>
                            <Typography style={{ fontWeight: 700 }}>
                              {row.source}
                            </Typography>
                            <Typography>{row.english}</Typography>
                          </div>
                        )}
                        <Grid container direction="column">
                          {row.audio ? 
                            (<Button
                              style={{ marginBottom: 5, width: '20%' }}
                              key={row.audio}
                              size="small"
                              variant="contained"
                              color="primary"
                              onClick={() => playWord(row.audio)}
                            >
                              ▶
                            </Button>) :
                            false
                          }
                        </Grid>
                      </TableCell>
                    </Hidden>
                    {/* <TableCell align="right">{row.speaker}</TableCell> */}
                    <Hidden xsDown>
                      <TableCell align="left">
                        {/* <Player speakerPaths={row.speaker} /> */}
                        <Grid container direction="column">
                          {row.audio ? 
                            (<Button
                              style={{ marginBottom: 5, width: '20%' }}
                              key={row.audio}
                              size="small"
                              variant="contained"
                              color="primary"
                              onClick={() => playWord(row.audio)}
                            >
                              ▶
                            </Button>) :
                            false
                          }
                        </Grid>
                      </TableCell>
                    </Hidden>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      {/* </Container> */}
    </div>
  );
}
