import {FC} from 'react'
import {IPeople} from '../../../../state/home'
import s from './FullCard.module.scss'

interface IProps {
    item: IPeople
}

export const FullCard: FC<IProps> = ({item}) => {

 return <div className={s.container}>
  {Object.values(item).map(char => {
   if (typeof char === 'string') return <div key={char} className={s.field}>{char}</div>
  })}
 </div>
}