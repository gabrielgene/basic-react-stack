import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import API from '../../api';

const styles = theme => ({
  card: {
    maxWidth: 400,
    marginTop: theme.spacing.unit * 3,
  },
  media: {
    cursor: 'pointer',
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class DocumentCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      upvote: props.upvote,
    };
  }

  handleClick = () => {
    this.props.history.push(`/document/${this.props._id}`);
  };

  handleLike = () => {
    API.post(`/documents/${this.props._id}`, { upvote: !this.state.upvote });
    this.setState(s => ({ upvote: !s.upvote }));
  };

  render() {
    const { classes, img, title, content, author } = this.props;
    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              {author.substring(0, 1)}
            </Avatar>
          }
          title={author}
        />
        <CardMedia
          onClick={this.handleClick}
          className={classes.media}
          image={img}
          title={title}
        />
        <CardContent>
          <Typography component="p">{`${content.substring(
            0,
            150,
          )}...`}</Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Add to favorites" onClick={this.handleLike}>
            {this.state.upvote ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(withRouter(DocumentCard));
