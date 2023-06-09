import {createEvent, createStore} from 'effector'

const aboutStore = {}

export type IAbout = {}

interface IAddNewCommentFx {
 id: null
 text: string
}

const addNewCommentFx = createEvent<IAddNewCommentFx>()

export const $about = createStore<IAbout>(aboutStore).on(addNewCommentFx, (state, action) => {
 console.log(state, action)
 return {...state}
})
