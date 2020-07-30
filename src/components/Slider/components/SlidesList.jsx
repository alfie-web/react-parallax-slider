import React from 'react';
import classNames from 'classnames';

import { Slide } from './';


const SlidesList = ({ 
	className, 
	items, 
	curSlide,
	transition,
	imagePos
}) => {
	// console.log('RERENDERS')

	return (
		<div 
			className={classNames('SlidesList', className)}
			style={{
				transform: `translate3d(-${curSlide * 100}%, 0, 0)`		// curr
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
							isActive={curSlide === i}
							className={`Slide-${i}`}

							slideLeftPosition={i * 100}

							imageLeftPosition={
								// transition === 'parallax' ? -(i * 50) :
								// transition === 'layer' ? -(i * 100) :
								// transition === 'classic' ? -(i * 50)
								// : -(i * 50)

								transition === 'parallax' || transition === 'classic' ? -(i * 50) :
								transition === 'layer' ? -(i * 100)
								: -(i * 50)
								
							}	
							imagePos={
								transition === 'parallax' ? imagePos :
								transition === 'layer' ? (imagePos / 50) * 100 :
								transition === 'classic' ? (i * 50) :
								imagePos
							}		



							// imageLeftPosition={-(i * 50)}		// Эффект параллакс 
							// imagePos={imagePos}		// Эффект параллакс
							
							// imageLeftPosition={-(i * 100)}		// Эффект по слоям
							// imagePos={(imagePos / 50) * 100}	// Эффект по слоям

							// imageLeftPosition={-(i * 50)}		// Эффект классический		{(i * 50)} - тож можно
							// imagePos={(i * 50)}		// Эффект классический		{-(i * 50)}	- тож можно

						/>
					)
				})
			}
		</div>
	)
}

export default SlidesList;