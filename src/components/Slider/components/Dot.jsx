import React from 'react';
import classNames from 'classnames';

const Dot = ({ curSlide, autoSlides, animTime, className, i , onClick }) => {
	return (
		<li
			className={classNames('Slider__dot', className, {
				'Slider__dot--active': curSlide === i
			})}
			onClick={onClick}
		>	
			<span className="left">
				<span className="anim" style={{
					animation: curSlide === i && autoSlides && `rotate-left ${animTime / 1000}s linear`
				}}></span>
			</span>
			<span className="right">
				<span className="anim" style={{
					animation: curSlide === i && autoSlides && `rotate-right ${animTime / 1000}s linear`
				}}></span>
			</span>
		</li>
	)
}

export default Dot;