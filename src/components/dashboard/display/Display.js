import React, { Component } from 'react';
import ContentHolder from '../layout/ContentHolder';
import TitleBar from '../layout/TitleBar';
import { compose } from 'redux';
import { firebaseConnect, firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import classnames from 'classnames';



class Display extends Component {
    state = {
        images: [],
        bannerImages: '',
        openSnackBar: false,
        msgSnackBar: '',
    }


    static getDerivedStateFromProps(props, state) {
        const { bannerImages } = props;

        if (bannerImages) {

            const images = [];
            if (bannerImages.length !== 0) {
                bannerImages.map(img => images.push(img.url));
            }

            return {
                bannerImages,
                images
            }
        }

        return null;
    }

    handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ openSnackBar: false, msgSnackBar: '' });
    };

    triggerInputFile = () => {
        document.getElementById("inputFile").click();
    }

    onFileChange = e => {
        const { firebase, firestore } = this.props;
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

        const uploadToFirestore = url => {
            const newBanner = {
                url,
                createdAt: new Date()
            }
            firestore.add({ collection: 'bannerImages' }, newBanner);
        }



        if (file) {
            const fileDetails = parsePath(e.target.value);

            if (extValidator(fileDetails.extension)) {
                // if File is Image
                const fileName = new Date() + file.name;
                const uploadTask = firebase.storage().ref('bannerImages/' + fileName).put(file);
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
                            uploadToFirestore(downloadURL);
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

    onDeleteImage = (index) => {
        const { images } = this.state;
        const { firebase, firestore } = this.props;
        const fileToDelete = images[index];

        const deleteFromFirestore = url => {
            const db = firebase.firestore();

            db.collection('bannerImages').where('url', '==', url).get().then(querySnapshot => {
                querySnapshot.forEach((doc) => {
                    firestore.delete({ collection: 'bannerImages', doc: doc.id });
                });
            })

        }

        firebase.storage().refFromURL(fileToDelete).delete()
            .then(() => {
                this.setState({
                    images: images.filter(img => img !== fileToDelete),
                    msgSnackBar: 'Image Deleted',
                    openSnackBar: true
                });
                deleteFromFirestore(fileToDelete);
            });

    }

    render() {
        const { images, bannerImages } = this.state;

        const Carousel = () => {
            if (bannerImages && bannerImages.length !== 0) {
                return (
                    <div id="carouselExampleControls" className="carousel slide mb-3" data-ride="carousel">
                        <div className="carousel-inner">
                            {
                                bannerImages
                                    ? bannerImages.map(
                                        img => (
                                            <div
                                                key={bannerImages.indexOf(img)}
                                                className={classnames('carousel-item', { 'active': bannerImages.indexOf(img) === 0 })}
                                                style={{ height: '275px' }}
                                            >
                                                <img src={img.url} className="d-block w-100" alt="..." />
                                            </div>
                                        )
                                    )
                                    : null
                            }
                        </div>
                        <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                            <span className="fas fa-arrow-left text-dark" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                            <span className="fas fa-arrow-right text-dark" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                )
            }
            else {
                return (
                    <div className="text-center" style={{ fontSize: '30px' }}>
                        <i className="fas fa-exclamation-triangle text-warning"></i> No Images
                </div>
                )
            }
        }

        const mainContent = (
            <div>
                <TitleBar titleName="Display Banners" />
                <div className="card">
                    <div className="card-header bg-light text-secondary">
                        Images Panel <small>(1920 x 570)</small>
                    </div>
                    <div className="card-body">
                        <Carousel />
                        {images.length > 0
                            ? images.map(img => (
                                <div key={images.indexOf(img)} className="col-md-2">
                                    <div style={{ width: '100px', height: '50px', overflow: 'hidden' }}>
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
                            <input type="file" accept="image/*" id="inputFile" onChange={this.onFileChange} hidden />
                        </div>
                    </div>
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
            </div>
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
        {
            collection: 'bannerImages',
            orderBy: [['createdAt', 'desc']]
        }
    ]),
    connect((state, props) => ({
        bannerImages: state.firestore.ordered.bannerImages
    }))
)(Display)