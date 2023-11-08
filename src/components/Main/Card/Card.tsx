import {
 FC,
 useEffect,
 useState
} from 'react'
import {IPeople} from '../../../state/home'
import s from './Card.module.scss'
import cn from 'classnames'
import {Modal} from '../../common/Modal'
import {FullCard} from './FullCard'

interface IProps {
    item: IPeople
    favCharacters: Array<string>
    changeFav: (name: string, isFav: boolean) => void
}

export const Card: FC<IProps> = ({item, favCharacters, changeFav}) => {

 const [isFav, setFav] = useState<boolean>(favCharacters.includes(item.name))
 useEffect(() => {
  setFav(favCharacters.includes(item.name))
 }, [favCharacters])

 const [isVisible, setVisible] = useState<boolean>(false)
 const handleVisible = () => setVisible(!isVisible)

 return <>
  <div className={s.container}>
   <div className={s.card}>
    <span className={s.name}>{item.name}</span>
    <span>Gender: {item.gender}</span>
    <span>Height: {item.height}, mass: {item.mass}</span>
    <span>Birth year: {item.birth_year}</span>
    <button onClick={handleVisible} className={cn(s.btn, s.modalBtn)}>Карточка персонажа</button>
    <button onClick={() => changeFav(item.name, isFav)}
     className={cn(s.btn, !isFav ? s.y : s.n)}>{isFav ? 'Удалить из избранного' : 'Добавить в избранное'}</button>
   </div>
  </div>
  <Modal Content={<FullCard item={item}/>} isVisible={isVisible} setVisible={setVisible}/>
 </>
}