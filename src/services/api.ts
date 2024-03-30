
const url = 'https://api.themoviedb.org/3/movie/'
let urlConfiguration = 'https://api.themoviedb.org/3/configuration'
export const urlImages = 'http://image.tmdb.org/t/p/original/'
const token = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZGE1ODI5MmFhOWI1MTA2OWFmYjhkMjIyMWExMWQyMiIsInN1YiI6IjY2MDc2MWQ5ZDUxOTFmMDE3ZTMwMWYyOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9Bbfgv1FESsjceeOmn_gt8mhzgkhcX47tV_iVp9MHFQ'

export async function allMovies(type: string = 'now_playing'){
    try {
        let response = await fetch(`${url}${type}`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: token
            }
        })
        let data = await response.json()
        return data
    } catch (error) {
        return error
    }
}