import { Link, useParams } from "react-router-dom"
import { movieDetail, urlImages } from "../services/api"
import { useEffect, useState } from "react"
import { chairType, movieRoom, movieType } from "../model/movie"
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Checkbox, Chip } from "@mui/material"
import { FaWheelchair } from "react-icons/fa";
import { MdChair } from "react-icons/md";
import { GiStoneThrone } from "react-icons/gi";
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement } from "../services/counter"
import Ticket from "../components/ticket"
import { FaArrowRightToBracket } from "react-icons/fa6";

export default function BuyTicket() {
    const { movie } = useParams()
    const [data, setData] = useState<movieType>()
    const [age, setAge] = useState('');
    const [chairs, setChairs] = useState<chairType[]>()
    const count = useSelector((state: any) => state.counter.value)
    const dispatch = useDispatch()

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };

    async function loadDetails() {
        if (movie) {
            let response = await movieDetail(movie)
            console.log(response)
            response && setData(response)
        }
    }

    function loadChairs() {
        let response = movieRoom()
        console.log(response)
        response && setChairs(response)
    }

    function handleChair(chair: chairType) {
        console.log(count)
        if (count.includes(chair)) {
            dispatch(decrement(chair))
        } else {
            dispatch(increment(chair))
        }
    }

    useEffect(() => {
        loadDetails()
        loadChairs()
    }, [])

    return (<main className="flex relative">
        {data &&
            <div className="">
                <div className="relative opacity-60 overflow-hidden h-60 sm:h-[50vh] object-fill">
                    <Link to={'/'}>
                        <FaArrowRightToBracket className="absolute top-4 right-4 text-xl w-12 h-12 text-white p-2 rounded bg-sky-700 hover:opacity-50 transition-all cursor-pointer"/>
                    </Link>

                    <img src={urlImages + data.backdrop_path} alt={data.title} />
                    
                    {data.adult &&
                        <span className="capitalize px-4 py-4 rounded-xl bg-black font-bold absolute right-4 bottom-4 text-center">
                            prohibited for children under 18
                        </span>
                    }
                </div>
                <section className="relative grid gap-4 container mx-auto">
                    <div className="flex gap-12 h-48">
                        <div className="w-56 relative -top-40 left-[2%] grid gap-2">
                            <img src={urlImages + data.poster_path} alt={data.title} />

                            <div className="flex gap-2 h-min justify-center flex-wrap">
                                {data.genres.map((value: { id: number, name: string }, key: number) => {
                                    return <span key={key} className="rounded p-2 font-bold bg-sky-800">{value.name}</span>
                                })}
                            </div>
                        </div>

                        <div className="pt-6 pr-6 flex flex-col gap-4 w-full">
                            <div className="flex justify-between">
                                <h2 className="text-3xl font-bold">{data.title}</h2>

                                <span className="px-2 w-min bg-sky-600 rounded flex items-center">{(data.runtime / 60).toFixed(2)}h</span>
                            </div>

                            <p className="font-bold p-4 rounded-lg bg-slate-700">{data.overview}</p>
                        </div>
                        {/* 
                        <div className="pt-8 w-full flex gap-4">
                            <FormControl className="w-full sm:w-48">
                                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={age}
                                    label="Age"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl className="w-full sm:w-48">
                                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={age}
                                    label="Age"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>

                            <div>
                                <Checkbox />
                            </div>
                        </div> */}
                    </div>

                    <div className="flex justify-center items-center pt-4">
                        <div className="grid grid-cols-3">
                            <span className=" flex flex-col items-center font-bold gap-2 px-2">
                                <FaWheelchair className="text-lg lg:text-xl" />
                                <p className="text-xs">Preferential</p>
                                <span className="text-sm">R$ 10.00</span>
                            </span>
                            <span className=" flex flex-col items-center font-bold gap-2 px-2">
                                <GiStoneThrone className="text-lg lg:text-xl" />
                                <p className="text-xs">Especial</p>
                                <span className="text-sm">R$ 30.00</span>
                            </span>
                            <span className=" flex flex-col items-center font-bold gap-2 px-2">
                                <MdChair className="text-lg lg:text-xl" />
                                <p className="text-xs">Normal</p>
                                <span className="text-sm">R$ 20.00</span>
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-line px-2 justify-center">
                        {chairs && chairs.map((value: chairType, key: number) => {
                            if (value.preferential) return <div key={key} onClick={() => handleChair(value)} className={`grid justify-center divider py-2 border-2 cursor-pointer ${count.find((v: chairType) => value.id == v.id) && 'text-lime-500 border-lime-500'} hover:text-lime-500 transition-all`}>
                                <FaWheelchair className="text-lg lg:text-xl" />
                                <p className='text-xs'>{value.id}</p>
                            </div>
                            if (value.especial) return <div key={key} onClick={() => handleChair(value)} className={`grid justify-center divider py-2 border-2 cursor-pointer ${count.find((v: chairType) => value.id == v.id) && 'text-lime-500 border-lime-500'} hover:text-lime-500 transition-all`}>
                                <GiStoneThrone className="text-lg lg:text-xl" />
                                <p className='text-xs'>{value.id}</p>
                            </div>
                            return <div key={key} onClick={() => handleChair(value)} className={`grid justify-center divider py-2 border-2 cursor-pointer ${count.find((v: chairType) => value.id == v.id) && 'text-lime-500 border-lime-500'} hover:text-lime-500 transition-all`}>
                                <MdChair className="text-lg lg:text-xl" />
                                <p className='text-xs'>{value.id}</p>
                            </div>

                        })}
                    </div>
                </section>
            </div>
        }
        {count.length > 0 &&
            <aside className="transition-all outline relative w-max flex flex-col items-center justify-center">
                <div className="sticky bottom-8 top-8 w-min">
                    {count.map((value: chairType, key: number) => {
                        return <Ticket key={key} chair={value} />
                    })}
                    {/* <p>nao sei oque, nao sei oque</p> */}
                </div>
            </aside>
        }
    </main>)
}