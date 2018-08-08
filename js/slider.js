$(function(){
	var trigger = $(".button"),
		countOfBox01,
		countOfBox02,
		counter01 = 0
		counter02 = 0,
		wrapper01 = $('.wrapper01'),
		wrapper02 = $('.wrapper02'),
		countPerSlide = 0;

		slideWidth01 = $('.box1').width(),
		slideWidth02 = $('.box2').width(),
		slideOneCount = $('.box1').length,
		slideTwoCount = $('.slide1 .box2').length,
		wrapper01width = slideOneCount * slideWidth01;

		$('.wrapper01').width(wrapper01width);
		
		for(var x = 0; x < slideOneCount; x++){
			countOfBox01 = $('.box1').eq(x).addClass('slides slide'+x);
			wrapperCount = $('.slideWrapper').eq(x).addClass('wrapper02-'+x);
			for(var y = 0; y < $('.slides').length; y++){
				countOfBox02 = $('.slide'+y).find('.box2').length;
				$('.slide'+y).find('.wrapper02').width(countOfBox02*slideWidth02);
			}
		}
		$('.slide'+counter01).addClass('activeSlide').siblings().removeClass('activeSlide');
		$('.activeSlide').find('.wrapper02').addClass('subSlideActive').siblings().removeClass('subSlideActive');

		slideWidthDeterminator(counter01);

		function slideWidthDeterminator(counter01){
			countPerSlide = $('.slide'+counter01).find('.box2').length;
		}

		$(trigger).on('click', function(){
			var selected = $(this).text();

			switch(selected){
				case "Next":
					counter02 = 0;
					goRight(wrapper01, slideWidth01);
					break;
				case "Prev":
					counter02--;
					goLeft(wrapper01, slideWidth01);
					break;
				case ">":
					goRight(wrapper02, slideWidth02);
					break;
				case "<":
					goLeft(wrapper02, slideWidth02);
					break;
				default:
					break;
			}
		});

		function goLeft(wrapper, widthSelected){
			if(widthSelected == slideWidth01){
				counter01--;
				if(counter01<=-1){
					counter01 = 0;
				}else{
					slide(wrapper, counter01, (counter01*widthSelected));	
				}
				slideWidthDeterminator(counter01);
			}
			else if(widthSelected == slideWidth02){
				counter02--;
				if(counter02<0){
					counter02 = 0;
				}else{
					slide(wrapper, counter02, (counter02*widthSelected));	
				}
				console.log(counter02);
			}
		}
		function goRight(wrapper, widthSelected){
			if(widthSelected == slideWidth01){
				counter01++;
				if(counter01>=slideOneCount){
					counter01 = slideOneCount-1;
				}else{
					slide(wrapper, counter01, (counter01*widthSelected));
				}
				slideWidthDeterminator(counter01);
			}
			else if(widthSelected == slideWidth02){
				counter02++;
				console.log(counter02);
				if(counter02>=countPerSlide){
					counter02 = countPerSlide-1;
				}else{
					slide(wrapper, counter02, (counter02*widthSelected));
				}
			}
		}
		function slide(wrapper,i,e){
			$('.slide'+counter01).addClass('activeSlide').siblings().removeClass('activeSlide');
			$('.subSlideActive').removeClass('subSlideActive');
			var wrapperToSlide = $('.activeSlide').find('.wrapper02').addClass('subSlideActive');

			if(wrapper.hasClass('subSlideActive')){
				$(wrapperToSlide).animate({
				'left': '-'+e+'px'
				},'200', 'swing');
			}
			else{
				$(wrapper).animate({
					'left': '-'+e+'px'
				},'200', 'swing');
			}
			
		}

});