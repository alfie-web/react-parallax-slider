import React, { useState, useEffect, useCallback, useRef, Fragment, memo } from 'react';
import classNames from 'classnames';
import { useSwipeable } from 'react-swipeable';

import { SlidesList, Dot, Arrow, Numbers } from './components';

import './Slider.sass';


const Slider = memo(({
	sliderClass = "",
	dotsClass = "",
	arrowClass = "",
	activeSlide = 1,
	autoSlides = true,
	animTime = 3000,
	transitionTime = 500,
	transition = 'parallax',	// classic, fade, layer
	dots = true,
	arrows = true,
	numbers = true,
	touchable = true,
	items = []
}) => {
	const [state, setState] = useState({
		// curSlide: 0,
		// imagePos: 0
		curSlide: activeSlide && activeSlide !== 1 ? activeSlide - 1 : 0,
		imagePos: activeSlide && activeSlide !== 1 ? (activeSlide - 1) * 50 : 0
	});

	let autoSlideTimeout = useRef(null);
	let forward = useRef(true);


	const touchHandlers = useSwipeable({
		onSwipedLeft: () => {
			touchable && state.curSlide < items.length - 1 && prevBackSlide(1);	// Если не послендий слайд
		},
		onSwipedRight: () => {
			touchable && state.curSlide > 0 && prevBackSlide(-1);		// Если не первый слайд
		},
		preventDefaultTouchmoveEvent: true,
		trackMouse: true
	});

	// console.log('RERENDERS')

	const changeState = useCallback((props) => {
		setState({
			...state,
			...props
		})
	}, [state])

	const prevBackSlide = useCallback((dir, pos) => {
		let curSlideNext;

		if (dir) curSlideNext = state.curSlide + dir;
		if (pos || pos === 0) curSlideNext = pos;

		changeState({ 
			curSlide: curSlideNext, 
			imagePos: curSlideNext * 50 
		});
	}, [changeState, state.curSlide])


	const autoSlide = useCallback(() => {
		if (state.curSlide === items.length - 1) {
			forward.current = false;
		} else if (state.curSlide === 0) {
			forward.current = true;
		}

		if (forward.current) {
			prevBackSlide(1);	
		} else {
			// TODO: можно сделать настройку looped
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

		<div {...touchHandlers} className={classNames('Slider', sliderClass)}>
			{ numbers &&
				<Numbers 
					curSlide={state.curSlide}
					slidesLength={items.length}
				/>
			}
		
			{ arrows && 
				<Fragment>
					<Arrow 
						className={arrowClass}
						isRight={false}
						curSlide={state.curSlide}
						onClick={() => prevBackSlide(-1)}
						slidesLength={items.length - 1}
					/>
					<Arrow 
						className={arrowClass}
						isRight
						curSlide={state.curSlide}
						onClick={() => prevBackSlide(1)}
						slidesLength={items.length - 1}
					/>
				</Fragment>
			}

			{ dots &&
				<ul className={classNames('Slider__dots', dotsClass)}>
					{
						items.map((item, i) => (
							<Dot 
								key={item.id} 
								autoSlides={autoSlides}
								animTime={animTime}
								curSlide={state.curSlide}
								i={i}
								onClick={() => prevBackSlide(null, i)}
							/>
						))
					}
				</ul>
			}

			<SlidesList 
				items={items}
				className="Slider__items"
				curSlide={state.curSlide}
				transitionTime={transitionTime}
				transition={transition}
				imagePos={state.imagePos}
			/>
		</div>
	)
})

export default Slider;
































// Версия с защитой от дурака, но мне показалось код стал менее читаемым

// import React, { useState, useEffect, useCallback, useRef, Fragment, memo } from 'react';
// import classNames from 'classnames';
// import { useSwipeable } from 'react-swipeable';

// import { SlidesList, Dot, Arrow, Numbers } from './components';

// import './Slider.sass';


// const Slider = memo(({
// 	sliderClass = "",
// 	dotsClass = "",
// 	arrowClass = "",
// 	activeSlide = 1,
// 	autoSlides = true,
// 	animTime = 3000,
// 	transitionTime = 500,
// 	transition = 'parallax',	// classic, fade, layer
// 	dots = true,
// 	arrows = true,
// 	numbers = true,
// 	touchable = true,
// 	items = []
// }) => {
// 	const [state, setState] = useState({
// 		curSlide: 0,
// 		imagePos: 0
// 	});

// 	let autoSlideTimeout = useRef(null);
// 	let forward = useRef(true);

// 	// TODO: Вообще попробовать вставить проверку на первый/последний слайд в prevBackSlide, 
// 	// хотя не лучше в controlClick (переименовать в moveSlide), сделать его универсальнейшим, 
// 	// а prevBackSlide переименовать в handleSlideMove

// 	const handlers = useSwipeable({
// 		onSwipedLeft: () => {
// 			touchable && onControlClick(1, null);
// 			// touchable && state.curSlide < items.length - 1 && prevBackSlide(1);
// 		},
// 		onSwipedRight: () => {
// 			touchable && onControlClick(-1, null)
// 			// touchable && state.curSlide > 0 && prevBackSlide(-1)
// 		},
// 		preventDefaultTouchmoveEvent: true,
// 		trackMouse: true
// 	});

// 	// console.log('RERENDERS')

// 	const changeState = useCallback((props) => {
// 		setState({
// 			...state,
// 			...props
// 		})
// 	}, [state])

// 	const prevBackSlide = useCallback((dir, pos) => {
// 		let curSlideNext;

// 		if (dir) curSlideNext = state.curSlide + dir;
// 		if (pos || pos === 0) curSlideNext = pos;

// 		changeState({ 
// 			curSlide: curSlideNext, 
// 			imagePos: curSlideNext * 50 
// 		});
// 	}, [changeState, state.curSlide])

// 	const onControlClick = (dir, pos) => {
// 		// clearInterval(autoSlideTimeout.current);

// 		// Вот только нужно ли (это защита на дурака, но код менее читаемым становится сразу)
// 		if (dir && !pos) {
// 			if ((dir > 0 && state.curSlide < items.length - 1) || (dir < 0 && state.curSlide > 0)) {
// 				prevBackSlide(dir, pos);
// 			}
// 		}

// 		if (!dir && (pos || pos === 0)) prevBackSlide(null, pos);
// 	}

// 	const autoSlide = useCallback(() => {
// 		if (state.curSlide === items.length - 1) {
// 			forward.current = false;
// 		} else if (state.curSlide === 0) {
// 			forward.current = true;
// 		}

// 		if (forward.current) {
// 			// prevBackSlide(1);	
// 			onControlClick(1);	
// 		} else {
// 			// TODO: можно сделать настройку looped
// 			// changeState({ 	// Версия где после последнего слайда снова первый
// 			// 	curSlide: 0,
// 			// 	imagePos: 0 
// 			// });

// 			// prevBackSlide(-1);	// Версия, где после последнего слайда, крутит в обратном направлении
// 			onControlClick(-1);	// Версия, где после последнего слайда, крутит в обратном направлении
// 		}
// 	}, [items.length, state.curSlide, prevBackSlide]);


// 	useEffect(() => {
// 		if (autoSlides) autoSlideTimeout.current = setInterval(autoSlide, animTime);

// 		return () => autoSlides && clearInterval(autoSlideTimeout.current)
// 	}, [autoSlide, animTime, autoSlides])
	
// 	return (

// 		<div {...handlers} className={classNames('Slider', sliderClass)}>
// 			{ numbers &&
// 				<Numbers 
// 					curSlide={state.curSlide}
// 					slidesLength={items.length}
// 				/>
// 			}
		
// 			{ arrows && 
// 				<Fragment>
// 					<Arrow 
// 						className={arrowClass}
// 						isRight={false}
// 						curSlide={state.curSlide}
// 						onClick={() => onControlClick(-1, null)}
// 						slidesLength={items.length - 1}
// 					/>
// 					<Arrow 
// 						className={arrowClass}
// 						isRight
// 						curSlide={state.curSlide}
// 						onClick={() => onControlClick(1, null)}
// 						slidesLength={items.length - 1}
// 					/>
// 				</Fragment>
// 			}

// 			{ dots &&
// 				<ul className={classNames('Slider__dots', dotsClass)}>
// 					{
// 						items.map((item, i) => (
// 							<Dot 
// 								key={item.id} 
// 								autoSlides={autoSlides}
// 								animTime={animTime}
// 								curSlide={state.curSlide}
// 								i={i}
// 								onClick={() => onControlClick(null, i)}
// 							/>
// 						))
// 					}
// 				</ul>
// 			}

// 			<SlidesList 
// 				items={items}
// 				className="Slider__items"
// 				curSlide={state.curSlide}
// 				transitionTime={transitionTime}
// 				transition={transition}
// 				imagePos={state.imagePos}
// 			/>
// 		</div>
// 	)
// })

// export default Slider;













