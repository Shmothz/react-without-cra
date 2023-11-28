import {forwardRef, MouseEventHandler} from "react"
import s from './Button.module.scss'

interface IButton {
    text: string
    onClick: MouseEventHandler<HTMLButtonElement>
    color: 'no' | 'primary' | 'yes'
}

export const Button = forwardRef<HTMLButtonElement, IButton>(({text, onClick, color}, ref) => {

    const style = () => {
        switch (color) {
            case "yes":
                return 'darkseagreen'
            case "no":
                return 'tomato'
            case "primary":
                return 'cadetblue'
            default:
                return 'white'
        }
    }

    return <button ref={ref} onClick={onClick}
                   className={s.btn}
                   style={{backgroundColor: style()}}
    >{text}</button>
})