import React, { Component } from 'react';
import AddProduct from './AddProduct';
import ProductDetails from './ProductDetails';
import http from './AppConfig';
import EditProduct from './EditProduct';
import Dialog from 'react-bootstrap-dialog';

//declare api-end points to be used in the application
const _ = require('lodash');
const CATEGORIES_ENDPOINT = '/productCategories';
const PRODUCTS_ENDPOINT = '/products';
const SKU_ENDPOINT = '/sku';
const ATTRIBUTES_ENDPOINT = '/productAttributes';
//this is the main parent component
class Nav extends Component {
  constructor(props) {
    super(props);
    //set states
    this.state = {
      categories: [],
      products: [],
      skus: [],
      attributes: [],
      selectedCategoryId: null,
      showEdit: false,
      showAdd: false,
      showProductDetails: false,
      error: null,
      response: {},
      productData: {},
      attributesData: [],
      isAddProduct: false,
      isEditProduct: false,
    };
    //bind functions
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onSelectCategory = this.onSelectCategory.bind(this);
    this.showAddModal = this.showAddModal.bind(this);
    this.showEditModal = this.showEditModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.editProduct = this.editProduct.bind(this);
    this.deleteProductDialog = this.deleteProductDialog.bind(this);
    this.productDetails = this.productDetails.bind(this);
    this.loadData = this.loadData.bind(this);
  }
  //call backend api to load data
  loadData() {
    //load categories
    http
      .get(CATEGORIES_ENDPOINT)
      .then((response) => response.data)
      .then(
        (result) => {
          this.setState({
            categories: result,
          });
        },
        (error) => {
          this.setState({ error });
        },
      );
    //load products
    http
      .get(PRODUCTS_ENDPOINT)
      .then((response) => response.data)
      .then(
        (result) => {
          this.setState({
            products: result,
          });
        },
        (error) => {
          this.setState({ error });
        },
      );
    //load SKUs
    http
      .get(SKU_ENDPOINT)
      .then((response) => response.data)
      .then(
        (result) => {
          this.setState({
            skus: result,
          });
        },
        (error) => {
          this.setState({ error });
        },
      );
    //load attributes
    http
      .get(ATTRIBUTES_ENDPOINT)
      .then((response) => response.data)
      .then(
        (result) => {
          this.setState({
            attributes: result,
          });
        },
        (error) => {
          this.setState({ error });
        },
      );
  }
  componentWillMount() {
    //load data
    this.loadData();
  }
  //handles data on submit for save and edit
  onFormSubmit(data) {
    const { products } = this.state;
    //check if submit action is save or edit
    if (this.state.isEditProduct) {
      //edit action
      this.dialog.show({
        body: 'Edit product?',
        actions: [
          Dialog.CancelAction(() => {}),
          Dialog.OKAction(() => {
            this.setState({
              isAddProduct: false,
              isEditProduct: false,
            });

            http.put('/products/' + data.Id, data).then((result) => {
              this.setState({
                response: result,
                isAddProduct: false,
                isEditProduct: false,
              });
            });
            this.loadData();
          }),
        ],
      });
    } else {
      //add action
      this.dialog.show({
        body: 'Add product?',
        actions: [
          Dialog.CancelAction(() => {}),
          Dialog.OKAction(() => {
            this.setState({
              isAddProduct: false,
              isEditProduct: false,
            });
            http.post('/products', data).then((result) => {
              this.setState({
                response: result,
                isAddProduct: false,
                isEditProduct: false,
              });
            });
            this.loadData();
          }),
        ],
      });
    }
  }

  editProduct(Id) {
    //prepopulate edit form
    http
      .get('/productsById/' + Id)
      .then((response) => response.data)
      .then(
        (result) => {
          this.setState({
            productData: result,
          });
        },
        (error) => {
          this.setState({ error });
        },
      );
  }
  //loads categories on click
  onSelectCategory(Id) {
    this.setState({
      selectedCategoryId: Id,
    });
  }
  //loads add product form
  showAddModal() {
    this.setState({ showAdd: true, isAddProduct: true });
  }
  //loads product edit form
  showEditModal(Id) {
    this.setState({
      showEdit: true,
      isEditProduct: true,
    });

    this.editProduct(Id);
  }
  //loads product details form
  productDetails(Id) {
    this.setState({
      showProductDetails: true,
    });
    //loads attributes
    http
      .get('/attributesData/' + Id)
      .then((response) => response.data)
      .then(
        (result) => {
          this.setState({
            attributesData: result,
          });
        },
        (error) => {
          this.setState({ error });
        },
      );
    this.editProduct(Id);
  }
  //deletes product
  deleteProductDialog(Id) {
    const { products } = this.state;
    this.dialog.show({
      body: 'Delete product?',
      actions: [
        Dialog.CancelAction(() => {}),
        Dialog.OKAction(() => {
          http.delete('/products/' + Id).then((result) => {
            this.setState({
              response: result,
              products: products.filter((prod) => prod.ProductId !== Id),
            });
          });
        }),
      ],
    });
  }
  //unloads/hides modal component
  hideModal() {
    this.setState({
      showAdd: false,
      showEdit: false,
      showProductDetails: false,
    });
  }
  //render this main component
  render() {
    const {
      attributes,
      skus,
      categories,
      products,
      selectedCategoryId,
      showAdd,
      showEdit,
      productData,
      attributesData,
      showProductDetails,
    } = this.state;
    //load first category if none is selected
    const defaultCategory = _.first(categories);
    //load selected category
    const selectedCategory =
      _.find(categories, (i) => i.Id === selectedCategoryId) || defaultCategory;
    return (
      <div>
        <div className="header"></div>
        <div className="topnav"></div>
        <br />

        <div className="row">
          <div className="col-sm-3">
            <CategoryFilter
              categories={categories}
              onSelectCategory={this.onSelectCategory}
            />
          </div>

          <div className="col-sm-9">
            <ProductList
              products={products}
              selectedCategory={selectedCategory}
              showEditModal={this.showEditModal}
              deleteProductDialog={this.deleteProductDialog}
              productDetails={this.productDetails}
              defaultCategory={defaultCategory}
            />

            <AddProduct
              showAdd={showAdd}
              handleClose={this.hideModal}
              categories={categories}
              skus={skus}
              attributes={attributes}
              products={products}
              onFormSubmit={this.onFormSubmit}
            ></AddProduct>
            <EditProduct
              showEdit={showEdit}
              handleClose={this.hideModal}
              categories={categories}
              skus={skus}
              attributes={attributes}
              products={products}
              productData={productData}
              attributesData={attributesData}
              onFormSubmit={this.onFormSubmit}
            ></EditProduct>
            <ProductDetails
              showProductDetails={showProductDetails}
              handleClose={this.hideModal}
              productData={productData}
              attributesData={attributesData}
            ></ProductDetails>

            <Dialog
              ref={(component) => {
                this.dialog = component;
              }}
            />
            <button
              className="btn btn-primary btn-sm"
              onClick={this.showAddModal}
            >
              Add Product
            </button>
          </div>
          <div className="row:after">
            <div className="footer"></div>
          </div>
        </div>
      </div>
    );
  }
}
/**Category Component */
var CategoryFilter = ({ categories, onSelectCategory }) => {
  const links = categories.map((i) => (
    <div key={i.Id}>
      <button
        className="btn btn-secondary btn-block"
        onClick={() => onSelectCategory(i.Id)}
      >
        {i.CategoryName}
      </button>
      <br />
    </div>
  ));
  return <div>{links}</div>;
};
/*** Product component */
var ProductList = ({
  products,
  selectedCategory,
  showEditModal,
  deleteProductDialog,
  productDetails,
  defaultCategory,
}) => {
  var count = 1;
  //filter current products on selection of category
  const currentProducts = products
    .filter((i) => i.CategoryId === (selectedCategory.Id || defaultCategory.Id))
    .map((i) => (
      <tr key={i.ProductId}>
        <td>{count++}</td>
        <td>{i.ProductName}</td>
        <td>{i.CategoryName}</td>
        <td>{i.SkuName}</td>
        <td>{i.Price}</td>

        <td>
          <button
            className="btn btn-info py-0 btn-sm"
            onClick={() => showEditModal(i.ProductId)}
          >
            Edit
          </button>
          |
          <button
            className="btn btn-primary py-0 btn-sm"
            onClick={() => productDetails(i.ProductId)}
          >
            Details
          </button>
          |
          <button
            className="btn btn-danger py-0 btn-sm"
            onClick={() => deleteProductDialog(i.ProductId)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  return (
    <div>
      <table className="table table-striped table-sm table-success table-bordered">
        <tbody>
          <tr>
            <th></th>
            <th>Product Name</th>
            <th>Category Name</th>
            <th>SKU</th>
            <th>Price</th>

            <th></th>
          </tr>
          {currentProducts}
        </tbody>
      </table>
    </div>
  );
};

export default Nav;
