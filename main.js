(() => {

	let yOffset = 0; // window.pageYOffset 대신 쓸 변수
	let prevScrollHeight = 0;
	let currentScene = 0;

	const sceneInfo = [
		{
			// 0
			type: "sticky",
			heightNum: 5,
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-0'),
				messageA: document.querySelector('#scroll-section-0 .main-message.a'),
				messageB: document.querySelector('#scroll-section-0 .main-message.b'),
				messageC: document.querySelector('#scroll-section-0 .main-message.c'),
				messageD: document.querySelector('#scroll-section-0 .main-message.d'),
			},
			values: {
				messageA_opacity: [0, 1]
			}
		},
		{
			// 1
			type: "normal",
			heightNum: 5,
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-1')
			}
		},
		{
			// 2
			type: "sticky",
			heightNum: 5,
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-2')
			}
		},
		{
			// 3
			type: "sticky",
			heightNum: 5,
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-3')
			}
		}
	];

	function setLayout() {
		for (let i = 0; i < sceneInfo.length; i++) {
			sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
			sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
		}

		yOffset = window.pageYOffset;
		let totalScrollHeight = 0;
		for (let i = 0; i < sceneInfo.length; i++) {
			totalScrollHeight += sceneInfo[i].scrollHeight;
			if (totalScrollHeight >= yOffset) {
				currentScene = i;
				break;
			}
		}
		document.body.setAttribute('id', `show-scene-${currentScene}`);
	}

	function calcValues (values, currentYOffset) {

	}

	function playAnimation() {
		const objs = sceneInfo[currentScene].objs;
		const values = sceneInfo[currentScene].values;
		const currentYOffset = yOffset - prevScrollHeight;
		console.log(currentYOffset);

		switch (currentScene) {
			case 0:
				let messageA_opacity_0 = values.messageA_opacity[0];
				let messageA_opacity_1 = values.messageA_opacity[1];
				calcValues(values.messageA_opacity, currentYOffset);
				break;
			case 1:
				break;
			case 2:
				break;
			case 3:
				break;
		}
	}

	function scrollLoop() {
		prevScrollHeight = 0;
		for (let i = 0; i < currentScene; i++) {
			prevScrollHeight += sceneInfo[i].scrollHeight;
		}

		if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
			if (currentScene === 3)
				return;
			currentScene++;
			document.body.setAttribute('id', `show-scene-${currentScene}`)

		}
		if (yOffset < prevScrollHeight) {
			if (currentScene === 0)
				return;
			currentScene--;
			document.body.setAttribute('id', `show-scene-${currentScene}`)
		}

		playAnimation();
	}

	window.addEventListener('scroll', () => {
		yOffset = window.pageYOffset;
		scrollLoop();
	})
	window.addEventListener('load', setLayout);
	window.addEventListener('resize', setLayout);

})();

//  함수를 괄호로 감싸ㅏ서 호출 ()=> {} 함수를 감싸는 이유는 전역함수 사용 피하기위해