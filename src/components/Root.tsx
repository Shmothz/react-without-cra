import {Navigate, Route, Routes} from 'react-router-dom'
import {paths} from '../constants'
import {Main} from './Main'
import {Favourites} from './Favourites'
import s from './Root.module.scss'

export const Root = () => {
 const {favourites, main} = paths
 return <div className={s.container}>
  <Routes>
   <Route path={main} element={<Main/>}/>
   <Route path={favourites} element={<Favourites/>}/>
   <Route path={'*'} element={<Navigate to={main} replace/>}/>
  </Routes>
 </div>
}