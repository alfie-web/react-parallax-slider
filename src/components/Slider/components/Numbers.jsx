import React from 'react';
import classNames from 'classnames';

const Numbers = ({ className, curSlide, slidesLength }) => {
	return (
		<span className={classNames('Slider__numbers', className)}>
			<span>{curSlide + 1}</span> / <span>{slidesLength}</span>
		</span>
	)
}

export default Numbers;