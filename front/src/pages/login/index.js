import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import API from '../../api';

import { withStyles } from '@material-ui/core/styles';

import Topbar from '../../components/topbar';

const styles = theme => ({
  content: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing.unit * 2,
  },
  card: {
    minWidth: theme.spacing.unit * 45,
    marginTop: theme.spacing.unit * 6,
  },
  input: {
    marginTop: theme.spacing.unit * 3,
  },
  button: {
    margin: '32px 0',
  },
});

class Login extends React.Component {
  state = {
    user: '',
    pass: '',
  };
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit = async () => {
    const res = await API.post('/login', this.state);
    if (res.status === 200) {
      this.props.history.push('/feed');
    }
  };

  render() {
    const { user, pass } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <Topbar title="Login" />
        <div className={classes.content}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Login
              </Typography>
              <form noValidate autoComplete="off">
                <TextField
                  id="outlined-name"
                  label="Usuario"
                  value={user}
                  className={classes.input}
                  onChange={this.handleChange('user')}
                  fullWidth
                  variant="outlined"
                />
                <TextField
                  id="outlined-pass"
                  label="Senha"
                  value={pass}
                  className={classes.input}
                  onChange={this.handleChange('pass')}
                  fullWidth
                  type="password"
                  variant="outlined"
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={this.handleSubmit}
                  className={classes.button}
                >
                  Entrar
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Login);
