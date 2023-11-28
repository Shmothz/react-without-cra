import {Navigate, Route, Routes} from 'react-router-dom'
import {paths} from '../constants'
import {Main} from './Main'
import {Favourites} from './Favourites'
import s from './Root.module.scss'
import React from 'react'
import {FullCard} from './FullCard'

export const Root = () => {
 const {favourites, cards} = paths
 return <div className={s.container}>
  <Routes>
   <Route path={cards} element={<Main/>}/>
   <Route path={cards + '/:name'} element={<FullCard/>}/>
   <Route path={favourites} element={<Favourites/>}/>
   <Route path={'*'} element={<Navigate to={cards} replace/>}/>
  </Routes>
 </div>
}