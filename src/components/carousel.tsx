import Slider from "react-slick";
import { movieType } from "../model/movie";
import { urlImages } from "../services/api";
import { Button, Chip } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
    const [hours, setHours] = useState('')

    useEffect(()=>{
        horarios()
    },[])

    // retorna horarios e datas das sessões
    function horarios(){
        let hora = Math.floor(Math.random() * 25) + 10
        let minuto = Math.floor(Math.random() * 60)
        let data = moment().format('L').split('/')
        let dia = Number(data[1]) >= 28 ? '01' : Number(data[1]) + 1
        let mes: string | number
        
        if(Number(data[1]) >= 28){
            mes = Number(data[1]) >= 10 ? data[0] : '0' + data[0]
        }else{
            mes = data[1]
        }

        setHours(`${dia}/${mes} ${hora}:${minuto}`)
    }

    return (<Slider {...settings}>
        {props.movies.map((value: movieType, key: number) => {
            return <div key={key} className="relative w-full h-96">
                <span className="poster absolute w-full h-full z-10"></span>
                <img className="opacity-70 h-96 w-full object-cover" src={urlImages + value.backdrop_path} alt={value.title} />
                <div className="absolute bottom-4 sm:left-8 z-20 flex flex-col gap-4 justify-center w-full sm:w-1/2">
                    <p className=" font-bold capitalize text-4xl">{value.title}</p>
                    <span className="text-xl font-bold w-[98%] h-20 overflow-hidden">{value.overview}</span>
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