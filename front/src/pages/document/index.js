import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

import Topbar from '../../components/topbar';
import DocumentCard from '../feed/card';
import API from '../../api';

const styles = theme => ({
  content: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing.unit * 2,
  },
});

class Document extends React.Component {
  state = {
    loading: true,
    document: {},
  };

  componentDidMount() {
    const { history, match } = this.props;
    const { id } = match.params;
    API.get(`/documents/${id}`)
      .then(res => {
        this.setState({ loading: false, document: res.data });
      })
      .catch(err => history.replace('/feed'));
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Topbar title="Document" back />
        <div className={classes.content}>
          {this.state.loading ? (
            <CircularProgress className={classes.progress} color="secondary" />
          ) : (
            <DocumentCard fullView {...this.state.document} />
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Document);
