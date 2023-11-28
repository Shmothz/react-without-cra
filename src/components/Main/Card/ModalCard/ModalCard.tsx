import {FC} from 'react'
import {IChar} from '../../model'
import s from './ModalCard.module.scss'
import cn from 'classnames'
import {useNavigate} from 'react-router-dom'
import {paths} from "../../../../constants";
import {Button} from "../../../common/Button";

interface IProps {
    char: IChar
}

export const ModalCard: FC<IProps> = ({char}) => {

    const navigate = useNavigate()
    const {cards} = paths
    const handleClick = () => {
        console.log('click')
        navigate(`${cards}/${char.name}`, {
            state: char,
        })
    }

    return <div className={s.container}>
        <h3>Каша информации об персонаже</h3>

        <span>Имя: {char.name}</span>
        <span>Пол: {char.gender}</span>
        <span>Рост: {char.height}</span>
        <span>Вес: {char.mass}</span>
        <span>Цвет кожи: {char.skin_color}</span>
        <span>Цвет глаз: {char.eye_color}</span>
        <span>Цвет волос: {char.hair_color}</span>
        <span>Год рождения: {char.birth_year}</span>

        <Button text={'Перейти на полную страницу персонажа'} onClick={handleClick} color={'primary'} />
    </div>
}