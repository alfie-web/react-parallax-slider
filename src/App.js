import React from 'react';
// import { useSwipeable, Swipeable } from 'react-swipeable'

import { Slider } from './components';

import slide1 from './testAssets/slide1.jpg';
import slide2 from './testAssets/slide2.jpg';
import slide3 from './testAssets/slide3.jpg';
import slide4 from './testAssets/slide4.jpg';
import slide5 from './testAssets/slide5.jpg';
import slide6 from './testAssets/slide6.jpg';

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

// TODO: Сделать fade эффект
// TODO: Сделать touch

function App() {
	// const handlers = useSwipeable({
	// 	onSwipedLeft: () => console.log('Left swipe'),
	// 	onSwipedRight: () => console.log('Right swipe'),
	// 	preventDefaultTouchmoveEvent: true,
	// 	trackMouse: true
	// });

        return (
                <div className="App">
                        <Slider 
                                sliderClass="MySlider"
                                // activeSlide={1}
                                items={MOCK_SLIDES}
                                // arrows={false}
				transition="parallax"   // parallax, layer, classic
				// transitionTime={300}
				// autoSlides={false}
				// touchable={false}
				activeSlide={2}
                        />


                        {/* <span>
                                Далеко-далеко за словесными, горами в стране гласных и согласных живут рыбные тексты. Его диких жаренные наш рыбного он повстречался вдали, запятых парадигматическая агентство злых, последний правилами толку грамматики, не путь. Снова коварный запятых текстов своего несколько собрал инициал океана на берегу безорфографичный даль ручеек толку первую, имени гор, коварных напоивший рыбного образ пустился букв. Гор, но? Обеспечивает это свое большого первую проектах парадигматическая до своего заманивший реторический скатился океана буквоград, предупредила даль что? Возвращайся пустился ее власти вершину которое, букв составитель? Заглавных снова города несколько предупреждал жизни оксмокс запятой семантика предупредила журчит которой вскоре заголовок ведущими безорфографичный, взобравшись подзаголовок страну большого всеми по всей не? Приставка правилами на берегу, страна безопасную осталось послушавшись пустился свою. Щеке свой его переписывается снова рукопись, себя назад оксмокс языком!
                        </span> */}
			{/* <div {...handlers} style={{ width: '100px', height: '100px', backgroundColor: 'red' }}></div> */}


                        <Slider 
                                sliderClass="MySlider"
                                // activeSlide={1}
                                items={MOCK_SLIDES}
                                // arrows={false}
                                // dots={false}
                                transition="layer"   // parallax, layer, classic
                                autoSlides={false}
                        />
                </div>
        );
}

export default App;
