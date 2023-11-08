import {FC} from 'react'
import s from './NotFound.module.scss'

interface IProps {
    message?: string
}

export const NotFound: FC<IProps> = ({message}) => {
 return <div className={s.container}>
        Ничего не найдено.
  {message && <span className={s.message}>{message}</span>}
 </div>
}