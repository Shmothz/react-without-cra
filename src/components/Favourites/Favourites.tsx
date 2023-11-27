import {FavouritesService} from '../../utils/FavouritesService'
import {NotFound} from '../common/NotFound'
import {useStore} from 'effector-react'
import {$pending, $people} from '../../state/home'
import {useEffect, useState} from 'react'
import {Preloader} from '../common/Preloader'
import s from './Favourites.module.scss'

export const Favourites = () => {

 const people = useStore($people)
 const pending = useStore($pending)
 const [favCharacters, setFavCharacters] = useState<Array<string>>(FavouritesService.getFavourites() || [])
 // const filtersChars = people.filter((char) => favCharacters?.includes(char.name))

 // Контроль удаления избранных.
 useEffect(() => {
  FavouritesService.setFavourites(favCharacters)
 }, [favCharacters])
 // Удалить определенного персонажа из избранных.
 const handleChange = (name: string) => {
  setFavCharacters((prevState) => prevState.filter((favName) => favName !== name))
 }

 // Мы не можем запросить сразу весь список 82 персонажей чтобы отфильтровать по избранным именам. Поэтому отображаем имена и для дополнительного функционала можно сделать запрос по имени или ссылке.
 // useEffect(() => {
 //  getPeopleFx({name: ''}).finally()
 // }, [])

 if (pending) return <Preloader/>

 if (!favCharacters) return <NotFound message={'Ничего не добавлено в избранное'}/>

 return <div className={s.container}>{
  favCharacters.map((char) => <div key={char} className={s.fav}>
   {char}
   <button className={s.btn} onClick={() => handleChange(char)}>Удалить из избранного</button>
  </div>)
 }</div>
}