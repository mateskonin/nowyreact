import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class ArticleTableRow extends Component {
  constructor(props) {
    super(props);
    this.deleteArticle = this.deleteArticle.bind(this);
  }

  deleteArticle(e) {
    e.preventDefault();
    axios
      .delete(
        'http://localhost:5000/articles/delete-article/' + this.props.obj._id
      )
      .then((res) => {
        console.log('Deleted!');
      })
      .catch((error) => {
        console.log(error);
      });
    this.forceUpdate();
    window.location.reload();
  }

  render() {
    let sliceText = this.props.obj.content;
    return (
      <tr>
        <td>
          <Link to={'/read-panel/' + this.props.obj._id}>
            {this.props.obj.title}
          </Link>
        </td>
        <td>{this.props.obj.author}</td>
        <td>{sliceText.split(' ').slice(0, 6).join(' ')}</td>
        <td>
          <Link className='edit-link' to={'/edit-article/' + this.props.obj_id}>
            Edit
          </Link>
          <Button onClick={this.deleteArticle} size='sm' variant='danger'>
            Delete
          </Button>
        </td>
      </tr>
    );
  }
}
