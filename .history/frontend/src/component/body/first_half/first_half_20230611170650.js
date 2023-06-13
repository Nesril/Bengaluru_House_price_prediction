
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, EffectCoverflow, Autoplay } from 'swiper'
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import "../../../style/first_half.css"
const slider = [
  {
      title: "Donut 1",
      description: "Our Donut Collection Offers a Mouthwatering Array of Flavors, Toppings, and Shapes for Every Craving and Occasion.",
      url: "/image/Celestial-april-tablet.jpg"
    },
    {
      title: "Donut 2",
      description: "Our Donut Collection Offers a Mouthwatering Array of Flavors, Toppings, and Shapes for Every Craving and Occasion.",
      url: "/image/Celestial-april-tablet-2.jpg"
    },
    {
      title: "Donut 3",
      description: "Our Donut Collection Offers a Mouthwatering Array of Flavors, Toppings, and Shapes for Every Craving and Occasion.",
      url: "/image/codename-celebration-1440x600.jpg"
    },
  
    {
      title: "Donut 4",
      description: "Our Donut Collection Offers a Mouthwatering Array of Flavors, Toppings, and Shapes for Every Craving and Occasion.",
      url: "/image/real-estate-searching_52683-46407.avif"
    },
    {
      title: "Donut 5",
      description: "Our Donut Collection Offers a Mouthwatering Array of Flavors, Toppings, and Shapes for Every Craving and Occasion.",
      url: "/image/mortgage-real-estate-investing-guide-4222543-v1-b49c49405ee14779adb25d2879411414.png"
    },
]

const Carousel = () => {
return (
  <>
      <div>
          <div className='carousel-content'>
              <span>discover</span>
              <h1>Sweet Donut Heaven</h1>
              <hr />
              <p>Our Donut Collection Offers a Mouthwatering Array of Flavors, Toppings, and Shapes for Every Craving and Occasion.</p>
              <a href="#" className='slider-btn'>download app</a>
          </div>
      </div>

      <Swiper 
      className='myswiper'
      modules={[Pagination, EffectCoverflow, Autoplay]}
      effect={"coverflow"}
      grabCursor={true}
      centeredSlides={true}
      coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 3,
          slideShadows: true
      }}
      loop={true}
      pagination={{clickable: true}}

      autoplay={{
          delay: 5000,
          disableOnInteraction: false
      }}
      breakpoints={{
          640: {
              slidesPerView: 2
          },
          768: {
              slidesPerView: 1
          },
          1024: {
              slidesPerView: 2
          },
          1560: {
              slidesPerView: 3
          },
      }}
      
      >
          {
              slider.map(data => (
                  <SwiperSlide style={{ backgroundImage: `url(${data.url})` }} className="myswiper-slider">
                      <div>
                          <h2>{data.title}</h2>
                          <p>{data.description}</p>
                          <a href={`${data.url}`} target="_blank" className='slider-btn'>explore</a>
                      </div>
                  </SwiperSlide>
              ))
          }
      </Swiper>

  </>
)
}

export default Carousel