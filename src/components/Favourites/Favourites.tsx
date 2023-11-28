import {FavouritesService} from '../../utils/FavouritesService'
import {NotFound} from '../common/NotFound'
import {useEvent, useStore} from 'effector-react'
import {$pending, favsChanged} from '../Main/model'
import {Preloader} from '../common/Preloader'
import s from './Favourites.module.scss'
import {useState} from "react";

export const Favourites = () => {

 const pending = useStore($pending)
 const [favsChars, setFavsChars] = useState(FavouritesService.getFavourites() || [])
 const changeEvent = useEvent(favsChanged)

 const handleClick = (char: string) => {
  setFavsChars(favsChars.filter(name => name !== char))
  changeEvent(char)
 }

 if (pending) return <Preloader/>

 if (!favsChars.length) return <NotFound message={'Ничего не добавлено в избранное'}/>

 return <div className={s.container}>{
  favsChars.map((char) => <div key={char} className={s.fav}>
   {char}
   <button className={s.btn} onClick={() => handleClick(char)}>Удалить из избранного</button>
  </div>)
 }</div>
}