import Slider from "react-slick";
import { movieType } from "../model/movie";
import { urlImages } from "../services/api";
import { Button, Chip } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Carousel2(props: { movies: movieType[] }) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        swipeToSlide: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 10000,
        cssEase: "linear",
        responsive: [
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                initialSlide: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
              }
            }
          ]
    }
    const [hours, setHours] = useState('')

    useEffect(() => {
        horarios()
    }, [])

    // retorna horarios e datas das sessões
    function horarios() {
        let hora = Math.floor(Math.random() * 25) + 10
        let minuto = Math.floor(Math.random() * 60)
        let data = moment().format('L').split('/')
        let dia = Number(data[1]) >= 28 ? '01' : Number(data[1]) + 1
        let mes: string | number

        if (Number(data[1]) >= 28) {
            mes = Number(data[1]) >= 10 ? data[0] : '0' + data[0]
        } else {
            mes = data[1]
        }

        setHours(`${dia}/${mes} ${hora}:${minuto}`)
    }

    return (<Slider {...settings} className="py-4">
        {props.movies.map((value: movieType, key: number) => {
            return <div key={key} className="relative w-full grid px-1 focus:outline-none">
                <img className="opacity-70 w-full" src={urlImages + value.backdrop_path} alt={value.title} />
                <div className="grid gap-4 justify-center w-full">
                    <div className="grid h-[96px]">
                        <p className=" font-bold capitalize text-xl max-h-[3.6rem] overflow-hidden">{value.title}</p>
                        <span className="text-sm opacity-50 font-bold max-h-10 overflow-hidden ">{value.overview}</span>
                    </div>
                    <nav className="flex gap-4 items-center flex-wrap">
                        <Link to={`./buyTicket/${value.id}`}>
                            <Button variant="contained">Buy ticket</Button>
                        </Link>
                        <Chip label={hours} variant="outlined" color="info" />
                        <Chip label={hours} variant="outlined" color="info" />
                        <Chip label={hours} variant="outlined" color="info" />
                    </nav>
                </div>
            </div>
        })}
    </Slider>)
}