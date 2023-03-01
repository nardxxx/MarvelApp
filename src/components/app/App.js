import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import './App.css'


import AppHeader from "../appHeader/AppHeader";
import Spinner from '../spinner/Spinner';

import SingleChar from '../pages/SingleCharPage';
import SinglePage from '../pages/SinglePage';

const SingleComic = lazy(() => import('../pages/SingleComicPage'));
const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));

//662кб
//786кб

const App = () => {
    return (
        <Router>
            <div className="app" >
                <AppHeader />
                <main>
                    <Suspense fallback={<Spinner />}>
                        <Routes>
                            <Route element={<MainPage />} path="/" />
                            <Route element={<ComicsPage />} path="/comics" />
                            <Route
                                path="/:id"
                                element={<SinglePage
                                    Component={SingleChar}
                                    dataType='char' />}
                            />
                            <Route
                                path="/comics/:id"
                                element={<SinglePage
                                    Component={SingleComic}
                                    dataType='comic' />}
                            />
                            <Route element={<Page404 />} path='*' />
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    )
}


export default App;



// TODO: Compare HOC and Custom hooks

const HooksAndHOC = {
    // import { useState, useEffect, Component } from 'react';
    // import { Container } from 'react-bootstrap';

    // const withSlider = (BaseComponent, getData) => {
    //     return (props) => {
    //         const [slide, setSlide] = useState(0);
    //         const [autoplay, setAutoplay] = useState(false)

    //         useEffect(() => {
    //             setSlide(getData());
    //         }, [])

    //         function changeSlide(i) {
    //             setSlide(slide => slide + i);
    //         }

    //         return <BaseComponent
    //             {...props}
    //             slide={slide}
    //             autoplay={autoplay}
    //             changeSlide={changeSlide}
    //             setAutoplay={setAutoplay} />
    //     }
    // }

    // const getDataFromFirstFetch = () => { return 10 };
    // const getDataFromSecondFetch = () => { return 20 };

    // const SliderFirst = (props) => {
    //     return (
    //         <Container>
    //             <div className="slider w-50 m-auto">
    //                 <img className="d-block w-100" src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg" alt="slide" />
    //                 <div className="text-center mt-5">Active slide {props.slide}</div>
    //                 <div className="buttons mt-3">
    //                     <button
    //                         className="btn btn-primary me-2"
    //                         onClick={() => props.changeSlide(-1)}>-1</button>
    //                     <button
    //                         className="btn btn-primary me-2"
    //                         onClick={() => props.changeSlide(1)}>+1</button>
    //                 </div>
    //             </div>
    //         </Container>
    //     )
    // }
    // //HOC - Higher order component

    // const SliderSecond = (props) => {
    //     return (
    //         <Container>
    //             <div className="slider w-50 m-auto">
    //                 <img className="d-block w-100" src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg" alt="slide" />
    //                 <div className="text-center mt-5">Active slide {props.slide} <br />{props.autoplay ? 'auto' : null} </div>
    //                 <div className="buttons mt-3">
    //                     <button
    //                         className="btn btn-primary me-2"
    //                         onClick={() => props.changeSlide(-1)}>-1</button>
    //                     <button
    //                         className="btn btn-primary me-2"
    //                         onClick={() => props.changeSlide(1)}>+1</button>
    //                     <button
    //                         className="btn btn-primary me-2"
    //                         onClick={() => props.setAutoplay(autoplay => !autoplay)}>toggle autoplay</button>
    //                 </div>
    //             </div>
    //         </Container>
    //     )
    // }

    // const SliderWithFirstFetch = withSlider(SliderFirst, getDataFromFirstFetch);
    // const SliderWithSecondFetch = withSlider(SliderSecond, getDataFromSecondFetch);

    // const withLogger = WrappedComponent => props => {
    //     useEffect(() => {
    //         console.log('first render!');
    //     }, []);

    //     return <WrappedComponent {...props} />
    // }


    // const Hello = () => {
    //     return (
    //         <h1>Hello</h1>
    //     )
    // }

    // const HelloWithLogger = withLogger(Hello);

    // function App() {
    //     return (
    //         <>
    //             <HelloWithLogger />
    //             <SliderWithFirstFetch />
    //             <SliderWithSecondFetch />
    //         </>
    //     );
    // }

    // export default App;


    //?СРАВНЕНИЕ Кастомных хуков, HOC'OB и reducer'a 

    // import { useState, useEffect, Component, useReducer } from 'react';
    // import { Container } from 'react-bootstrap';
    // import './App.css';



    // //!CUSTOM HOOk!!!

    // function useCounter(initial) {
    //     const [counter, setCounter] = useState(initial);

    //     const incCounter = () => {
    //         if (counter < 50) {
    //             setCounter(counter => counter + 1)
    //         }
    //     }

    //     const decCounter = () => {
    //         if (counter > -50) {
    //             setCounter(counter => counter - 1)
    //         }
    //     }

    //     const rndCounter = () => {
    //         setCounter(+(Math.random() * (50 - -50) + -50).toFixed(0))
    //     }

    //     const resetCounter = () => {
    //         setCounter(initial)
    //     }

    //     return {
    //         counter,
    //         incCounter,
    //         decCounter,
    //         rndCounter,
    //         resetCounter
    //     }
    // }

    // const Counter = (props) => {
    //     const { counter, incCounter, decCounter, rndCounter, resetCounter } = useCounter(props.counter);

    //     return (
    //         <div className="component">
    //             <div className="counter">{counter}</div>
    //             <div className="controls">
    //                 <button onClick={incCounter}>INC</button>
    //                 <button onClick={decCounter}>DEC</button>
    //                 <button onClick={rndCounter}>RND</button>
    //                 <button onClick={resetCounter}>RESET</button>
    //             </div>
    //         </div>
    //     )
    // }

    // const RndCounter = (props) => {
    //     const { counter, rndCounter, resetCounter } = useCounter(props.counter);

    //     return (
    //         <div className="component">
    //             <div className="counter">{counter}</div>
    //             <div className="controls">
    //                 <button onClick={rndCounter}>RND</button>
    //                 <button onClick={resetCounter}>RESET</button>
    //             </div>
    //         </div>
    //     )
    // }

    // //!REDUCER !!!

    // // function reducer(state, action) {
    // //     const { counter } = state;
    // //     switch (action.type) {
    // //         case 'incCounter':
    // //             return { counter: counter + 1 }
    // //         case 'decCounter':
    // //             return { counter: counter - 1 }
    // //         case 'rndCounter':
    // //             return { counter: +(Math.random() * (50 - -50) + -50).toFixed(0) }
    // //         case 'resetCounter':
    // //             return { counter: action.payload }

    // //         default:
    // //             break;
    // //     }
    // // }


    // // const Counter = (props) => {
    // //     const [{ counter }, dispatch] = useReducer(reducer, { counter: props.counter });

    // //     return (
    // //         <div className="component">
    // //             <div className="counter">{counter}</div>
    // //             <div className="controls">
    // //                 <button onClick={() => dispatch({ type: 'incCounter' })}>INC</button>
    // //                 <button onClick={() => dispatch({ type: 'decCounter' })}>DEC</button>
    // //                 <button onClick={() => dispatch({ type: 'rndCounter' })}>RND</button>
    // //                 <button onClick={() => dispatch({ type: 'resetCounter', payload: props.counter })}>RESET</button>
    // //             </div>
    // //         </div>
    // //     )
    // // }

    // // const RndCounter = (props) => {
    // //     const [{ counter }, dispatch] = useReducer(reducer, { counter: props.counter });

    // //     return (
    // //         <div className="component">
    // //             <div className="counter">{counter}</div>
    // //             <div className="controls">
    // //                 <button onClick={() => dispatch({ type: 'rndCounter' })}>RND</button>
    // //                 <button onClick={() => dispatch({ type: 'resetCounter', payload: props.counter })}>RESET</button>
    // //             </div>
    // //         </div>
    // //     )
    // // }

    // //!DEFAULT !!!

    // const App = () => {
    //     return (
    //         <>
    //             <Counter counter={0} />
    //             <RndCounter counter={5} />
    //         </>
    //     )
    // }

    // export default App;
}