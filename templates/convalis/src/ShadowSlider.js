/**
 * ShadowSlider - continuous slider
 * @version		1.0.0
 * @MooTools version 1.2
 * @author		Constantin Boiangiu <info [at] constantinb.com>
 */

var ShadowSlider = new Class({
	Implements: [Options],
	options:{
		slidesContainer:null, /* id of container for sliders */
		slides: null, /* slides selector */
		slidesShadow: null,
		slidesIntros: null,
		pauseOver: null, /* id for element that when hovered, pauses slider */
		slideWidth: 960, /* one slide width */
		slideHeight:450,
		navigation:null, /* id for navigation container */
		navElements:null, /* selector for navigation elements */
		goNext: null, /* id for button for going to next slide */
		goPrev: null, /* id for button to go to prev slide */
		navSelectedCSS: 'selected', /* css class for selected navigator */
		autoRun:null, /* number of milliseconds between slides when autorunning */
		duration: 1000, /* effect duration */
		stopOnClick: true, /* slides should stop when clicked */
		clickDelay: 0 /* slides should resume autoSlide when clicked after xxx milliseconds. autoRun must be set for this to work */
	},
	
	
	initialize: function(options) {
		this.setOptions(options);
		
		if( !this.options.slidesContainer ) return;
		
		this.container = $(this.options.slidesContainer);
		this.slides = this.container.getElements(this.options.slides);

		
		this.navContainer = $(this.options.navigation);
		this.navs = this.navContainer.getElements(this.options.navElements);
		
		this.current = 0;
		this.leftDist =  this.options.slideWidth*-1;
		
		this.fxSlide = new Fx.Morph(this.container, {wait:'ignore', duration:this.options.duration});
		this.is_running = false;
		this.is_over = false;
		this.start();
		
	},
	
	start: function(){
		$$('#YjArtoSlider .overlay').setStyle('opacity',0.1);
		this.slides.getLast().inject(this.container,'top');
		this.container.setStyle('left', this.leftDist);		
		this.container.set('morph', {duration: 'long', transition:Fx.Transitions.Sine.easeOut});
		this.container.morph({opacity:[1,0.1]});
		$('YjArtoSlider').set('morph', {duration: 500, transition:Fx.Transitions.Sine.easeIn});
		$('YjArtoSlider').morph({height:[0,this.options.slideHeight]});
		
		var posArrows = (this.options.slideHeight - $('prev').getSize().x) / 2;
		$$('.artonavs').set('morph', {duration: 500, transition:Fx.Transitions.Sine.easeIn});
		$$('.artonavs').morph({top:[0,posArrows]/*,opacity:[1,0.5]*/});
		
//		   var opaArrows = $$('.artonavs');
//		 opaArrows.each(function (opaArrows){
//		  var fx = new Fx.Morph(opaArrows, {
//			  duration: 400,
//			  'link': 'cancel'
//			});
//		  opaArrows.addEvents({
//			mouseenter: function(){
//			  fx.start({
//				'opacity': [0.5,1]
//			  });
//			},
//			mouseleave: function(){
//			  fx.start({
//				'opacity': [1,0.5]
//			  });
//			}
//		  });
//		 });		

		var getPosition = $(this.options.slidesShadow).getElement(this.options.slidesIntros).get('data-position');
		$$(this.options.slidesIntros).set('morph', {duration: 'long', transition: 'bounce:in'});
		$(this.options.slidesShadow).getElement(this.options.slidesIntros).morph({bottom:[-1000,getPosition]});
		
		this.navs[this.current].addClass(this.options.navSelectedCSS);
		
		/* navigation */
		this.navs.each(function(el, i){								
								
			el.addEvent('click', function(event){				
				event.stop();
				
				if( i == this.current || this.is_running ) return;
				
				if( this.options.stopOnClick || this.options.clickDelay )
					this.stopAutoRun();
				
				this.navs[this.current].removeClass(this.options.navSelectedCSS);
				if( i > this.current ) this.goNext( i-this.current, i );
				else if( i < this.current ) this.goPrev ( this.current - i, i );				
								
			}.bind(this))
			
		}.bind(this));
		/* next bttn */
		if( this.options.goNext ){
			$(this.options.goNext).addEvent('click', function(event){
				event.stop();
				if( this.is_running ) return;
				
				if( this.options.stopOnClick || this.options.clickDelay )
					this.stopAutoRun();
				
				this.navs[this.current].removeClass(this.options.navSelectedCSS);
				var nextSlide = this.current+1 < this.slides.length ? this.current+1 : 0;
				this.goNext( 1, nextSlide );
				
			}.bind(this))
		}
		/* prev bttn */
		if( this.options.goPrev ){
			$(this.options.goPrev).addEvent('click', function(event){
				event.stop();
				if( this.is_running ) return;
				
				if( this.options.stopOnClick || this.options.clickDelay )
					this.stopAutoRun();
				
				this.navs[this.current].removeClass(this.options.navSelectedCSS);
				var prevSlide = this.current > 0 ? this.current-1 : this.slides.length-1;
				this.goPrev( 1, prevSlide );
				
			}.bind(this))
		}
		/* pause on mouse over */
		$(this.options.pauseOver).addEvent('mouseenter', function(){
			this.is_over = true;													  
			this.stopAutoRun(true);
		}.bind(this));
		/* resume on mouse out */
		$(this.options.pauseOver).addEvent('mouseleave', function(){
			this.is_over = false;
			this.startAutoRun();
		}.bind(this));
		/* start auto run */
		if( this.options.autoRun )
			this.startAutoRun();		
	},
	
	startAutoRun: function(){		
		if( !this.options.autoRun )
			return;		
		this.period = this.autoRun.periodical(this.options.autoRun+this.options.duration, this);
	},
	
	autoRun: function(){		
		var key = this.current+1 < this.navs.length ? this.current+1 : 0;
		this.navs[this.current].removeClass(this.options.navSelectedCSS);
		this.goNext(1, key);
	},
	
	stopAutoRun: function( stopIt ){
		clearTimeout(this.period);
		if( this.options.clickDelay && !stopIt && !this.is_over )
			this.period = this.startAutoRun.delay(this.options.clickDelay, this);
	},
	
	goNext: function( step, key ){
	
		key = key > this.slides.length-1 ? 0 : key;
		$(this.options.slidesShadow).set('morph', {duration:500, transition: Fx.Transitions.Sine.easeOut});
		$(this.options.slidesShadow).morph({opacity:[1,0]});
		
		this.is_running = true;
		var leftDist = this.leftDist + ( step*this.options.slideWidth*-1 );
		/* if last element is clicked, clone the first and next element and put them last */
		if( step == this.slides.length-1 ){
			var cloneFirst = this.container.getFirst().clone().inject( this.container,'inside');	
			var cloneSecond = this.container.getFirst().getNext().clone().inject( this.container,'inside');
		}
		
		this.fxSlide.start({'left': leftDist}).chain(function(){
			/* remove the first and last elements cloned above */
			if(cloneFirst !== undefined && cloneFirst !== null){
				cloneFirst.dispose();
				cloneSecond.dispose();
			}
			
			for( var t = 0; t < step; t++ )
				this.container.getFirst().inject( this.container,'inside');
			

			
			$(this.options.slidesShadow).setStyle('height',0);
			$(this.options.slidesShadow).set('html','');
			this.slides[key].clone().inject($(this.options.slidesShadow),'inside');

			
			$(this.options.slidesShadow).set('morph', {duration:500, transition:Fx.Transitions.Sine.easeOut});
			$(this.options.slidesShadow).morph({opacity:[0,1],height:[0,this.options.slideHeight]});
			
			var getPosition = $(this.options.slidesShadow).getElement(this.options.slidesIntros).get('data-position');
			
			$(this.options.slidesShadow).getElement(this.options.slidesIntros).morph({bottom:[-1000,getPosition]});
			
			
			
			this.container.setStyle('left', this.leftDist);
			this.current = key;
			this.navs[key].addClass(this.options.navSelectedCSS);
			this.is_running = false;
			
		}.bind(this));		
	
	},
	
	goPrev: function( step, key ){
		
		this.is_running = true;
		var leftDist = this.leftDist + step*(this.options.slideWidth*-1);
		
		$(this.options.slidesShadow).set('morph', {duration:500, transition: Fx.Transitions.Sine.easeOut});
		$(this.options.slidesShadow).morph({opacity:[1,0]});
		
		for( t=0; t < step; t++ )			
			this.container.getLast().inject( this.container,'top');
		
		this.container.setStyle('left', leftDist);
		
		if( step == this.slides.length-1 ){			
			var cloneFirst = this.container.getFirst().clone();	
			var cloneSecond = this.container.getFirst().getNext().clone();			
			cloneFirst.inject(this.container,'inside');
			cloneSecond.inject(this.container,'inside');	
		}		
		
		this.fxSlide.start({'left': [leftDist, this.leftDist]}).chain(function(){			
			/* remove the first and last elements cloned above */
			if(cloneFirst !== undefined && cloneFirst !== null){
				cloneFirst.dispose();
				cloneSecond.dispose();
			}
			
			$(this.options.slidesShadow).setStyle('height',0);
			$(this.options.slidesShadow).set('html','');
			this.slides[key].clone().inject($(this.options.slidesShadow),'inside');
			
			$(this.options.slidesShadow).set('morph', {duration: 500, transition: Fx.Transitions.Sine.easeOut});
			$(this.options.slidesShadow).morph({opacity:[0,1],height:[0,this.options.slideHeight]});
			var getPosition = $(this.options.slidesShadow).getElement(this.options.slidesIntros).get('data-position');
			$(this.options.slidesShadow).getElement(this.options.slidesIntros).morph({bottom:[-1000,getPosition]});
			
			this.current = key;
			this.navs[key].addClass(this.options.navSelectedCSS);
			this.is_running = false;
			
		}.bind(this))
			
		
	}	
});