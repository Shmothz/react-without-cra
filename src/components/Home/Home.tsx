import {$home, $people, getPeopleFx} from '../../state/home'
import {useList, useStore} from 'effector-react'
import {useEffect} from 'react'
import {Card} from './Card'
import s from './Home.module.scss'

export const Home = () => {
 const {isFetching, count} = useStore($home)
 const people = useList($people, (item) => <Card item={item}/>)
 useEffect(() => {
  getPeopleFx()
 }, [])
 if (isFetching) return <div>Loading...</div>
 return <div>
  <div className={s.counter}>Всего персонажей: {count}</div>
  <div className={s.container}>{people}</div>
 </div>
}