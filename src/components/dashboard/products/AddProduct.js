import React, { Component } from 'react';
import ContentHolder from '../layout/ContentHolder';
import Breadcrum from '../layout/Breadcrum';
import Loader from '../../layout/Loader';
// import InventoryInfoBox from '../layout/InventoryInfoBox';
// import TitleBar from '../layout/TitleBar';
import { TextField, Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';


class AddProduct extends Component {

    state = {
        catDropdownDisplay: 'Select Category',
        fileUploaded: false,
        openSnackBar: false,
        msgSnackBar: '',

        category: {},
        productName: '',
        originalPrice: '',
        discountPrice: '',
        description: '',
        stockQty: '',
        lowOrderLevel: '',
        notification: '',
        orderQty: 0,
        productType: 'published',
        images: [],

        defaultImage: ['https://firebasestorage.googleapis.com/v0/b/shopbox-35ae7.appspot.com/o/products%2Fproduct_default.png?alt=media&token=fbaae708-2697-432e-a3a9-c24b1dce45ac'],

    }

    handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ openSnackBar: false, msgSnackBar: '' });
    };

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onCategoryChange = category => this.setState({ category, catDropdownDisplay: category.catName });

    onFileChange = e => {
        const { firebase } = this.props;
        const file = e.target.files[0];
        const { images } = this.state;

        if (file) {
            const uploadTask = firebase.storage().ref('products/' + file.name).put(file);
            const that = this;

            uploadTask.on('state_changed',
                function (snapshot) {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress.toFixed(2) + '% done');
                    that.setState({
                        msgSnackBar: 'Upload is ' + progress.toFixed(0) + '% done',
                        openSnackBar: true
                    });
                },
                function (error) {
                    console.log(error);
                },
                function () {
                    uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                        images.push(downloadURL);
                        that.setState({
                            images,
                            msgSnackBar: 'Successfully Uploaded',
                            openSnackBar: true
                        });
                    });
                }
            );
        }

    }

    triggerInputFile() {
        document.getElementById("inputFile").click();
    }

    onDeleteImage = (index) => {
        const { images } = this.state;
        const { firebase } = this.props;
        const fileToDelete = images[index];

        firebase.storage().refFromURL(fileToDelete).delete()
            .then(() => {
                this.setState({
                    images: images.filter(img => img !== fileToDelete),
                    msgSnackBar: 'Image Deleted',
                    openSnackBar: true
                })
            });

    }

    onSubmit = e => {
        e.preventDefault();

        const { firestore, history } = this.props;
        const { productName, originalPrice, discountPrice, description, stockQty, orderQty, lowOrderLevel, notification, category, images, defaultImage, productType } = this.state;

        // Uploading To Firebase
        let imagesToUpload;
        if (images.length === 0)
            imagesToUpload = defaultImage;
        else
            imagesToUpload = images;

        const newProduct = {
            productName,
            originalPrice,
            discountPrice,
            description,
            category,
            productImages: {
                images: imagesToUpload
            },
            productStatus: {
                stockQty,
                orderQty,
                lowOrderLevel,
                notification
            },
            productType
        }

        firestore
            .add({ collection: 'products' }, newProduct)
            .then(() => {
                confirmAlert({
                    title: 'Product Added',
                    message: 'The Product Was Added Successfully',
                    buttons: [
                        {
                            label: 'Add more',
                            onClick: () => {
                                // Resetting State
                                this.setState({
                                    catDropdownDisplay: 'Select Category',
                                    fileUploaded: false,
                                    category: {},
                                    productName: '',
                                    originalPrice: '',
                                    discountPrice: '',
                                    description: '',
                                    stockQty: '',
                                    lowOrderLevel: '',
                                    notification: '',
                                    orderQty: 0,
                                    productType: 'published',
                                    images: [],
                                    defaultImage: ['https://firebasestorage.googleapis.com/v0/b/shopbox-35ae7.appspot.com/o/products%2Fproduct_default.png?alt=media&token=fbaae708-2697-432e-a3a9-c24b1dce45ac'],
                                })
                                // Redirecting
                                history.push('/dashboard/product/add');
                            }
                        },
                        {
                            label: 'See All Products',
                            onClick: () => history.push('/dashboard/products')
                        }
                    ]
                })
            })
    }

    render() {
        const history = [
            { link: '/dashboard', title: 'Dashboard' },
            { link: '/dashboard/products', title: 'Products' }
        ];
        const { productName, originalPrice, discountPrice, description, stockQty, lowOrderLevel, notification, catDropdownDisplay, images } = this.state;

        // Getting Categories From Categories' Collection    
        const { categories } = this.props;
        let catDropdown = <Loader />;
        if (categories) {
            catDropdown = categories.map(
                cat => <div key={cat.id} onClick={() => { this.onCategoryChange(cat) }} className="dropdown-item" style={{ cursor: 'pointer' }}>{cat.catName}</div>
            )
        }

        const mainContent = (
            <div>
                <Breadcrum current="Add" history={history} />

                <div className="container mt-2">

                    <div className="row">

                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="font-weight-bold">Category Information</h6>
                                </div>
                                <div className="card-body">
                                    <div className="dropdown" style={{ marginTop: '30px', marginBottom: '33px' }}>
                                        <button className="btn btn-light btn-lg dropdown-toggle rounded-right rounded-left col" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            {catDropdownDisplay}
                                        </button>
                                        <div className="dropdown-menu col-md-12" aria-labelledby="dropdownMenuButton">
                                            {catDropdown}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="card">
                        <div className="card-header bg-light text-secondary">
                            <h6 className="font-weight-bold">Basic Information</h6>
                        </div>
                        <div className="card-body">
                            <TextField
                                name="productName"
                                value={productName}
                                onChange={this.onChange}
                                id="standard-with-placeholder"
                                label="Product Name"
                                placeholder="Enter Product Name"
                                margin="normal"
                                style={{ width: '100%' }}
                            />
                            <TextField
                                name="originalPrice"
                                value={originalPrice}
                                onChange={this.onChange}
                                id="standard-with-placeholder"
                                label="Amount"
                                placeholder="Enter Product's Original Amount"
                                margin="normal"
                                style={{ width: '49%' }}
                                className="float-left"
                            />
                            <TextField
                                name="discountPrice"
                                value={discountPrice}
                                onChange={this.onChange}
                                id="standard-with-placeholder"
                                label="Discount"
                                placeholder="Enter Product's Amount After Discount"
                                margin="normal"
                                style={{ width: '49%' }}
                                className="float-right"
                            />
                            <TextField
                                name="description"
                                value={description}
                                onChange={this.onChange}
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

                    <div className="card">
                        <div className="card-header bg-light text-secondary">
                            <h6 className="font-weight-bold">Inventory Information</h6>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <TextField
                                        name="stockQty"
                                        value={stockQty}
                                        onChange={this.onChange}
                                        id="standard-with-placeholder"
                                        label="Stock"
                                        placeholder="Enter The Stock Amount"
                                        margin="normal"
                                        style={{ width: '49%' }}
                                        className="float-left"
                                    />
                                    <TextField
                                        name="lowOrderLevel"
                                        value={lowOrderLevel}
                                        onChange={this.onChange}
                                        id="standard-with-placeholder"
                                        label="Low Order"
                                        placeholder="Enter The Low Order"
                                        margin="normal"
                                        style={{ width: '49%' }}
                                        className="float-right"
                                    />
                                    <TextField
                                        name="notification"
                                        value={notification}
                                        onChange={this.onChange}
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

                    <div className="card">
                        <div className="card-header bg-light text-secondary">
                            Images Panel
                        </div>
                        <div className="card-body">

                            {images.length > 0
                                ? images.map(img => (
                                    <div key={images.indexOf(img)} className="col-md-2">
                                        <div style={{ width: '100px', height: '100px', overflow: 'hidden' }}>
                                            <img src={img} className="img-fluid rounded-top my-auto" alt="..." />
                                        </div>
                                        <button style={{ width: '100px' }} className="btn btn-outline-danger btn-sm btn-block rounded-bottom" onClick={() => { this.onDeleteImage(images.indexOf(img)) }}>
                                            <i className="fas fa-trash mr-1" /> Delete
                                            </button>
                                    </div>
                                ))
                                : null
                            }

                            <div className="col-md-2">
                                <i className="fas fa-camera fa-4x fa-btn p-3 bg-light" onClick={this.triggerInputFile} />
                                <input type="file" id="inputFile" onChange={this.onFileChange} hidden />
                            </div>
                        </div>
                    </div>

                    <button onClick={this.onSubmit} className="btn btn-gray btn-lg float-right rounded-left rounded-right">Add Product</button>

                </div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.openSnackBar}
                    autoHideDuration={6000}
                    onClose={this.handleCloseSnackBar}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{this.state.msgSnackBar}</span>}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            onClick={this.handleCloseSnackBar}
                        >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                />
            </div >
        )

        return (
            <div>
                <ContentHolder mainContent={mainContent} />
            </div>
        )
    }
}



export default compose(
    firebaseConnect(),
    firestoreConnect([
        { collection: 'categories' }
    ]),
    connect(
        (state, props) => ({
            categories: state.firestore.ordered.categories
        })
    )
)(AddProduct);
