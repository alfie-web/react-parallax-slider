import React from 'react';
import classNames from 'classnames';

const Arrow = ({ onClick, curSlide, isRight , slidesLength, className }) => {
	return (
		<div 	
			className={classNames('Slider__control', className, {
				'left': !isRight,
				'right': isRight,
				'inactive': !isRight ? curSlide <= 0 : curSlide >= slidesLength
			})} 
			onClick={onClick}
		></div>
	)
}

export default Arrow;