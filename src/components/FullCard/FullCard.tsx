import {useLocation, useNavigate, useParams} from 'react-router-dom'
import {MouseEventHandler, useEffect, useState} from "react";
import {IChar} from "../Main/model";
import {paths} from "../../constants";
import {Button} from "../common/Button";

export const FullCard = () => {

    const location = useLocation()
    const navigate = useNavigate()

    const {cards} = paths

    const [char, setChar] = useState<IChar>(location.state)

    useEffect(() => {
        if (!location.state) navigate(cards)
        setChar(location.state)

    }, [location]);

    const handleClick = () => navigate(cards)

    return <div>
        <Button text={'К списку всех персонажей'} onClick={handleClick} color={'primary'} />
        {char.name}
    </div>
}