import {Audio} from 'react-loader-spinner'
import s from './Preloader.module.scss'

export const Preloader = () => {
 return <div className={s.container}>
  <Audio
   height="100px"
   width="100px"
   color="#CCC"
  />
 </div>
}