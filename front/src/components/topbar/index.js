import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ExitIcon from '@material-ui/icons/ExitToApp';
import BackIcon from '@material-ui/icons/ArrowBack';
import { Helmet } from 'react-helmet';

const styles = {
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -18,
    marginRight: 10,
  },
};

const Topbar = ({ classes, title, history, exit, back }) => {
  const handleExit = () => history.push('/');
  const handleBack = () => history.goBack();

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar variant="dense">
          {back && (
            <IconButton
              aria-owns="back-appbar"
              aria-haspopup="true"
              onClick={handleBack}
              color="inherit"
            >
              <BackIcon />
            </IconButton>
          )}
          <Typography className={classes.grow} variant="h6" color="inherit">
            {title}
          </Typography>
          {exit && (
            <IconButton
              aria-owns="exit-appbar"
              aria-haspopup="true"
              onClick={handleExit}
              color="inherit"
            >
              <ExitIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <Helmet title={title} />
    </div>
  );
};

export default withStyles(styles)(withRouter(Topbar));
