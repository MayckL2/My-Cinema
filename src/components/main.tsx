import { useEffect, useState } from "react";
import { allMovies } from "../services/api";
import Carousel from "./carousel";
import { movieType } from "../model/movie";

export default function Main() {
    const [data, setData] = useState<movieType[]>()

    async function loadMovies() {
        let response = await allMovies()
        console.log(response)
        setData([response.results[0], response.results[1], response.results[2], response.results[3]])
        return response
    }

    useEffect(() => {
        loadMovies()
    }, [])

    return (
        <main className="slider-container">
            <section className="">
                {data &&
                    <Carousel movies={data} />
                }
            </section>
        </main>
    )
}