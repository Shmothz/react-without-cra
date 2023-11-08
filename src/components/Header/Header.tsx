import {Link} from 'react-router-dom'
import s from './Header.module.scss'
import {paths} from '../../constants'

export const Header = () => {

 const {favourites, main} = paths

 const options = [
  {label: 'Main', path: main},
  {label: 'Favourites', path: favourites},
 ]
 return <div className={s.container}>
  {options.map((option) => <Link to={option.path} key={option.path} className={s.link}>{option.label}</Link>)}
 </div>
}