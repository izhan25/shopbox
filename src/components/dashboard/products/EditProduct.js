import React, { Component } from 'react';
import ContentHolder from '../layout/ContentHolder';
import Breadcrum from '../layout/Breadcrum';
import Loader from '../../layout/Loader';
import { TextField, Snackbar, IconButton, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

class EditProduct extends Component {

    constructor(props) {
        super(props);

        this.productNameInput = React.createRef();
        this.originalPriceInput = React.createRef();
        this.discountPriceInput = React.createRef();
        this.descriptionInput = React.createRef();
        this.stockQtyInput = React.createRef();
        this.lowOrderLevelInput = React.createRef();
        this.notificationInput = React.createRef();
    }

    state = {
        catDropdownDisplay: '',
        fileUploaded: false,
        openSnackBar: false,
        msgSnackBar: '',

        category: '',
        productType: '',
        images: [],

        defaultImage: ['https://firebasestorage.googleapis.com/v0/b/shopbox-35ae7.appspot.com/o/products%2Fproduct_default.png?alt=media&token=fbaae708-2697-432e-a3a9-c24b1dce45ac'],

    }

    static getDerivedStateFromProps(props, state) {
        const { product } = props;

        if (product && state.images.length === 0 && state.productType === '' && state.catDropdownDisplay === '' && state.category === '') {
            return {
                images: product.productImages.images,
                productType: product.productType,
                catDropdownDisplay: product.category.catName,
                category: product.category
            }
        }

        return null;
    }

    onProductTypeChange = event => {
        this.setState({ productType: event.target.value });
    };

    handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ openSnackBar: false, msgSnackBar: '' });
    };

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

        const { firestore, history, product } = this.props;
        const { category, images, defaultImage, productType } = this.state;

        if (product) {
            // Uploading To Firebase
            let imagesToUpload;
            if (images.length === 0)
                imagesToUpload = defaultImage;
            else
                imagesToUpload = images;

            const newProduct = {
                productName: this.productNameInput.current.value,
                originalPrice: this.originalPriceInput.current.value,
                discountPrice: this.discountPriceInput.current.value,
                description: this.descriptionInput.current.value,
                category,
                productImages: {
                    images: imagesToUpload
                },
                productStatus: {
                    stockQty: this.stockQtyInput.current.value,
                    orderQty: product.productStatus.orderQty,
                    lowOrderLevel: this.lowOrderLevelInput.current.value,
                    notification: this.notificationInput.current.value
                },
                productType
            }

            firestore
                .update({ collection: 'products', doc: product.id }, newProduct)
                .then(history.push('/dashboard/products'));

            // history.push(`/dashboard/product/${product.id}`)
        }
        else {
            console.log('error in submiting');
        }


    }

    render() {
        const history = [
            { link: '/dashboard', title: 'Dashboard' },
            { link: '/dashboard/products', title: 'Products' },
        ];

        // Getting Data From Props    
        const { categories, product } = this.props;
        let catDropdown = <Loader />;
        if (categories) {
            catDropdown = categories.map(
                cat => <div key={cat.id} onClick={() => { this.onCategoryChange(cat) }} className="dropdown-item" style={{ cursor: 'pointer' }}>{cat.catName}</div>
            )
        }
        let mainContent;

        if (product) {
            const { productName, originalPrice, discountPrice, description, productStatus: { stockQty, lowOrderLevel, notification } } = product;

            const { images, catDropdownDisplay, productType } = this.state;

            mainContent = (
                <div>
                    <Breadcrum current="Edit" history={history} />

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

                                <RadioGroup
                                    aria-label="Gender"
                                    name="gender1"
                                    className="d-inline"
                                    value={productType}
                                    onChange={this.onProductTypeChange}
                                >
                                    <FormControlLabel value="published" control={<Radio />} label="Publish" />
                                    <FormControlLabel value="unpublish" control={<Radio />} label="Un Publish" />
                                </RadioGroup>

                                <TextField
                                    name="productName"
                                    placeholder="Enter Product Name"
                                    inputProps={{
                                        defaultValue: productName,
                                        ref: this.productNameInput
                                    }}
                                    id="standard-with-placeholder"
                                    label="Product Name"
                                    margin="normal"
                                    style={{ width: '100%' }}
                                />
                                <TextField
                                    name="originalPrice"
                                    inputProps={{
                                        defaultValue: originalPrice,
                                        ref: this.originalPriceInput
                                    }}
                                    id="standard-with-placeholder"
                                    label="Amount"
                                    placeholder="Enter Product's Original Amount"
                                    margin="normal"
                                    style={{ width: '49%' }}
                                    className="float-left"
                                />
                                <TextField
                                    name="discountPrice"
                                    inputProps={{
                                        defaultValue: discountPrice,
                                        ref: this.discountPriceInput
                                    }}
                                    id="standard-with-placeholder"
                                    label="Discount"
                                    placeholder="Enter Product's Amount After Discount"
                                    margin="normal"
                                    style={{ width: '49%' }}
                                    className="float-right"
                                />
                                <TextField
                                    name="description"
                                    inputProps={{
                                        defaultValue: description,
                                        ref: this.descriptionInput
                                    }}
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
                                            inputProps={{
                                                defaultValue: stockQty,
                                                ref: this.stockQtyInput
                                            }}
                                            id="standard-with-placeholder"
                                            label="Stock"
                                            placeholder="Enter The Stock Amount"
                                            margin="normal"
                                            style={{ width: '49%' }}
                                            className="float-left"
                                        />
                                        <TextField
                                            name="lowOrderLevel"
                                            inputProps={{
                                                defaultValue: lowOrderLevel,
                                                ref: this.lowOrderLevelInput
                                            }}
                                            id="standard-with-placeholder"
                                            label="Low Order"
                                            placeholder="Enter The Low Order"
                                            margin="normal"
                                            style={{ width: '49%' }}
                                            className="float-right"
                                        />
                                        <TextField
                                            name="notification"
                                            inputProps={{
                                                defaultValue: notification,
                                                ref: this.notificationInput
                                            }}
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

                        <button onClick={this.onSubmit} className="btn btn-gray btn-lg float-right rounded-left rounded-right">Update</button>

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

        }
        else {
            mainContent = <Loader />;
        }



        return (
            <div>
                <ContentHolder mainContent={mainContent} />
            </div>
        )
    }
}

export default compose(
    firebaseConnect(),
    firestoreConnect(props => [
        { collection: 'products', storeAs: 'product', doc: props.match.params.id },
        { collection: 'categories' }
    ]),
    connect(
        ({ firestore: { ordered } }, props) => ({
            categories: ordered.categories,
            product: ordered.product && ordered.product[0]
        })
    )
)(EditProduct);
