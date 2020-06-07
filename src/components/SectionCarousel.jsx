import React, { Component} from "react";
import Slider from "react-slick";
import Rating from './widgets/Rating'
class SectionCarousel extends Component {
  state = { items: this.props.items };

  render() {
    let settings = {
      infinite: true,
      speed: 1000,
      arrows: true,
      slidesToShow: 5,
      slidesToScroll: 4,

      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ],
    };

    return (
      <div className="container">
        {this.props.children}
       
        <Slider {...settings}>
          {this.state.items.length === 0 ? (
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            this.state.items.map((current) => (
              <div className="out" key={current.id}>
                <div style={{padding:5}} className="card">
                  <img
                    className="rounded"
                    alt={"users here"}
                    src={current.img}
                    height={100}
                    width={"100%"}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{current.name}</h5>
                    <small className="card-text text-sm-center text-muted">
                      In your contacts
                    </small>
                    <br />

                    <Rating rating ={current} />
                  </div>
                </div>
              </div>
            ))
          )}
        </Slider>
      </div>
    );
  }
}

export default SectionCarousel;
