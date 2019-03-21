import React, { Component } from 'react';
import ContentHolder from '../layout/ContentHolder';
import TitleBar from '../layout/TitleBar';
import { compose } from 'redux';
import { firebaseConnect, firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';


class Display extends Component {
    state = {
        images: []
    }

    triggerInputFile = () => {
        document.getElementById("inputFile").click();
    }
    onFileChange = e => {
        const { firebase } = this.props;
        const file = e.target.files[0];
        const { images } = this.state;

        if (file) {
            const uploadTask = firebase.storage().ref('bannerImages/' + file.name).put(file);
            const that = this;

            uploadTask.on('state_changed',
                function (snapshot) {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress.toFixed(2) + '% done');
                    // that.setState({
                    //     msgSnackBar: 'Upload is ' + progress.toFixed(0) + '% done',
                    //     openSnackBar: true
                    // });
                },
                function (error) {
                    console.log(error);
                },
                function () {
                    uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                        images.push(downloadURL);
                        that.setState({
                            images,
                            // msgSnackBar: 'Successfully Uploaded',
                            // openSnackBar: true
                        });
                    });
                }
            );
        }
    }
    render() {
        const { images } = this.state;

        const mainContent = (
            <div>
                <TitleBar titleName="Display Banners" />
                <div className="card">
                    <div className="card-header bg-light text-secondary">
                        Images Panel
                        </div>
                    <div className="card-body">
                        <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img src="..." className="d-block w-100" alt="..." />
                                </div>
                                <div className="carousel-item">
                                    <img src="..." className="d-block w-100" alt="..." />
                                </div>
                                <div className="carousel-item">
                                    <img src="..." className="d-block w-100" alt="..." />
                                </div>
                            </div>
                            <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="sr-only">Previous</span>
                            </a>
                            <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="sr-only">Next</span>
                            </a>
                        </div>

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