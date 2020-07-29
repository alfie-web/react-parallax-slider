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

	imagePos
}) => {
	return (
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
						left: `${imageLeftPosition}%`,
						transform: `translate3d(${imagePos}%, 0, 0)`		// С параллаксом
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