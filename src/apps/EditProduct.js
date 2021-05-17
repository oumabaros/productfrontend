import React, { Component } from 'react';
import './Modal.css';
export default class EditProduct extends Component {
  constructor(props) {
    super(props);
    //initial states
    this.initialState = {
      ProductId: '',
      ProductName: '',
      CategoryId: '',
      SkuId: '',
      Price: '',
    };
    //set states
    this.state = this.initialState;
    this.state = {
      checked: false,
      Attributes: [],
      Id: this.props.productData.ProductId,
    };
    //bind control functions
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }
  componentDidMount() {}
  componentDidUpdate() {}
  //checks changes in input controls and sets states for changes
  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value,
      Id: this.props.productData.ProductId,
    });
  }
  //handles submit for save and edit
  handleSubmit(event) {
    event.preventDefault();
    this.props.onFormSubmit(this.state);
    this.setState(this.initialState);
  }
  //handles checkboxes inputs for attributes and sets their states(checked/unchecked)
  handleCheckboxChange = (event) => {
    let newArray = [...this.state.Attributes, event.target.id];
    if (event.target.checked) {
      if (this.state.Attributes.includes(event.target.id)) {
        newArray = newArray.filter((attr) => attr !== event.target.id);
      }
      this.setState({
        Attributes: newArray,
      });
      this.componentDidUpdate();
    } else {
      newArray = newArray.filter((attr) => attr !== event.target.id);
      this.setState({
        Attributes: newArray,
      });
      this.componentDidUpdate();
    }

    console.log(...this.state.Attributes);
  };
  //handles closing of this component
  onClose = (e) => {
    this.props.handleClose && this.props.handleClose(e);
  };
  //renders this component
  render() {
    //determines whether this component is visible or hidden
    if (!this.props.showEdit) {
      return null;
    }
    return (
      <div className="mod">
        <div className="mod-content">
          <div className="mod-header">
            <h4 className="mod-title">Edit Product</h4>
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
                            defaultValue={
                              this.props.productData.ProductName || ''
                            }
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
                            defaultValue={
                              this.props.productData.CategoryId || ''
                            }
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
                            defaultValue={this.props.productData.SkuId || ''}
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
                            defaultValue={this.props.productData.Price || ''}
                          />
                          <input
                            type="hidden"
                            name="Id"
                            id="Id"
                            defaultValue={
                              this.props.productData.ProductId || ''
                            }
                            onChange={this.handleChange}
                          />
                          <input
                            type="hidden"
                            name="Attributes"
                            id="Attributes"
                            value={this.state.Attributes || ''}
                            onChange={this.handleChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td
                          colSpan="2"
                          className="align-bottom font-weight-bold"
                        >
                          <fieldset className="border p-2">
                            <legend className="w-auto">
                              Product Attributes
                            </legend>
                            {this.props.attributes.map((attr) => (
                              <div key={attr.Id}>
                                <input
                                  type="checkbox"
                                  name={attr.Id}
                                  id={attr.Id}
                                  onChange={this.handleCheckboxChange}
                                />
                                &nbsp;
                                {attr.AttributeValue}
                              </div>
                            ))}
                          </fieldset>
                        </td>
                      </tr>

                      <tr>
                        <td colSpan="2">
                          <button
                            className="btn btn-sm btn-primary fa-pull-right"
                            type="submit"
                          >
                            Update Product
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
