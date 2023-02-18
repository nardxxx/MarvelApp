import React, { useEffect, useState, useRef } from 'react';

import Spinner from '../spinner/Spinner';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/errorMessage';
import PropTypes from 'prop-types';

import { CSSTransition, TransitionGroup, } from 'react-transition-group';

import './charList.scss';

const setContent = (process, Component, newItemLoading) => {
    switch (process) {
        case 'waiting':
            return <Spinner />
        case 'loading':
            return newItemLoading ? <Component /> : <Spinner />
        case 'confirmed':
            return <Component />
        case 'error':
            return <ErrorMessage />
        default:
            throw new Error('Unexpected process state');
    }
}

const CharList = (props) => {
    const [chars, setChars] = useState([]),
        [newItemLoading, setNewItemLoading] = useState(false),
        [offset, setOffset] = useState(210),
        [charEnded, setCharEnded] = useState(false),
        [charId, setCharId] = useState(null);

    const { loading, error, getAllCharacters } = useMarvelService();

    useEffect(() => onRequest(offset, true), []);

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset)
            .then(onCharListLoaded)
            .then();
    }

    const onCharListLoaded = (newChars) => {
        let ended = false;
        if (newChars.length < 9) ended = true;

        setChars(charlist => [...chars, ...newChars]);
        setNewItemLoading(false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended);
    }

    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    function renderItems(arr) {
        let delay = 0;
        let delayJump = 100;
        const items = arr.map((item, i) => {
            let imgStyle = { 'objectFit': 'cover' };
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = { 'objectFit': 'unset' };
            }
            if (delay >= 900) delay = 100
            else delay += delayJump
            return (
                <CSSTransition
                    timeout={100}
                    classNames="char__item">
                    <li
                        style={{ transition: `opacity 500ms ease ${delay}ms, transform 0.3s ease` }}
                        className={`char__item`}
                        ref={el => itemRefs.current[i] = el}
                        key={item.id}
                        tabIndex={i + 1}
                        onClick={
                            () => {
                                props.onCharSelected(item.id);
                                focusOnItem(i);
                                setCharId(item.id);
                            }
                        }
                        onKeyPress={
                            (e) => {
                                if (e.key == ' ' || e.key == 'Enter') {
                                    props.onCharSelected(item.id);
                                    focusOnItem(i);
                                    setCharId(item.id);
                                }
                            }
                        }>
                        <img src={item.thumbnail} alt={item.name} style={imgStyle} />
                        <div className="char__name">{item.name}</div>
                    </li>
                </CSSTransition>
            )
        });
        // А эта конструкция вынесена для центровки спиннера/ошибки
        return (
            <TransitionGroup className="char__grid" component='ul'>
                {items}
            </TransitionGroup>
        )
    }

    const items = renderItems(chars);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !newItemLoading ? <Spinner /> : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {items}

            <button
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{ 'display': charEnded ? 'none' : 'block' }}
                onClick={() => onRequest(offset)}>
                <div className="inner">{newItemLoading ? <Spinner width='100%' height="18px" /> : 'load more'}</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func
}

export default CharList;









