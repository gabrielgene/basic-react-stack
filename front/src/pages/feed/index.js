import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import Topbar from '../../components/topbar';
import DocumentCard from './card';
import API from '../../api';

const styles = theme => ({
  content: {
    marginTop: theme.spacing.unit * 3,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing.unit * 2,
  },
});

class Feed extends React.Component {
  state = {
    loading: true,
    documents: [],
  };

  componentDidMount() {
    API.get('/documents').then(res => {
      this.setState({ loading: false, documents: res.data });
    });
  }

  renderDocuments = () => {
    return this.state.documents.map(d => <DocumentCard key={d._id} {...d} />);
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Topbar title="Feed" exit />
        <div className={classes.content}>
          {this.state.loading ? (
            <CircularProgress className={classes.progress} color="secondary" />
          ) : (
            this.renderDocuments()
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Feed);
