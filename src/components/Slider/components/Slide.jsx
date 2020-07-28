import React from 'react';
import classNames from 'classnames';

const Slide = ({ 
	isActive, 
	className, 
	image, 
	title, 
	descr,
	slideLeftPosition,
	imageLeftPosition,

	// slidePos,
	imagePos
}) => {
	return (
		<div 
			className={classNames('Slide', className, {
				'Slide--active': isActive
			})}
			style={{
				left: `${slideLeftPosition}%`,
				// transform: isActive && `translate3d(${slidePos}%, 0, 0)`
			}}
		>
			<div className="Slide__container">
				<div className="Slide__image" 
					style={{
						background: `url(${image}) center no-repeat`,
						backgroundSize: 'cover',
						left: `-${imageLeftPosition}%`,
						transform: `translate3d(${imagePos}%, 0, 0)`
						// transform: isActive && `translate3d(${imagePos}%, 0, 0)`
						// transform: isActive ? `translate3d(${imagePos}%, 0, 0)` : `translate3d(${imageLeftPosition}%, 0, 0)`
					}}
				></div>
				<div className="Slide__overlay"></div>

				<div className="Slide__info">
					<div className="Slide__title">{title}</div>
					<div className="Slide__title">{descr}</div>
				</div>
			</div>
		</div>
	)
}

export default Slide;