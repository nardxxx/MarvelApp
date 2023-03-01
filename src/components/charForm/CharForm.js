import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';

import { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import Spinner from '../spinner/Spinner';
import useMarvelService from '../../services/MarvelService';

import './charForm.scss'

const areEqual = (prevProps, nextProps) => {
    if (prevProps.heading === nextProps.heading) {
        return true                                    // donot re-render
    }
    return false                                     // will re-render
}

const CharForm = ({ props }) => {

    const { loading, error, getCharacterByName, clearError } = useMarvelService();
    const [inputVal, setInputVal] = useState('');
    const [char, setChar] = useState(null);

    const onSearchDone = (char, val) => {
        setChar(char);
        setInputVal(val)
    }
    const clearData = () => {
        setChar(null);
        clearError();
    }

    const result = char == null ? null :
        <div className="message">
            {char === 0 ? <div className='error'>The character was not found. Check the name and try again</div> : null}
            {char ?
                <>
                    <div className='success'>There is! Visit {char.name} page?</div>

                </> : null}
            {error ? <div className='error'>Something went wrong</div> : null}
        </div>

    return (
        <div className='formik'>
            <Formik
                initialValues={{ search: '' }}
                validationSchema={Yup.object({
                    search: Yup.string()
                        .required('This field is required'),
                })}
                onSubmit={
                    values => {
                        if (values.search !== inputVal) {
                            getCharacterByName(values.search)
                                .then(char => {
                                    onSearchDone(char, values.search);
                                })
                                .catch(() => {
                                    setChar(0)
                                })
                        }
                    }
                }>

                <Form className="char-form">
                    <label className="char-form__title">Or find a character by name:</label>
                    <Field
                        placeholder="Enter name"
                        className="char-form__input"
                        name="search" type="input"
                        onInput={() => clearData()} />
                    <div className='char-form__btns'>
                        <button
                            className="char-form__btn"
                            type="submit"
                            style={{ backgroundColor: loading ? '#61121b' : '' }}
                            disabled={loading}>{loading ? <Spinner height='70%' /> : 'Find'}</button>
                        {char ? <Link
                            to={char.name}
                            onFocus={e => e.target.parentElement.classList.add('active')}
                            onBlur={e => e.target.parentElement.classList.remove('active')}
                            className={`char-form__btn char-form__btn-gray`} >
                            Go To
                        </Link> : ''}
                    </div>

                    <FormikErrorMessage name="search"
                        component="div"
                        className='error'
                        styles={{ gridArea: 'error' }} />
                </Form >
            </Formik >
            {result}
        </div >

    )
}
// export default memo(CharForm, areEqual)

export default CharForm;

