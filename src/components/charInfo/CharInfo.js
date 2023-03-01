import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';


import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import Skeleton from '../skeleton/Skeleton'

import useMarvelService from '../../services/MarvelService';

import './charInfo.scss';
import { Link } from 'react-router-dom';

function CharInfo(props) {
    const [char, setChar] = useState(null);

    const { loading, error, getCharacter, clearError } = useMarvelService();

    useEffect(() => {
        updateChar();
    }, []);

    useEffect(() => {
        updateChar();
    }, [props.charId])

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = () => {
        const { charId } = props;

        if (!charId) {
            return;
        }
        clearError();

        getCharacter(charId)
            .then(onCharLoaded)
    }

    const skeleton = char || loading || error ? null : <Skeleton />
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki, comics, styles } = char;

    const limitedComicsList = [];

    for (let i = 0; i < comics.length; i++) {
        if (i >= 9) break;
        console.log();
        limitedComicsList.push(
            <li key={i + 1} className="char__comics-item">
                <Link to={`comics/${comics[i].resourceURI.slice(43)}`}>{comics[i].name}</Link>
            </li>)
    }

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} style={styles} alt={name} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length <= 0 ? 'There is not comics with this character' : null}
                {
                    limitedComicsList
                }
            </ul>
        </>
    )
}

// CharInfo.defaultProps = {
//     charId: PropTypes.string
// }
// CharInfo.propTypes = {
//     charId: PropTypes.number
// }

export default CharInfo;