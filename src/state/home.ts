import {combine, createEffect, createEvent, createStore, sample} from 'effector'
import testPeople from './test/people.json'
import ky from "ky";
import {debounce, not} from "patronum";
import {result} from "lodash";

const PROD = true
const BASE_URL = 'https://swapi.dev/api/'

export interface IPeople {
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
    results: IPeople[]
}

export const fetchPeopleFx = createEffect<void, IPeoplePayload, Error>(async () => {
    const req = await ky.get(BASE_URL + 'people')
    if (!PROD) return testPeople
    return req.json()
})

export const searchFx = createEffect<string, IPeoplePayload, Error>(async (search) => {
    const req = await ky.get(BASE_URL+'people', {
        searchParams: {
            search,
        }
    })
    return req.json()
})

export const $people = createStore<IPeople[]>([])
const peopleChanged = createEvent<IPeople[]>()

fetchPeopleFx.done.watch(({result}) => {
    peopleChanged(result.results)
    countChanged(result.count)
})

export const $count = createStore<number>(0)
const countChanged = createEvent<number>()

export const $pending = createStore<boolean>(false)
$pending.on([searchFx.pending], (_, pending) => pending)

export const $search = createStore<string>('')
export const searchChanged = createEvent<string>()
const performSearch = debounce({source: searchChanged, timeout: 500})

$people
    .on(peopleChanged, (state, payload) => payload)

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