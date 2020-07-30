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
	touchable = true,
	items = []
}) => {
	const [state, setState] = useState({
		curSlide: 0,
		imagePos: 0
	});

	let autoSlideTimeout = useRef(null);
	let forward = useRef(true);

	// TODO: Вообще попробовать вставить проверку на первый/последний слайд в prevBackSlide, 
	// хотя не лучше в controlClick (переименовать в moveSlide), сделать его универсальнейшим, 
	// а prevBackSlide переименовать в handleSlideMove
	const handlers = useSwipeable({
		onSwipedLeft: () => {
			touchable && state.curSlide < items.length - 1 && prevBackSlide(1);
		},
		onSwipedRight: () => {
			touchable && state.curSlide > 0 && prevBackSlide(-1)
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

	const onControlClick = (dir, pos) => {
		// clearInterval(autoSlideTimeout.current);
		prevBackSlide(dir, pos);
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

		<div {...handlers} className={classNames('Slider', sliderClass)}>
			<Numbers 
				curSlide={state.curSlide}
				slidesLength={items.length}
			/>
		
			{ arrows && 
				<Fragment>
					<Arrow 
						className={arrowClass}
						isRight={false}
						curSlide={state.curSlide}
						onClick={() => onControlClick(-1, null)}
						slidesLength={items.length - 1}
					/>
					<Arrow 
						className={arrowClass}
						isRight
						curSlide={state.curSlide}
						onClick={() => onControlClick(1, null)}
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
								onControlClick={onControlClick}
								i={i}
								onClick={() => onControlClick(null, i)}
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
