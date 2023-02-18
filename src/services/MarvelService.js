import { useHttp } from '../hooks/http.hook';

const useMarvelService = () => {
    const { loading, request, error, clearError } = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=0c147f3fb1ba1121177fc124b55cf56a';
    const _baseOffset = 210;


    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
    }

    const getAllComics = async (offset = 9) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?&${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const _transformComics = (comics) => {
        const { id, title, description, pageCount, thumbnail, textObjects, prices } = comics;
        return {
            id,
            title: title,
            description: description || 'There is no description',
            pageCount: pageCount ? `${pageCount} p.` : 'No information about the number of pages',
            thumbnail: thumbnail.path + '.' + thumbnail.extension,
            language: textObjects.language || 'en-us',
            price: prices[0].price ? `${prices[0].price}$` : 'not available'
        }
    }
    const _transformCharacter = (char) => {
        let { name, description, thumbnail, urls, id, comics } = char;
        description = description ? description : 'Description not found.';
        const styles = (thumbnail.path.match('image_not_available')) ? { objectFit: 'fill' } : null;

        return {
            name,
            description,
            thumbnail: thumbnail.path + '.' + thumbnail.extension,
            homepage: urls[0].url,
            wiki: urls[1].url,
            id,
            styles,
            comics: comics.items
        }
    }

    return {
        loading, error, clearError, getAllCharacters, getCharacter, getAllComics, getComic, getCharacterByName
    }
}

export default useMarvelService;