import {$count, $pending, $people, $search, fetchPeopleFx, searchChanged} from '../../state/home'
import {useEvent, useList, useStore, useUnit} from 'effector-react'
import {
 ChangeEvent,
 useEffect,
 useRef,
 useState
} from 'react'
import {Card} from './Card'
import s from './Main.module.scss'
import {Preloader} from '../common/Preloader'
import {FavouritesService} from '../../utils/FavouritesService'

export const Main = () => {
 const [count, search] = useUnit([$count, $search])
 const pending = useStore(fetchPeopleFx.pending)
 const searchEvent = useEvent(searchChanged)
 const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
  searchEvent(e.target.value)
 }
 const people = useList($people, (people) => <Card
  item={people}
  favCharacters={favCharacters}
  changeFav={handleChange} />)

 useEffect(() => {
  fetchPeopleFx().finally()
 },[])

 const [favCharacters, setFavCharacters] = useState<Array<string>>(FavouritesService.getFavourites() || [])
 // Если что-то меняется в массиве избранных - сразу оформляем в локальное хранилище.
 useEffect(() => {
  FavouritesService.setFavourites(favCharacters)
 }, [favCharacters])
 const handleChange = (name: string, isFav: boolean) => {
  if (!isFav) {
   // Добавить.
   setFavCharacters((prevState) => [...prevState, name])
  } else {
   // Удалить.
   setFavCharacters((prevState) => prevState.filter((favName) => favName !== name))
  }
 }

 // Обработчик событий для бесконечного скролла и подгрузки данных. Не сделан из-за недостаточности навыков с Effector.
 const lastElementRef = useRef<HTMLDivElement>(null)
 const observerHandler = (entries: IntersectionObserverEntry[]) => {
  const [entry] = entries
  if (entry.isIntersecting) {
   // if (isFetchingMore) return Проверка на загрузку в моменте, избежание много-загрузочности.
   // if (count - people.length > 10) return Есть ли еще документы?
   console.log('Видим последний элемент')
  }
 }
 const options = {root: null, rootMargin: '0px', threshold: 0.2,}
 const lastElementObserve = new IntersectionObserver(observerHandler, options)
 useEffect(() => {
  const target = lastElementRef.current
  if (target) lastElementObserve.observe(target)
  return () => {
   if (target) lastElementObserve.unobserve(target)
  }
 }, [lastElementRef, options])

 if (pending) return <div><Preloader/></div>

 return <div className={s.container}>
  <div className={s.toolbar}><span className={s.counter}>Всего персонажей: {count}</span><input value={search}
   onChange={handleSearch}
   placeholder={'Начните поиск'}/>
  </div>
  <div className={s.list}>{people}</div>
 </div>
}