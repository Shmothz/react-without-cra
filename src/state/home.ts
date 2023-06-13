import {createEffect, createEvent, createStore} from 'effector'

const homeStore = {} as IHome

interface IPeople {
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

interface IHome {
 photocards: IPeople
}

export const getPhotocardsFx = createEffect(async () => {
 // const request = await ky.get('https://swapi.dev/api/people')
 const req = await fetch('https://swapi.dev/api/people')
 return req.json()
})
export const setPhotocardsFx = createEvent()
const $home = createStore<IHome>(homeStore)
 .on(getPhotocardsFx.doneData,(state, payload) => payload)
 .on(setPhotocardsFx, (state,action) => {
  console.log('click', state, action)
 })
$home.watch(data => {
})
export default $home