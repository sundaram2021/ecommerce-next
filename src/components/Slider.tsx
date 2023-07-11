
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 600 },
    items: 2,
    slidesToSlide: 2 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};


const Slider = ({children}:{children: React.ReactNode}) => {
    return (
      <div className="w-[80vw] mx-auto mt-5 z-0">
          <Carousel
          swipeable={false}
          draggable={false}
          // showDots={true}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          // autoPlay={true}
          // autoPlaySpeed={1000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile", "desktop", "largeDesktop", "pc"]}
          // deviceType={this?.props.deviceType}
          // dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
          className="w-[100%] mx-auto z-0"
          >
            {children}
        </Carousel>
      </div>
  )
}

export default Slider; 