import React from 'react';
import classNames from 'classnames';

import { Slide } from './';


const SlidesList = ({ 
	className, 
	items, 
	activeSlide,

	imagePos
}) => {

	return (
		<div 
			className={classNames('SlidesList', className)}
			style={{
				transform: `translate3d(-${activeSlide * 100}%, 0, 0)`
			}}
		>
			{
				items.map((slide, i) => {
					return (
						<Slide 
							key={slide.id}
							title={slide.title}
							descr={slide.descr}
							image={slide.image}
							isActive={activeSlide === i}
							className={`Slide-${i}`}

							slideLeftPosition={i * 100}
							imageLeftPosition={i * 50}

							imagePos={imagePos}
						/>
					)
				})
			}
		</div>
	)
}

export default SlidesList;