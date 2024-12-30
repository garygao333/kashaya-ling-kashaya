import React from 'react';
import { Container, Typography, Hidden, Grid, Button, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Footer from './Footer';

const useStyles = makeStyles((theme) => ({
  root: {
    background: 'linear-gradient(180deg, #e8f5e9 0%, #ffffff 100%)',
    minHeight: '100vh',
    paddingBottom: theme.spacing(4)
  },
  container: {
    paddingTop: 80,
  },
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing(4),
    color: '#2e7d32', // dark green
  },
  subtitle: {
    textAlign: 'center',
    color: '#43a047', // medium green
    marginBottom: theme.spacing(6)
  },
  section: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(4),
    borderRadius: 24,
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    background: '#ffffff',
  },
  sectionTitle: {
    color: '#2e7d32',
    textAlign: 'center',
    marginBottom: theme.spacing(3)
  },
  button: {
    borderRadius: 50,
    padding: '12px 24px',
    textTransform: 'none',
    fontSize: '1rem',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    minWidth: 160,
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 15px rgba(0, 0, 0, 0.15)',
    }
  },
  primaryButton: {
    background: '#4caf50',
    '&:hover': {
      background: '#43a047',
    }
  },
  secondaryButton: {
    background: '#66bb6a',
    '&:hover': {
      background: '#5cad60',
    }
  },
  gridContainer: {
    justifyContent: 'center'
  }
}));

function Home() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="md" className={classes.container}>
        <div className={classes.title}>
          <Hidden xsDown>
            <Typography variant="h3" component="h1" gutterBottom>
              Kashaya Online
            </Typography>
          </Hidden>
          <Hidden smUp>
            <Typography variant="h4" component="h1" gutterBottom>
              Kashaya Online
            </Typography>
          </Hidden>
        </div>

        {/* Learn Section */}
        <Paper className={classes.section}>
          <Typography variant="h5" className={classes.sectionTitle}>
            Learn
          </Typography>
          <Grid container spacing={3} className={classes.gridContainer}>
            <Grid item>
              <Button
                variant="contained"
                href="#/imgwords"
                className={`${classes.button} ${classes.primaryButton}`}
              >
                Words with Pictures
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                href="#/allwords"
                className={`${classes.button} ${classes.primaryButton}`}
              >
                All Words
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                href="#/sentences"
                className={`${classes.button} ${classes.primaryButton}`}
              >
                Sentences
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                href="#/stories"
                className={`${classes.button} ${classes.primaryButton}`}
              >
                Stories
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Resources Section */}
        <Paper className={classes.section}>
          <Typography variant="h5" className={classes.sectionTitle}>
            Resources
          </Typography>
          <Grid container spacing={3} className={classes.gridContainer}>
            <Grid item>
              <Button
                variant="contained"
                href="https://www.ling.upenn.edu/~gene/Kashaya/grammar/index.html"
                className={`${classes.button} ${classes.primaryButton}`}
              >
                Grammar
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                href="https://www.ling.upenn.edu/~gene/Kashaya/Vocabulary/sounds.html"
                className={`${classes.button} ${classes.primaryButton}`}
              >
                Pronunciation
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                href="https://www.webonary.org/kashaya/"
                className={`${classes.button} ${classes.primaryButton}`}
              >
                Dictionary
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Help Section */}
        <Paper className={classes.section}>
          <Typography variant="h5" className={classes.sectionTitle}>
            Help
          </Typography>
          <Grid container spacing={3} className={classes.gridContainer}>
            <Grid item>
              <Button
                variant="contained"
                href="#/about"
                className={`${classes.button} ${classes.secondaryButton}`}
              >
                About
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                href="#/how"
                className={`${classes.button} ${classes.secondaryButton}`}
              >
                How to Use
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
      <Footer />
    </div>
  );
}

export default Home;