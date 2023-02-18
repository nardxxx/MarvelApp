import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import './comicsList.scss';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';

const ComicsList = () => {
    const { getAllComics, loading, error } = useMarvelService();

    const [comics, setComics] = useState([]);
    const [offset, setOffset] = useState(8);
    const [newItemLoading, setNewItemLoading] = useState(false);

    useEffect(() => {
        onRequest(offset);
    }, []);


    const onRequest = (offset) => {
        setNewItemLoading(true);
        getAllComics(offset)
            .then(onComicsListLoaded)
            .then(setOffset(offset + 8));
    }

    const onComicsListLoaded = (comicsArr) => {
        setComics([...comics, ...comicsArr]);
        setNewItemLoading(false);
    }

    const renderItems = (arr) => {
        const items = arr.map((item, i) => {
            let { title, price, thumbnail } = item;
            if (price == 0) price = 'NOT AVAILABLE'
            else price = price + '$'
            return (
                <li className="comics__item" key={i}>
                    <Link
                        to={`/comics/${item.id}`}
                        onFocus={e => e.target.parentElement.classList.add('active')}
                        onBlur={e => e.target.parentElement.classList.remove('active')}>
                        <img src={thumbnail} alt="ultimate war" className="comics__item-img" />
                        <div className="comics__item-name">{title}</div>
                        <div className="comics__item-price">{price}</div>
                    </Link>
                </li >
            )
        })
        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const items = renderItems(comics);

    const button =
        <button disabled={newItemLoading} onClick={(offset) => onRequest(offset)} className="button button__main button__long">
            <div className="inner">{newItemLoading ? <Spinner width='100%' height="18px" /> : 'load more'}</div>
        </button>;

    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;

    return (
        <div className="comics__list" >
            {errorMessage}
            {spinner}
            {items}
            {comics.length > 0 ? button : null}
        </div >
    )
}

export default ComicsList;

