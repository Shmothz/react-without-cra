import {Link} from 'react-router-dom'
import s from './Header.module.scss'

export const Header = () => {
 const options = [
  {label: 'Home', path: 'home'},
  {label: 'About', path: 'about'},
 ]
 return <div className={s.container}>
  {options.map((option) => <Link to={option.path} key={option.path} className={s.link}>{option.label}</Link>)}
 </div>
}