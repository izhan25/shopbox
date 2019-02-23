import React, { Component } from 'react';
import ContentHolder from '../layout/ContentHolder';
import Breadcrum from '../layout/Breadcrum';
import InventoryInfoBox from '../layout/InventoryInfoBox';
// import TitleBar from '../layout/TitleBar';
import { TextField, Hidden } from '@material-ui/core';

class AddProduct extends Component {

    render() {
        const history = [
            { link: '/dashboard', title: 'Dashboard' },
            { link: '/dashboard/products', title: 'Products' }
        ]
        const mainContent = (
            <div>
                <Breadcrum current="Add" history={history} />
                {/* <TitleBar titleName="Add New Product" /> */}

                <div className="container mt-2">

                    <div className="card">
                        <div className="card-header bg-light text-secondary">
                            <h6 className="font-weight-bold">Basic Information</h6>
                        </div>
                        <div className="card-body">
                            <TextField
                                id="standard-with-placeholder"
                                label="Product Name"
                                placeholder="Enter Product Name"
                                margin="normal"
                                style={{ width: '100%' }}
                            />
                            <TextField
                                id="standard-with-placeholder"
                                label="Amount"
                                placeholder="Enter Product's Original Amount"
                                margin="normal"
                                style={{ width: '49%' }}
                                className="float-left"
                            />
                            <TextField
                                id="standard-with-placeholder"
                                label="Discount"
                                placeholder="Enter Product's Amount After Discount"
                                margin="normal"
                                style={{ width: '49%' }}
                                className="float-right"
                            />
                            <TextField
                                id="standard-with-placeholder"
                                label="Description"
                                placeholder="Product's Description"
                                margin="normal"
                                multiline
                                rows="4"
                                fullWidth
                            />
                        </div>
                    </div>


                    <div className="row">

                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="font-weight-bold">Category Information</h6>
                                </div>
                                <div className="card-body">
                                    <div className="dropdown" style={{ marginTop: '30px', marginBottom: '33px' }}>
                                        <button className="btn btn-light btn-lg dropdown-toggle rounded-right rounded-left col" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Select Category
                                        </button>
                                        <div className="dropdown-menu col-md-12" aria-labelledby="dropdownMenuButton">
                                            <div className="dropdown-item" style={{ cursor: 'pointer' }}>cat 1</div>
                                            <div className="dropdown-item" style={{ cursor: 'pointer' }}>cat 2</div>
                                            <div className="dropdown-item" style={{ cursor: 'pointer' }}>cat 3</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-header bg-light text-secondary">
                                    <h6 className="font-weight-bold">Uplaod Images</h6>
                                </div>
                                <div className="card-body">
                                    <div className="container d-flex justify-content-center">
                                        <div className="btn btn-light btn-file">
                                            <i className="fas fa-camera fa-4x p-3" />
                                            <input type="file" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="card">
                        <div className="card-header bg-light text-secondary">
                            <h6 className="font-weight-bold">Inventory Information</h6>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <TextField
                                        id="standard-with-placeholder"
                                        label="Stock"
                                        placeholder="Enter The Stock Amount"
                                        margin="normal"
                                        style={{ width: '49%' }}
                                        className="float-left"
                                    />
                                    <TextField
                                        id="standard-with-placeholder"
                                        label="Low Order"
                                        placeholder="Enter The Low Order"
                                        margin="normal"
                                        style={{ width: '49%' }}
                                        className="float-right"
                                    />
                                    <TextField
                                        id="standard-with-placeholder"
                                        label="Notification"
                                        placeholder="Enter The Notification Message"
                                        margin="normal"
                                        fullWidth
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <button className="btn btn-gray btn-lg float-right rounded-left rounded-right">Add Product</button>

                </div>
            </div>
        )

        return (
            <div>
                <ContentHolder mainContent={mainContent} />
            </div>
        )
    }
}



export default AddProduct;
