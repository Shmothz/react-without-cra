import {FC} from 'react'
import {IPeople} from '../../../state/home'
import s from './Card.module.scss'

interface IProps {
 item: IPeople
}

export const Card: FC<IProps> = ({item}) => {
 return <div className={s.container}>
  <span className={s.name}>{item.name}</span>
  <span>Gender: {item.gender}</span>
  <span>Height: {item.height}, mass: {item.mass}</span>
  <span>Birth year: {item.birth_year}</span>
 </div>
}