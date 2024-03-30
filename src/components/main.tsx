import { useEffect, useState } from "react";
import { allMovies } from "../services/api";
import Carousel from "./carousel";
import { movieType } from "../model/movie";
import { Button, Skeleton } from "@mui/material";
import { BsFillCameraReelsFill } from "react-icons/bs";
import Carousel2 from "./carousel2";

export default function Main() {
    const [movies, setMovies] = useState<{
        carousel: movieType[],
        now_playing: movieType[]
    }>()


    async function loadMovies() {
        let response = await allMovies()
        console.log(response)
        if(response){
            setMovies({
                carousel: response.results.filter((_value: movieType, index: number) => index < 5),
                now_playing: response.results.filter((_value: movieType, index: number) => index > 5 && index < 15),
                // carousel: [response.results[0], response.results[1], response.results[2], response.results[3]]
            })
        }
    }

    useEffect(() => {
        loadMovies()
    }, [])

    return (
        <main className="h-[50rem]">
            <section className="px-4">
                {movies &&
                    <Carousel movies={movies.carousel} />
                }
                {!movies && <div className="relative w-full h-96">
                    <div className="absolute bottom-4 sm:left-8 z-20 flex flex-col gap-4 justify-center w-full sm:w-1/2">
                        <Skeleton animation="wave" variant="rounded" height={40} />
                        <Skeleton animation="wave" variant="rounded" height={100} />
                        <div className="flex gap-2 items-center">
                            <Skeleton animation="wave" variant="rounded" width={100} height={50} />
                            <Skeleton animation="wave" variant="rounded" width={100} height={50} />
                            <Skeleton animation="wave" variant="rounded" width={100} height={50} />
                        </div>
                    </div>
                </div>}
            </section>

            <section className="pt-12 px-4 sm:px-8 container mx-auto">
                {movies &&
                    <>
                        <div className='flex gap-2 items-center'>
                            <h3 className="text-2xl font-bold">Now Playing</h3>
                            <BsFillCameraReelsFill />
                        </div>
                        <Carousel2 movies={movies.now_playing} />
                    </>
                }
                {!movies &&
                    <>
                        <div className='flex gap-2 items-center'>
                            <Skeleton animation="wave" variant="rounded" width={250} height={30} />
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-4">
                            {[1, 1, 1].map((value, key) => {
                                return <div key={key} aria-label={`skeleton ${value}`} className='grid gap-2'>
                                    <Skeleton animation="wave" variant="rounded"  height={90} />
                                    <Skeleton animation="wave" variant="rounded" width={'70%'} height={30} />
                                    <Skeleton animation="wave" variant="rounded"  height={40} />
                                    <div className="grid grid-cols-2 gap-4">
                                        <Skeleton animation="wave" variant="rounded" height={40} />
                                        <Skeleton animation="wave" variant="rounded" height={40} />
                                    </div>
                                </div>
                            })}
                        </div>
                    </>
                }
            </section>
        </main>
    )
}