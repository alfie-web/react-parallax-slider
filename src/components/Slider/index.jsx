import React, { useState, useEffect, useCallback } from 'react';
import classNames from 'classnames';

import { SlidesList } from './components';

import './Slider.sass';

import slide1 from '../../testAssets/slide1.jpg';
import slide2 from '../../testAssets/slide2.jpg';
import slide3 from '../../testAssets/slide3.jpg';
import slide4 from '../../testAssets/slide4.jpg';
import slide5 from '../../testAssets/slide5.jpg';
import slide6 from '../../testAssets/slide6.jpg';

const MOCK_SLIDES = [
	{
		id: 1,
		title: 'Заголовок слайда 1',
		descr: 'Описание слайда 1',
		image: slide1,
	},
	{
		id: 2,
		title: 'Заголовок слайда 2',
		descr: 'Описание слайда 2',
		image: slide2
	},
	{
		id: 3,
		title: 'Заголовок слайда 3',
		descr: 'Описание слайда 3',
		image: slide3
	},
	{
		id: 4,
		title: 'Заголовок слайда 4',
		descr: 'Описание слайда 4',
		image: slide4
	},
	{
		id: 5,
		title: 'Заголовок слайда 5',
		descr: 'Описание слайда 5',
		image: slide5
	},
	{
		id: 6,
		title: 'Заголовок слайда 6',
		descr: 'Описание слайда 6',
		image: slide6
	}
];

let autoSlideTimeout = null;

const Slider = ({
	sliderClass,
	dotsClass,
	arrowsClass,
	activeSlide = 1,
	autoSlides = true,
	animTime = 3000,
	dots = true,
	arrows = true,
	// items
}) => {
	const [state, setState] = useState({
		curSlide: 0,
		// curSlide: 1,
		imagePos: 0,
	});

	const changeState = useCallback((props) => {
		setState({
			...state,
			...props
		})
	}, [state])

	const autoSlide = useCallback(() => {
		let curSlideNext = state.curSlide + 1;
		let imagePosNext = curSlideNext * 50;

		
		changeState({ 
			curSlide: curSlideNext, 
			imagePos: imagePosNext 
		});

		if (state.curSlide >= MOCK_SLIDES.length - 1) {
			changeState({ 
				curSlide: 0, 
				// curSlide: 1, 
				imagePos: 0 
			});
		}
	}, [changeState, state.curSlide]);

	useEffect(() => {
		autoSlideTimeout = setInterval(autoSlide, animTime);

		return () => clearInterval(autoSlideTimeout)
	}, [autoSlide, animTime])

	return (
		<div className={classNames('Slider', sliderClass)}>
			<span>{state.curSlide}</span>
			<SlidesList 
				items={MOCK_SLIDES}
				className="Slider__items"
				activeSlide={state.curSlide}

				imagePos={state.imagePos}
			/>
		</div>
	)
}

export default Slider;