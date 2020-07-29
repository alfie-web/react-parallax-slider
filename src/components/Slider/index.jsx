import React, { useState, useEffect, useCallback } from 'react';
import classNames from 'classnames';

import { SlidesList } from './components';

import './Slider.sass';


let autoSlideTimeout = null;

let forward = true;

const Slider = ({
	sliderClass,
	dotsClass,
	arrowsClass,
	activeSlide = 1,
	autoSlides = true,
	animTime = 3000,
	dots = true,
	arrows = true,
	items
}) => {
	const [state, setState] = useState({
		curSlide: 0,
		imagePos: 0,
		forward: true
	});

	const changeState = useCallback((props) => {
		setState({
			...state,
			...props
		})
	}, [state])

	const prevBackSlide = (dir) => {	// Когда будут dots, тогда добавится параметр pos, ( pos || state.curSlide +- 1 )
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
	}

	const onControlClick = (dir) => {
		clearInterval(autoSlideTimeout);
		prevBackSlide(dir);
	}



	const changeDirection = (curSlide) => {
		if (curSlide === items.length - 1) {
			forward = false;
		} else if (curSlide === 0) {
			forward = true;
		}
	}
	
	const autoSlide = useCallback(() => {
		changeDirection(state.curSlide);

		if (forward) {
			prevBackSlide(1);	
		} else {
			// changeState({ 	// Версия где после последнего слайда снова первый
			// 	curSlide: 0,
			// 	imagePos: 0 
			// });

			prevBackSlide(-1);	// Версия, где после последнего слайда, крутит в обратном направлении
		}
	}, [changeState, state.curSlide, items.length]);


	useEffect(() => {
		autoSlideTimeout = setInterval(autoSlide, animTime);

		return () => clearInterval(autoSlideTimeout)
	}, [autoSlide, animTime])

	return (
		<div className={classNames('Slider', sliderClass)}>
			<span>{state.curSlide}</span>
		
			<div 
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

			<SlidesList 
				items={items}
				className="Slider__items"
				curSlide={state.curSlide}

				imagePos={state.imagePos}
			/>
		</div>
	)
}

export default Slider;