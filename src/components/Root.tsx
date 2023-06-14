import {Navigate, Route, Routes} from 'react-router-dom'
import {paths} from '../constants'
import {Home} from './Home'
import {About} from './About'
export const Root = () => {
 const {about, home} = paths
 return <Routes>
  <Route path={home} element={<Home/>}/>
  <Route path={about} element={<About/>}/>
  <Route path={'*'} element={<Navigate to={home} replace/>}/>
 </Routes>
}