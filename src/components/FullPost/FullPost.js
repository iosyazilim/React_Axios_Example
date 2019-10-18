import React, { Component } from 'react';
import axios from 'axios';
import './FullPost.css';

class FullPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getData: null
    };
  }

  componentDidUpdate() {
    if (this.props.id) {
      if (
        !this.state.getData ||
        (this.state.getData && this.state.getData.id !== this.props.id)
      ) {
        axios
          .get('https://jsonplaceholder.typicode.com/posts/' + this.props.id)
          .then(res => {
            this.setState({
              getData: res.data
            });
          });
      }
    }
  }

  deleteHandler = () => {
    axios
      .delete('https://jsonplaceholder.typicode.com/posts/' + this.props.id)
      .then(res => {
        console.log(res);
      });
  };

  render() {
    const { getData } = this.state;
    let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;
    if (this.props.id) {
      post = <p style={{ textAlign: 'center' }}>Loading...</p>;
    }
    if (this.state.getData) {
      post = (
        <div className='FullPost'>
          <h1>{getData.title}</h1>
          <p>{getData.body}</p>
          <div className='Edit'>
            <button className='Delete' onClick={this.deleteHandler}>
              Delete
            </button>
          </div>
        </div>
      );
    }

    return post;
  }
}

export default FullPost;
