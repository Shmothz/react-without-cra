import {$count, $people, $search, fetchMorePeopleFx, fetchPeopleFx, searchChanged} from './model'
import {useEvent, useStore, useUnit} from 'effector-react'
import {
    ChangeEvent,
    useEffect,
    useRef,
} from 'react'
import {Card} from './Card'
import s from './Main.module.scss'
import {Preloader} from '../common/Preloader'
import {SectionService} from "../../utils/SectorService";

export const Main = () => {
    const [count, search] = useUnit([$count, $search])
    const [pending, pendingMore] = useUnit([fetchPeopleFx.pending, fetchMorePeopleFx.pending])
    const searchEvent = useEvent(searchChanged)
    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        searchEvent(e.target.value)
    }
    const people = useStore($people)

    useEffect(() => {
        fetchPeopleFx().finally()
        return () => {
            SectionService.resetSection()
        }
    }, [])

    // Обработчик событий для бесконечного скролла и подгрузки данных. Не сделан из-за недостаточности навыков с Effector.
    const lastElementRef = useRef<HTMLDivElement>(null)
    const observerHandler = (entries: IntersectionObserverEntry[]) => {
        const [entry] = entries
        if (entry.isIntersecting) {
            if (pendingMore) return
            if (!(people.length < count)) return
            SectionService.setSection(SectionService.getSection() + 1)
            fetchMorePeopleFx(SectionService.getSection()).finally()
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
        <div className={s.list}>{people.map((char, index) => {
            if (index + 1 === people.length) return <Card key={char.name} item={char} lastElementRef={lastElementRef}/>
            return <Card key={char.name} item={char}/>
        })}
            {pendingMore && <div className={s.smallLoader}><Preloader/></div>}</div>

    </div>
}