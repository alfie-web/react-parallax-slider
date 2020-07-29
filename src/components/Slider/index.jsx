import React, { useState, useEffect, useCallback, useRef, Fragment } from 'react';
import classNames from 'classnames';

import { SlidesList } from './components';

import './Slider.sass';


const Slider = ({
	sliderClass,
	dotsClass,
	arrowsClass,
	activeSlide = 1,
	autoSlides = true,
	animTime = 3000,
	transition = 'parallax',	// classic, fade, layer
	dots = true,
	arrows = true,
	items
}) => {
	const [state, setState] = useState({
		curSlide: 0,
		imagePos: 0
	});

	let autoSlideTimeout = useRef(null);
	let forward = useRef(true);

	// console.log('RERENDERS')

	const changeState = useCallback((props) => {
		setState({
			...state,
			...props
		})
	}, [state])

	const prevBackSlide = useCallback((dir) => {	// Когда будут dots, тогда добавится параметр pos, ( pos || state.curSlide +- 1 )
		let curSlideNext;
		if (dir > 0) {
			curSlideNext = state.curSlide + 1;
		} else {
			curSlideNext = state.curSlide - 1;
		}

		let imagePosNext = curSlideNext * 50;
	
		changeState({ 
			curSlide: curSlideNext, 
			imagePos: imagePosNext 
		});
	}, [changeState, state.curSlide])

	const onControlClick = (dir) => {
		clearInterval(autoSlideTimeout.current);
		prevBackSlide(dir);
	}


	const autoSlide = useCallback(() => {
		if (state.curSlide === items.length - 1) {
			forward.current = false;
		} else if (state.curSlide === 0) {
			forward.current = true;
		}

		if (forward.current) {
			prevBackSlide(1);	
		} else {
			// changeState({ 	// Версия где после последнего слайда снова первый
			// 	curSlide: 0,
			// 	imagePos: 0 
			// });

			prevBackSlide(-1);	// Версия, где после последнего слайда, крутит в обратном направлении
		}
	}, [items.length, state.curSlide, prevBackSlide]);


	useEffect(() => {
		if (autoSlides) autoSlideTimeout.current = setInterval(autoSlide, animTime);

		return () => autoSlides && clearInterval(autoSlideTimeout.current)
	}, [autoSlide, animTime, autoSlides])
	
	return (
		<div className={classNames('Slider', sliderClass)}>
			<span>{state.curSlide}</span>
		
			{ arrows && 
				<Fragment>
					<div 	// TODO: перенести в компонент Control
						className={classNames('Slider__control left', {
							'inactive': state.curSlide <= 0
						})} 
						onClick={() => onControlClick(-1)}
					></div>
					<div 
						className={classNames('Slider__control right', {
							'inactive': state.curSlide >= items.length - 1
						})} 
						onClick={() => onControlClick(1)}
					></div>
				</Fragment>
			}

			<SlidesList 
				items={items}
				className="Slider__items"
				curSlide={state.curSlide}
				transition={transition}
				imagePos={state.imagePos}
			/>
		</div>
	)
}

export default Slider;


















// import React, { useState, useEffect, useCallback, Fragment } from 'react';
// import classNames from 'classnames';

// import { SlidesList } from './components';

// import './Slider.sass';


// let autoSlideTimeout = null;

// let forward = true;

// const Slider = ({
// 	sliderClass,
// 	dotsClass,
// 	arrowsClass,
// 	activeSlide = 1,
// 	autoSlides = true,
// 	animTime = 3000,
// 	transition = 'parallax',	// classic, fade, layer
// 	dots = true,
// 	arrows = true,
// 	items
// }) => {
// 	const [state, setState] = useState({
// 		curSlide: 0,
// 		imagePos: 0,
// 		forward: true
// 	});

// 	// console.log('RERENDERS')

// 	const changeState = useCallback((props) => {
// 		setState({
// 			...state,
// 			...props
// 		})
// 	}, [state])

// 	const prevBackSlide = useCallback((dir) => {	// Когда будут dots, тогда добавится параметр pos, ( pos || state.curSlide +- 1 )
// 		let curSlideNext;
// 		if (dir > 0) {
// 			curSlideNext = state.curSlide + 1;
// 		} else {
// 			curSlideNext = state.curSlide - 1;
// 		}

// 		let imagePosNext = curSlideNext * 50;
	
// 		changeState({ 
// 			curSlide: curSlideNext, 
// 			imagePos: imagePosNext 
// 		});
// 	}, [changeState, state.curSlide])

// 	const onControlClick = (dir) => {
// 		clearInterval(autoSlideTimeout);
// 		prevBackSlide(dir);
// 	}


// 	const autoSlide = useCallback(() => {
// 		if (state.curSlide === items.length - 1) {
// 			forward = false;
// 		} else if (state.curSlide === 0) {
// 			forward = true;
// 		}

// 		if (forward) {
// 			prevBackSlide(1);	
// 		} else {
// 			// changeState({ 	// Версия где после последнего слайда снова первый
// 			// 	curSlide: 0,
// 			// 	imagePos: 0 
// 			// });

// 			prevBackSlide(-1);	// Версия, где после последнего слайда, крутит в обратном направлении
// 		}
// 	}, [items.length, state.curSlide, prevBackSlide]);


// 	useEffect(() => {
// 		autoSlideTimeout = setInterval(autoSlide, animTime);

// 		return () => clearInterval(autoSlideTimeout)
// 	}, [autoSlide, animTime])

// 	return (
// 		<div className={classNames('Slider', sliderClass)}>
// 			<span>{state.curSlide}</span>
		
// 			{ arrows && 
// 				<Fragment>
// 					<div 	// TODO: перенести в компонент Control
// 						className={classNames('Slider__control left', {
// 							'inactive': state.curSlide <= 0
// 						})} 
// 						onClick={() => onControlClick(-1)}
// 					></div>
// 					<div 
// 						className={classNames('Slider__control right', {
// 							'inactive': state.curSlide >= items.length - 1
// 						})} 
// 						onClick={() => onControlClick(1)}
// 					></div>
// 				</Fragment>
// 			}

// 			<SlidesList 
// 				items={items}
// 				className="Slider__items"
// 				curSlide={state.curSlide}
// 				transition={transition}
// 				imagePos={state.imagePos}
// 			/>
// 		</div>
// 	)
// }

// export default Slider;