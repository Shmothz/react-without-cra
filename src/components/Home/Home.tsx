import {useEffect} from 'react'
import {getPhotocardsFx} from '../../state/home'

export const Home =() => {

 useEffect(() => {
  getPhotocardsFx()
 },[])

 return <div>Home</div>
}