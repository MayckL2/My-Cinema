import { useParams } from "react-router-dom"
import { movieDetail, urlImages } from "../services/api"
import { useEffect, useState } from "react"
import { chairType, movieRoom, movieType } from "../model/movie"
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Checkbox } from "@mui/material"
import { FaWheelchair } from "react-icons/fa";
import { MdChair } from "react-icons/md";
import { GiStoneThrone } from "react-icons/gi";
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement } from "../services/counter"
import Ticket from "../components/ticket"

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
                    <img src={urlImages + data.backdrop_path} alt={data.title} />
                </div>
                <section className="relative grid gap-14 container mx-auto">
                    <div className="flex gap-14">
                        <div className="w-56 relative -top-40 left-[2%]">
                            <img src={urlImages + data.poster_path} alt={data.title} />
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

                    <div className="grid grid-cols-line px-2 justify-center">
                        {chairs && chairs.map((value: chairType, key: number) => {
                            if (value.preferential) return <div key={key} onClick={() => handleChair(value)} className={`grid justify-center divider py-2 border-2 cursor-pointer ${count.find((v: chairType)=> value.id == v.id) && 'text-lime-500 border-lime-500'} hover:text-lime-500 transition-all`}>
                                <FaWheelchair className="text-lg lg:text-xl" />
                                <p className='text-xs'>{value.id}</p>
                            </div>
                            if (value.especial) return <div key={key} onClick={() => handleChair(value)} className={`grid justify-center divider py-2 border-2 cursor-pointer ${count.find((v: chairType)=> value.id == v.id) && 'text-lime-500 border-lime-500'} hover:text-lime-500 transition-all`}>
                                <GiStoneThrone className="text-lg lg:text-xl" />
                                <p className='text-xs'>{value.id}</p>
                            </div>
                            return <div key={key} onClick={() => handleChair(value)} className={`grid justify-center divider py-2 border-2 cursor-pointer ${count.find((v: chairType)=> value.id == v.id) && 'text-lime-500 border-lime-500'} hover:text-lime-500 transition-all`}>
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
                    {count.map((value: chairType, key: number)=>{
                        return <Ticket key={key} chair={value.id} type={value.especial ? 'especial' : value.preferential ? 'preferential' : 'normal'}/>
                    })}
                    <p>nao sei oque, nao sei oque</p>
                </div>
            </aside>
        }
    </main>)
}