import {Link} from 'react-router-dom'

export const Header = () => {
 const options = [
  {label: 'About', path: 'about'},
  {label: 'Home', path: 'home'},
 ]
 return <div>
  {options.map((option) => <Link to={option.path} key={option.path}><span>{option.label}</span></Link>)}
 </div>
}