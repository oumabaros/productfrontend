import React, { Component } from 'react';
import './Modal.css';

//Product Details component
export default class ProductDetails extends Component {
  //handles closing this component
  onClose = (e) => {
    this.props.handleClose && this.props.handleClose(e);
  };
  render() {
    //decides whether component is hidden or visible
    if (!this.props.showProductDetails) {
      return null;
    }
    //render component
    return (
      <div className="mod">
        <div className="mod-content">
          <div className="mod-header">
            <h4 className="mod-title">Product Details</h4>
          </div>
          <div className="mod-body">
            <div className="card bg-warning">
              <div className="table-responsive">
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
                          placeholder="Product Name"
                          className="form-control"
                          value={this.props.ProductName || ''}
                          disabled
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="align-bottom font-weight-bold">
                        <label className="control-label">Category</label>
                      </td>
                      <td className="align-bottom">
                        <input
                          type="text"
                          name="CategoryName"
                          id="CategoryName"
                          placeholder="Category Name"
                          className="form-control"
                          value={this.props.CategoryName || ''}
                          disabled
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="align-bottom font-weight-bold">
                        <label className="control-label">SKU</label>
                      </td>
                      <td className="align-bottom">
                        <input
                          type="text"
                          name="SkuName"
                          id="SkuName"
                          placeholder="Sku Name"
                          className="form-control"
                          value={this.props.SkuName || ''}
                          disabled
                        />
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
                          placeholder="Price"
                          className="form-control"
                          value={this.props.Price || ''}
                          disabled
                        />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <fieldset className="border p-2">
                          <legend className="w-auto">Product Attributes</legend>

                          {this.props.attributesData.map((attr) => (
                            <div key={attr.ProductAttributeValueId}>
                              <input
                                type="checkbox"
                                name={attr.ProductAttributeValueId}
                                id={attr.ProductAttributeValueId}
                                value={attr.ProductAttributeValueId}
                                checked={attr.Selected}
                                disabled
                              />
                              &nbsp;
                              {attr.AttributeName}
                            </div>
                          ))}
                        </fieldset>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <button
                          className="btn btn-sm btn-danger fa-pull-right"
                          onClick={this.onClose}
                        >
                          Close
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="mod-footer"></div>
        </div>
      </div>
    );
  }
}
