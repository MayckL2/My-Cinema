import { useParams } from "react-router-dom"
import { movieDetail, urlImages } from "../services/api"
import { useEffect, useState } from "react"
import { chairType, movieRoom, movieType } from "../model/movie"
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Checkbox } from "@mui/material"
import { FaWheelchair } from "react-icons/fa";
import { MdChair } from "react-icons/md";
import { GiStoneThrone } from "react-icons/gi";

export default function BuyTicket() {
    const { movie } = useParams()
    const [data, setData] = useState<movieType>()
    const [age, setAge] = useState('');
    const [chairs, setChairs] = useState<chairType[]>()

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

    function handleChair(id: number){
        
    }

    useEffect(() => {
        loadDetails()
        loadChairs()
    }, [])

    return (<main>
        {data &&
            <>
                <div className="relative opacity-60 overflow-hidden h-60 sm:h-[50vh] object-fill">
                    <img src={urlImages + data.backdrop_path} alt={data.title} />
                </div>
                <section className="relative grid gap-14 container mx-auto">
                    <div className="flex gap-14">
                        <div className="w-56 relative -top-40 left-[2%]">
                            <img src={urlImages + data.poster_path} alt={data.title} />
                        </div>

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
                        </div>
                    </div>

                    <div className="grid grid-cols-line gap-1 px-2">
                        {chairs && chairs.map((value: chairType, key: number) => {
                            if (value.preferential) return <div key={key}>
                                <FaWheelchair className="hover:text-lime-500 text-lg transition-all cursor-pointer"/>
                            </div>
                            if (value.especial) return <div key={key}>
                                <GiStoneThrone className="hover:text-lime-500 text-lg transition-all cursor-pointer"/>
                            </div>
                            return <div key={key}>
                                <MdChair className="hover:text-lime-500 text-lg transition-all cursor-pointer"/>
                            </div>

                        })}
                    </div>
                </section>
            </>
        }
    </main>)
}