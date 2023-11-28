import {
 FC, RefObject,
 useState
} from 'react'
import {$favsCharacters, favsChanged, IChar} from '../model'
import s from './Card.module.scss'
import cn from 'classnames'
import {Modal} from '../../common/Modal'
import {ModalCard} from './ModalCard'
import {useEvent, useStore} from 'effector-react'
import {Button} from "../../common/Button";

interface IProps {
    item: IChar
 lastElementRef?: RefObject<HTMLDivElement>
}

export const Card: FC<IProps> = ({item, lastElementRef}) => {

 const isFav = useStore($favsCharacters).includes(item.name)
 const handleClick = useEvent(favsChanged)

 const [isVisible, setVisible] = useState<boolean>(false)
 const handleVisible = () => setVisible(!isVisible)

 return <>
  <div className={s.container} ref={lastElementRef}>
   <div className={s.card}>
    <span className={s.name}>{item.name}</span>
    <span>Gender: {item.gender}</span>
    <span>Height: {item.height}, mass: {item.mass}</span>
    <span>Birth year: {item.birth_year}</span>
    <Button onClick={handleVisible} text={'Карточка персонажа'} color={'primary'} />
    <Button onClick={() => handleClick(item.name)} text={isFav ? 'Удалить из избранного' : 'Добавить в избранное'}  color={!isFav ? "yes" : 'no'} />
   </div>
  </div>
  <Modal Content={<ModalCard char={item}/>} isVisible={isVisible} setVisible={setVisible}/>
 </>
}