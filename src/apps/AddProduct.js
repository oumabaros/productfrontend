import React, { Component } from 'react';
import './Modal.css';
export default class AddProduct extends Component {
  constructor(props) {
    super(props);
    //set states
    this.initialState = {
      ProductName: '',
      CategoryId: '',
      SkuId: '',
      Price: '',
    };
    //bind functions
    this.state = this.initialState;
    this.state = { checked: false, selectedAttrs: [] };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  //function to detect changes in input controls. if changed, then update state
  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value,
    });
  }
  componentDidMount() {}
  //executes submit form for save and edit
  handleSubmit(event) {
    event.preventDefault();
    this.props.onFormSubmit(this.state);
    this.setState(this.initialState);
  }
  //closes modal forms
  onClose = (e) => {
    this.props.handleClose && this.props.handleClose(e);
  };
  render() {
    //determines whether modal form(this component) is visible or not
    if (!this.props.showAdd) {
      return null;
    }
    //render this component
    return (
      <div className="mod">
        <div className="mod-content">
          <div className="mod-header">
            <h4 className="mod-title">Add Product</h4>
          </div>
          <div className="mod-body">
            <div className="card bg-warning">
              <div className="table-responsive">
                <form onSubmit={this.handleSubmit}>
                  <table
                    className="table table-striped table-sm table-success table-bordered"
                    data-link="row"
                  >
                    <tbody>
                      <tr>
                        <td className="align-bottom font-weight-bold">
                          <label className="control-label">Product Name</label>
                        </td>
                        <td className="align-bottom">
                          <input
                            type="text"
                            name="ProductName"
                            id="ProductName"
                            onChange={this.handleChange}
                            placeholder="Product Name"
                            className="form-control"
                            value={this.state.ProductName || ''}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="align-bottom font-weight-bold">
                          <label className="control-label">Category</label>
                        </td>
                        <td className="align-bottom">
                          <select
                            id="CategoryId"
                            name="CategoryId"
                            className="form-control"
                            onChange={this.handleChange}
                            value={this.state.CategoryId || ''}
                          >
                            <option value="">====Select====</option>
                            {this.props.categories.map((cat) => (
                              <option key={cat.Id} value={cat.Id}>
                                {cat.CategoryName}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td className="align-bottom font-weight-bold">
                          <label className="control-label">SKU</label>
                        </td>
                        <td className="align-bottom">
                          <select
                            id="SkuId"
                            name="SkuId"
                            className="form-control"
                            onChange={this.handleChange}
                            value={this.state.SkuId || ''}
                          >
                            <option value="">====Select====</option>
                            {this.props.skus.map((sku) => (
                              <option key={sku.Id} value={sku.Id}>
                                {sku.SkuName}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td className="align-bottom font-weight-bold">
                          <label className="control-label">Price</label>
                        </td>
                        <td className="align-bottom">
                          <input
                            type="text"
                            name="Price"
                            id="Price"
                            className="form-control"
                            onChange={this.handleChange}
                            placeholder="Price"
                            value={this.state.Price || ''}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="2">
                          <button
                            className="btn btn-sm btn-primary fa-pull-right"
                            type="submit"
                          >
                            Add Product
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={this.onClose}
                          >
                            Close
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </form>
              </div>
            </div>
          </div>
          <div className="mod-footer"></div>
        </div>
      </div>
    );
  }
}
