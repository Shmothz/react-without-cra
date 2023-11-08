import {createPortal} from 'react-dom'
import {Dispatch, FC, MouseEventHandler, ReactNode, SetStateAction} from 'react'
import s from './Modal.module.scss'

interface IModalProps {
    isVisible: boolean
    setVisible: Dispatch<SetStateAction<boolean>>
    Content: ReactNode
}

export const Modal: FC<IModalProps> = ({isVisible, setVisible, Content}) => {

 const root = document.getElementById('root') as HTMLDivElement
 const outClick = () => setVisible(false)
 const inClick: MouseEventHandler<HTMLDivElement> = (e) => {
  e.stopPropagation()
 }

 if (!isVisible) return null

 return createPortal(<div className={s.background} onClick={outClick}>
  <div className={s.container} onClick={inClick}>
   {Content}
  </div>
 </div>, root)
}