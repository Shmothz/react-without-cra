import {createEffect, createEvent, createStore, sample} from 'effector'
import testPeople from '../../test/people.json'
import ky from "ky";
import {debounce, not, pending} from "patronum";
import {FavouritesService} from "../../utils/FavouritesService";

const PROD = false
const BASE_URL = 'https://swapi.dev/api/'

export interface IChar {
    birth_year: string
    eye_color: string
    films: string[]
    gender: string
    hair_color: string
    height: string
    homeworld: string
    mass: string
    name: string
    skin_color: string
    created: string
    edited: string
    species: string[],
    starships: string[],
    url: string,
    vehicles: string[]
}

interface IPeoplePayload {
    count: number
    next: string | null
    previous: string | null
    results: IChar[]
}

export const fetchPeopleFx = createEffect<void, IPeoplePayload, Error>(async () => {
    const req = await ky.get(BASE_URL + 'people')
    if (!PROD) return testPeople
    return req.json()
})
export const fetchMorePeopleFx = createEffect<number, IPeoplePayload, Error>(async  (page) => {
    const req = await ky.get(BASE_URL + 'people',{
        searchParams: {
            page
        }
    })
    return req.json()
})

export const searchFx = createEffect<string, IPeoplePayload, Error>(async (search) => {
    const req = await ky.get(BASE_URL+'people', {
        searchParams: {
            search,
        }
    })
    if (!PROD) return testPeople
    return req.json()
})

export const $people = createStore<IChar[]>([])
const peopleChanged = createEvent<IChar[]>()

fetchPeopleFx.done.watch(({result}) => {
    peopleChanged(result.results)
    countChanged(result.count)
})
fetchMorePeopleFx.done.watch(({result}) => peopleChanged(result.results))

export const $count = createStore<number>(0)
const countChanged = createEvent<number>()

export const $pending = createStore<boolean>(false)
$pending.on([searchFx.pending], (_, pending) => pending)

export const $pendingMore = createStore<boolean>(false)
$pendingMore.on([fetchMorePeopleFx.pending], (_, pending) => pending)

export const $search = createStore<string>('')
export const searchChanged = createEvent<string>()
const performSearch = debounce({source: searchChanged, timeout: 500})

$people
    .on(peopleChanged, (state, payload) => [...state, ...payload])

$people.on(searchFx.doneData, (_, {results}) => results)

$count
    .on(countChanged, (state, payload) => payload)

$search.on(searchChanged, (_, search) => search)

sample({
    clock: performSearch, // 1. Если сработает функция clock.
    source: $search, // 4. Передадим туда параметры.
    filter: not(searchFx.pending), // 2. Проверим что текущей загрузки нет.
    target: searchFx  // 3. Вызовем эту функцию.
})

export const $favsCharacters = createStore(FavouritesService.getFavourites() || [])
export const favsChanged = createEvent<string>()
$favsCharacters.on(favsChanged, (favsChars, newFav) => {

    const isFav = favsChars?.includes(newFav)

    let newFavs

    if (!isFav) {
        // Добавить.
        newFavs = [...favsChars, newFav]
    } else {
        // Удалить.
        newFavs = favsChars.filter((favName => favName !== newFav))
    }

    FavouritesService.setFavourites(newFavs)

    return newFavs
})