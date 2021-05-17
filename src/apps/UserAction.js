import http from './AppConfig';
import React, { Component } from 'react';
import { Container, Button } from 'react-bootstrap';
import AddProduct from './AddProduct';
import Nav from './Nav';
class UserAction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAddProduct: false,
      error: null,
      response: {},
      productData: {},
      isEditProduct: false,
      isProductDetails: true,
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
  }
  onCreate() {
    this.setState({ isAddProduct: true });
    this.setState({ isProductDetails: false });
  }
  onDetails() {
    this.setState({ isProductDetails: true });
    this.setState({ isAddProduct: false });
  }

  onFormSubmit(data) {
    this.setState({ isAddProduct: true });
    this.setState({ isProductDetails: false });
    if (this.state.isEditProduct) {
      http.put('products/' + data.Id, data).then((result) => {
        alert(result.data);
        this.setState({
          response: result,
          isAddProduct: false,
          isEditProduct: false,
        });
      });
    } else {
      http.post('products', data).then((result) => {
        alert(result.data);
        this.setState({
          response: result,
          isAddProduct: false,
          isEditProduct: false,
        });
      });
    }
  }

  editProduct = (Id) => {
    this.setState({ isProductDetails: false });
    http.get('products/' + Id).then(
      (result) => {
        this.setState({
          isEditProduct: true,
          isAddProduct: true,
          productData: result.data,
        });
      },
      (error) => {
        this.setState({ error });
      },
    );
  };

  render() {
    let productForm;
    if (this.state.isAddProduct || this.state.isEditProduct) {
      productForm = (
        <AddProduct
          onFormSubmit={this.onFormSubmit}
          product={this.state.productData}
        />
      );
    }
    return (
      <div className="App">
        <Container>
          <h1 style={{ textAlign: 'center' }}>CURD operation in React</h1>
          <hr></hr>
          {!this.state.isUserDetails && (
            <Button variant="primary" onClick={() => this.onDetails()}>
              {' '}
              User Details
            </Button>
          )}
          {!this.state.isAddUser && (
            <Button variant="primary" onClick={() => this.onCreate()}>
              Add User
            </Button>
          )}
          <br></br>
          {!this.state.isAddUser && <Nav editUser={this.editUser} />}
          {productForm}
        </Container>
      </div>
    );
  }
}
export default UserAction;
