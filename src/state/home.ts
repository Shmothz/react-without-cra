import {combine, createEffect, createEvent, createStore} from 'effector'
import testPeople from './test/people.json'

const initialStore = [] as IPeople[]
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
    next: string
    previous: null
    results: IPeople[]
}

interface QueryParams {
    name: string
}


export const getPeopleFx = createEffect<QueryParams, IPeoplePayload, Error>(async ({name}) => {
    const req = await fetch(BASE_URL + `people/${name && `?search=${name}`}`)
    if (!PROD) return testPeople
    return req.json()
})
const setPeople = createEvent<IPeople[]>()
getPeopleFx.done.watch(({result}) => setPeople(result.results))
const setCount = createEvent<number>()
getPeopleFx.done.watch(({result}) => setCount(result.count))

export const $people = createStore<IPeople[]>(initialStore)
export const $count = createStore<number>(0)
export const $home = combine({
    isFetching: getPeopleFx.pending,
    people: $people,
    count: $count,
})
$people
    .on(setPeople, (state, payload) => payload)
$count
    .on(setCount, (state, payload) => payload)
