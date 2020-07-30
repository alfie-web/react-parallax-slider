import React from 'react';
import classNames from 'classnames';
// import { useSwipeable, Swipeable } from 'react-swipeable'

const Slide = ({ 
	isActive, 
	className, 
	image, 
	title, 
	descr,
	slideLeftPosition,
	imageLeftPosition,
	transitionTime,
	imagePos,
}) => {
	return (
		// <Swipeable onSwiped={(eventData) => () => console.log(eventData)}>
		<div 
			className={classNames('Slide', className, {
				'Slide--active': isActive
			})}
			style={{
				left: `${slideLeftPosition}%`,
			}}
			
		>
			<div className="Slide__container">
				<div className="Slide__image" 
					style={{
						background: `url(${image}) center no-repeat`,
						backgroundSize: 'cover',
						left: `${imageLeftPosition}%`,	// curr
						transform: `translate3d(${imagePos}%, 0, 0)`,		// С параллаксом curr
						transition: `transform ${transitionTime}ms`,
					}}
				></div>
				<div className="Slide__overlay"></div>

				<div className="Slide__info">
					<div className="Slide__title">{title}</div>
					<div className="Slide__descr">{descr}</div>
				</div>
			</div>
		</div>
		// </Swipeable>
	)
}

export default Slide;