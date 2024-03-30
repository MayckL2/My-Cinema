import Slider from "react-slick";
import { movieType } from "../model/movie";
import { urlImages } from "../services/api";

export default function Carousel(props: { movies: movieType[] }) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 10000,
        cssEase: "linear",
        fade: true,
    }

    return (<Slider {...settings}>
        {props.movies.map((value: movieType, key: number) => {
            return <div key={key} className="relative w-full">
                <span className="poster absolute w-full h-full z-10"></span>
                <img className="opacity-70" src={urlImages + value.backdrop_path} alt={value.title} />
                <div className="absolute top-0 left-8 z-20 h-full flex flex-col gap-4 justify-center items-start w-full sm:w-1/2">
                    <p className=" font-bold capitalize text-3xl">{value.title}</p>
                    <span>{value.overview}</span>
                    <nav className="">
                        <button className="py-2 px-4 rounded font-bold hover:opacity-50 transition-all bg-sky-700">
                            Buy ticket
                        </button>
                    </nav>
                </div>
            </div>
        })}
    </Slider>)
}