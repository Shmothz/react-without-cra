import {Navigate, Route, Routes} from 'react-router-dom'
import {paths} from '../constants'
import {lazy, Suspense} from 'react'
import {Home} from './Home'
import {About} from './About'

// const Home = lazy(() => import('./Home')
//  .then(({Home}) => ({default: Home})),
// )
// const About = lazy(() => import('./About')
//  .then(({About}) => ({default: About})),
// )
export const Root = () => {
 const {about, home} = paths
 return <Suspense fallback={<div>Loading...</div>}><Routes>
  <Route path={home} element={<Home/>}/>
  <Route path={about} element={<About/>}/>
  <Route path={'*'} element={<Navigate to={home} replace/>}/>
 </Routes></Suspense>
}