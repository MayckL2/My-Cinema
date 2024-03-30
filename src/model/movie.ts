export type movieType = {
    id: number,
    backdrop_path: string,
    title: string,
    overview: string,
    poster_path: string,
    adult: boolean,
}

export type chairType = {
    id: number,
    preferential: boolean,
    especial: boolean
}

// contagem de cadeiras na sala
export function movieRoom(){
    let chairs: chairType[] = []
    let i = 0

    // 15 cadeiras preferenciais
    for (i = i; i < 15; i++) {
        chairs.push({
            id: i,
            preferential: true,
            especial: false
        })        
    }

    // 25 cadeiras especiais
    for (i = i; i < 90; i++) {
        chairs.push({
            id: i,
            preferential: false,
            especial: false
        })        
    }

    // 25 cadeiras especiais
    for (i = i; i < 120; i++) {
        chairs.push({
            id: i,
            preferential: false,
            especial: true
        })        
    }

    // 160 cadeiras normais
    for (i = i; i < 195; i++) {
        chairs.push({
            id: i,
            preferential: false,
            especial: false
        })        
    }
    console.log(i)

    return chairs.reverse()
}