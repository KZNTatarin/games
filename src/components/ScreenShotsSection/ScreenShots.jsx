import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "./ScreenShots.css";
import "swiper/css";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Loader from "../UI/Loader/Loader";

export default function ScreenShots() {
  const [screens, setScreens] = useState();
  const { slug } = useParams();
  async function fetchGames() {
    const response = await fetch(
      `https://api.rawg.io/api/games/${slug}/screenshots?key=4076163a89ca4d93a368075fbd0bf1d6`
    );
    const screens = await response.json();
    setScreens(screens);
    console.log(screens);
  }
  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <>
      {" "}
      {screens ? (
        <section className="screenshots">
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={100}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
          >
            {screens &&
              screens.results.map((img) => (
                <SwiperSlide>
                  <img className="img-item" src={img.image} />
                </SwiperSlide>
              ))}
          </Swiper>
        </section>
      ) : (
        <Loader />
      )}
    </>
  );
}
