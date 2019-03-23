import React, { Component } from 'react';
import Loader from '../../layout/Loader';
import classnames from 'classnames';

class Slider extends Component {
    render() {
        const { bannerImages } = this.props;

        const Carousel = () => {

            return (
                <div id="carouselExampleControls" className="carousel slide mb-3" data-ride="carousel">
                    <div className="carousel-inner animated fadeIn">
                        {
                            bannerImages
                                ? bannerImages.map(
                                    img => (
                                        <div
                                            key={bannerImages.indexOf(img)}
                                            className={classnames('carousel-item ', { 'active': bannerImages.indexOf(img) === 0 })}
                                        >
                                            <img src={img.url} className="d-block w-100 " alt="..." />
                                        </div>
                                    )
                                )
                                : (
                                    <div className="row mt-3 mb-3">
                                        <div className="col-md-12">
                                            <Loader />
                                        </div>
                                    </div>
                                )
                        }
                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                        <span className="fas fa-angle-left text-dark" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                        <span className="fas fa-angle-right text-dark" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            )


        }

        return <Carousel />;

    }
}

export default Slider;
