import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
import AppBanner from '../appBanner/AppBanner'
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';

const SinglePage = ({ Component, dataType }) => {
    const { loading, error, getComic, getCharacterByName, clearError } = useMarvelService();
    const { id } = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        updateData();
    }, [id])

    const updateData = () => {
        clearError();

        switch (dataType) {
            case 'comic':
                getComic(id)
                    .then(onDataLoaded)
                break;
            case 'char':
                getCharacterByName(id)
                    .then(onDataLoaded)
                break;
            default:
                break;
        }

    }

    const onDataLoaded = (data) => {
        setData(data);
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !data) ? <Component data={data} /> : null
    return (
        <>

            <AppBanner />
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

export default SinglePage