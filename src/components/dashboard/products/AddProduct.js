import React, { Component } from 'react';
import ContentHolder from '../layout/ContentHolder';
import TitleBar from '../layout/TitleBar';
import Loader from '../../layout/Loader';
import { TextField, Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { firestoreConnect, firebaseConnect, isEmpty } from 'react-redux-firebase';
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

        productNameError: false, productNameMsg: '',
        originalPriceError: false, originalPriceMsg: '',
        discountPriceError: false, discountPriceMsg: '',
        descriptionError: false, descriptionMsg: '',
        stockQtyError: false, stockQtyMsg: '',
        lowOrderLevelError: false, lowOrderLevelMsg: '',
        categoryError: false, categoryMsg: '',
        btnError: false, btnMsg: '',

        defaultImage: ['https://firebasestorage.googleapis.com/v0/b/shopbox-35ae7.appspot.com/o/products%2Fproduct_default.png?alt=media&token=fbaae708-2697-432e-a3a9-c24b1dce45ac'],

    }

    handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ openSnackBar: false, msgSnackBar: '' });
    };

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });

        const field = e.target.name;
        const value = e.target.value;

        const { originalPrice } = this.state;

        // Form Validation
        switch (field) {
            case 'productName':
                if (value === '') {
                    this.setState({ productNameError: true, productNameMsg: '*Required' })
                }
                else {
                    this.setState({ productNameError: false, productNameMsg: '' })
                }
                break;
            case 'originalPrice':
                if (value === '') {
                    this.setState({ originalPriceError: true, originalPriceMsg: '*Required' })
                }
                else if (isNaN(value)) {
                    this.setState({ originalPriceError: true, originalPriceMsg: 'Must Be A Number' })
                }
                else if (parseInt(value, 10) < 500 || parseInt(value, 10) > 100000) {
                    this.setState({ originalPriceError: true, originalPriceMsg: 'Range Must Be Between 500 To 100,000' })
                }
                else {
                    this.setState({ originalPriceError: false, originalPriceMsg: '' })
                }
                break;
            case 'discountPrice':
                if (value === '') {
                    this.setState({ discountPriceError: true, discountPriceMsg: '*Required' })
                }
                else if (isNaN(value)) {
                    this.setState({ discountPriceError: true, discountPriceMsg: 'Must Be A Number' })
                }
                else if (parseInt(value, 10) < 500) {
                    this.setState({ discountPriceError: true, discountPriceMsg: 'Must Greater Then 500' })
                }
                else if (parseInt(value, 10) > parseInt(originalPrice, 10)) {
                    this.setState({ discountPriceError: true, discountPriceMsg: 'Exceeds Orginal Amount' })
                }
                else {
                    this.setState({ discountPriceError: false, discountPriceMsg: '' })
                }
                break;
            case 'description':
                if (value === '') {
                    this.setState({ descriptionError: true, descriptionMsg: '*Required' })
                }
                else {
                    this.setState({ descriptionError: false, descriptionMsg: '' })
                }
                break;
            case 'stockQty':
                if (value === '') {
                    this.setState({ stockQtyError: true, stockQtyMsg: '*Required' })
                }
                else if (isNaN(value)) {
                    this.setState({ stockQtyError: true, stockQtyMsg: 'Must Be A Number' })
                }
                else if (parseInt(value, 10) < 0 || parseInt(value, 10) > 10000) {
                    this.setState({ stockQtyError: true, stockQtyMsg: 'Range Must Be Between 0 To 10,000' })
                }
                else {
                    this.setState({ stockQtyError: false, stockQtyMsg: '' })
                }
                break;
            case 'lowOrderLevel':
                if (value === '') {
                    this.setState({ lowOrderLevelError: true, lowOrderLevelMsg: '*Required' })
                }
                else if (isNaN(value)) {
                    this.setState({ lowOrderLevelError: true, lowOrderLevelMsg: 'Must Be A Number' })
                }
                else if (parseInt(value, 10) < 0 || parseInt(value, 10) > 10000) {
                    this.setState({ lowOrderLevelError: true, lowOrderLevelMsg: 'Range Must Be Between 0 To 10,000' })
                }
                else {
                    this.setState({ lowOrderLevelError: false, lowOrderLevelMsg: '' })
                }
                break;
            default:
                //
                break;

        }

    }

    onCategoryChange = category => this.setState({
        category,
        catDropdownDisplay: category.catName,
        categoryError: false,
        categoryMsg: ''
    });

    onFileChange = e => {
        const { firebase } = this.props;
        const file = e.target.files[0];
        const { images } = this.state;

        const parsePath = (path) => {
            var parts = (/(\w?:?\\?[\w\-_ \\]*\\+)?([\w-_ ]+)?(\.[\w-_ ]+)?/gi).exec(path);
            return {
                path: parts[0] || "",
                folder: parts[1] || "",
                name: parts[2] || "",
                extension: parts[3] || "",
            };
        }

        const extValidator = ext => {
            switch (ext) {
                case '.jpg':
                    return true;
                case '.png':
                    return true;
                case '.jpeg':
                    return true;
                default:
                    return false;
            }
        }

        if (file) {
            const fileDetails = parsePath(e.target.value);

            if (extValidator(fileDetails.extension)) {
                // if File is Image
                const fileName = new Date() + file.name;
                const uploadTask = firebase.storage().ref('products/' + fileName).put(file);
                const that = this;

                uploadTask.on('state_changed',
                    function (snapshot) {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        // console.log('Upload is ' + progress.toFixed(2) + '% done');
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
            else {
                // If File is not Image
                console.log('invalid');
            }

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
        const {
            productName, originalPrice, discountPrice, description, stockQty, orderQty, lowOrderLevel, notification, category, images, defaultImage, productType,
        } = this.state;

        // If Validation is False
        if (
            isEmpty(category) ||
            productName === '' ||
            originalPrice === '' ||
            discountPrice === '' ||
            description === '' ||
            stockQty === '' ||
            lowOrderLevel === ''
        ) {
            this.setState({
                categoryError: true, categoryMsg: 'Please Select A Category',
                btnError: true, btnMsg: 'Please Fill Complete Form'
            });
            return false;
        }


        // Uploading To Firebase
        let imagesToUpload;
        if (images.length === 0)
            imagesToUpload = defaultImage;
        else
            imagesToUpload = images;

        const newProduct = {
            productName,
            originalPrice: parseInt(originalPrice, 10),
            discountPrice: parseInt(discountPrice, 10),
            description,
            category,
            productImages: {
                images: imagesToUpload
            },
            productStatus: {
                stockQty: parseInt(stockQty, 10),
                orderQty: parseInt(orderQty, 10),
                lowOrderLevel: parseInt(lowOrderLevel, 10),
                notification
            },
            productType,
            createdAt: new Date()
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
                                    productNameError: false, productNameMsg: '',
                                    originalPriceError: false, originalPriceMsg: '',
                                    discountPriceError: false, discountPriceMsg: '',
                                    descriptionError: false, descriptionMsg: '',
                                    stockQtyError: false, stockQtyMsg: '',
                                    lowOrderLevelError: false, lowOrderLevelMsg: '',
                                    categoryError: false, categoryMsg: '',
                                    btnError: false, btnMsg: ''
                                })
                                // Redirecting
                                history.push('/product/add');
                            }
                        },
                        {
                            label: 'See All Products',
                            onClick: () => history.push('/products')
                        }
                    ]
                })
            })
    }

    render() {
        const {
            productName, originalPrice, discountPrice, description, stockQty, lowOrderLevel, notification, catDropdownDisplay, images,
            productNameError, productNameMsg,
            originalPriceError, originalPriceMsg,
            discountPriceError, discountPriceMsg,
            descriptionError, descriptionMsg,
            stockQtyError, stockQtyMsg,
            lowOrderLevelError, lowOrderLevelMsg,
            categoryError, categoryMsg,
            btnError, btnMsg
        } = this.state;

        // Getting Categories From Categories' Collection    
        const { categories } = this.props;
        let catDropdown = <Loader />;
        if (categories) {
            catDropdown = categories.map(
                cat => <div key={cat.id} onClick={() => { this.onCategoryChange(cat) }} className="dropdown-item" style={{ cursor: 'pointer' }}>
                    {cat.catName}
                </div>
            )
        }

        const mainContent = (
            <div>
                <TitleBar titleName="Add Product" />
                <div className="mt-2">

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
                                    {
                                        categoryError
                                            ? <div className="text-danger error">{categoryMsg}</div>
                                            : null
                                    }
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
                                error={productNameError}
                            />
                            {
                                productNameError
                                    ? <span className="text-danger error">{productNameMsg}</span>
                                    : null
                            }
                            <br />
                            <div className="row">
                                <div className="col-md-6">
                                    <TextField
                                        name="originalPrice"
                                        value={originalPrice}
                                        onChange={this.onChange}
                                        id="standard-with-placeholder"
                                        label="Amount"
                                        placeholder="Enter Product's Original Amount"
                                        margin="normal"
                                        fullWidth
                                        error={originalPriceError}
                                    />
                                    {
                                        originalPriceError
                                            ? <span className="text-danger error">{originalPriceMsg}</span>
                                            : null
                                    }
                                </div>
                                <div className="col-md-6">
                                    <TextField
                                        name="discountPrice"
                                        value={discountPrice}
                                        onChange={this.onChange}
                                        id="standard-with-placeholder"
                                        label="Discount"
                                        placeholder="Enter Product's Amount After Discount"
                                        margin="normal"
                                        fullWidth
                                        error={discountPriceError}
                                    />
                                    {
                                        discountPriceError
                                            ? <span className="text-danger error">{discountPriceMsg}</span>
                                            : null
                                    }
                                </div>
                            </div>


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
                                error={descriptionError}
                            />
                            {
                                descriptionError
                                    ? <span className="text-danger error">{descriptionMsg}</span>
                                    : null
                            }
                            <br />
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header bg-light text-secondary">
                            <h6 className="font-weight-bold">Inventory Information</h6>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <TextField
                                        name="stockQty"
                                        value={stockQty}
                                        onChange={this.onChange}
                                        id="standard-with-placeholder"
                                        label="Stock"
                                        placeholder="Enter The Stock Amount"
                                        margin="normal"
                                        fullWidth
                                        error={stockQtyError}
                                    />
                                    {
                                        stockQtyError
                                            ? <span className="text-danger error">{stockQtyMsg}</span>
                                            : null
                                    }
                                </div>
                                <div className="col-md-6">
                                    <TextField
                                        name="lowOrderLevel"
                                        value={lowOrderLevel}
                                        onChange={this.onChange}
                                        id="standard-with-placeholder"
                                        label="Low Order"
                                        placeholder="Enter The Low Order"
                                        margin="normal"
                                        fullWidth
                                        error={lowOrderLevelError}
                                    />
                                    {
                                        lowOrderLevelError
                                            ? <span className="text-danger error">{lowOrderLevelMsg}</span>
                                            : null
                                    }
                                </div>
                            </div>


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
                                <input type="file" accept="image/x-png,image/gif,image/jpeg" id="inputFile" onChange={this.onFileChange} hidden />
                            </div>
                        </div>
                    </div>


                    <button onClick={this.onSubmit} className="btn btn-gray btn-lg float-right rounded-left rounded-right">Add Product</button>
                    <br /><br />
                    {
                        btnError
                            ? <span className="text-danger error float-right">{btnMsg}</span>
                            : null
                    }



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
