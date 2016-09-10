<?php
/*======================================================================*\
|| #################################################################### ||
|| # Package - Joomla Template based on YJSimpleGrid Framework          ||
|| # Copyright (C) 2010  Youjoomla.com. All Rights Reserved.            ||
|| # license - PHP files are licensed under  GNU/GPL V2                 ||
|| # license - CSS  - JS - IMAGE files  are Copyrighted material        ||
|| # bound by Proprietary License of Youjoomla.com                      ||
|| # for more information visit http://www.youjoomla.com/license.html   ||
|| # Redistribution and  modification of this software                  ||
|| # is bounded by its licenses                                         ||
|| # websites - http://www.youjoomla.com | http://www.yjsimplegrid.com  ||
|| #################################################################### ||
\*======================================================================*/
defined( '_JEXEC' ) or die( 'Restricted index access' );
$document = &JFactory::getDocument();
	/**
	 * Slides info
	 */
	$slides_range = range(0,4);
	$all_slides = array();
	
  	foreach ($slides_range as $i)
  	{
  	$slide = array(
  			'position' 	=> $this->params->get('slide'.($i+1).'_position'),
  			'intro' 	=> $this->params->get('slide'.($i+1).'_title'),
			'link'		=> $this->params->get('slide'.($i+1).'_link'),
			'image' 	=> $this->params->get('slide'.($i+1).'_image')
  		);
  	$all_slides[] = $slide;
	}
if (!empty($all_slides[0]['image'])){ 
$document->addScript($yj_site.'/src/ShadowSlider.js');
$document->addStyleDeclaration("#YjArtoSlider .overlay,#YjArtoSlider .yjartoBgs,#YjArtoSlider .over_div,#YjArtoSlider .over_div .placement,#YjArtoSlider .slider .slides,#YjArtoSlider .slides ul,#YjArtoSlider .slides ul li{height:".$slider_height."px;}#YjArtoSlider .content,#YjArtoSlider .slider,#YjArtoSlider .slides ul li{width:".$slider_width."px}#YjArtoSlider .slideintroPoz{width:".($slider_width-20)."px}");
?>
<script type="text/javascript">
	window.addEvent('domready', function(){
		var slider = new ShadowSlider({
			slidesContainer:'ImageSlider',
			slidesShadow:'Shadow',
			slidesIntros: '.slideintro',
			slides: 'li',
			pauseOver: 'Shadow',
			slideWidth: <?php echo $slider_width ?>,
			slideHeight:<?php echo $slider_height ?>,
			navigation:'ImageSliderNav',
			navElements:'a',
			goNext: 'next',
			goPrev: 'prev',
			navSelectedCSS: 'selected',
			autoRun: <?php echo $slide_speed ?>,
			duration: <?php echo $slide_trans ?>,
			stopOnClick: false,
			clickDelay: 3000
		});		
	})
</script>
<div id="YjArtoSlider">
	<!-- Shadow container -->
	<div class="over_div">
		<ul class="placement" id="Shadow">
			<li class="slide1">
				<div class="slideintro" data-position="<?php echo $all_slides[0]['position'] ?>">
					<div class="slideintroPoz">
						<?php echo stripslashes($all_slides[0]['intro']) ?>
					</div>
				</div>
				<a class="overlay" href="<?php echo $all_slides[0]['link'] ?>">
				</a>
				<?php if($yjsgBrowser->Name =='msie' && $yjsgBrowser->Version =='8.0'){?>
				<a href="<?php echo $all_slides[0]['link'] ?>" class="yjartoBgs slide1bg">
					<img src="<?php echo $yj_base.$all_slides[0]['image'] ?>" width="100%"  />
				</a>
				<?php }else{ ?>
				<a href="<?php echo $all_slides[0]['link'] ?>" class="yjartoBgs slide1bg" style="background-image: url(<?php echo $yj_base.$all_slides[0]['image'] ?>);">
					<?php } ?>
				</a>
			</li>
		</ul>
	</div>
	<a href="#" id="prev" class="artonavs">
		<span>previous slide</span>
	</a>
	<a href="#" id="next" class="artonavs">
		<span>next slide</span>
	</a>
	<div class="content">
		<!--Slider overall container-->
		<div class="slider" id="pause">
			<!-- actual slides container -->
			<div class="slides">
				<ul id="ImageSlider">
					<?php foreach ($all_slides as $key => $slide):?>
					<?php if (!empty($slide['image'])){ ?>
					<li class="slide<?php echo $key+1 ?>">
						<div class="slideintro" data-position="<?php echo $slide['position'] ?>">
							<div class="slideintroPoz">
								<?php echo stripslashes($slide['intro']) ?>
							</div>
						</div>
						<a class="overlay" href="<?php echo $slide['link'] ?>">
						</a>
						<?php if($yjsgBrowser->Name =='msie' && $yjsgBrowser->Version =='8.0'){?>
						<a href="<?php echo $slide['link'] ?>" class="yjartoBgs slide<?php echo $key+1 ?>bg">
							<img src="<?php echo $yj_base.$slide['image'] ?>" width="100%"  />
						</a>
						<?php }else{ ?>
						<a href="<?php echo $slide['link'] ?>" class="yjartoBgs slide<?php echo $key+1 ?>bg" style="background-image: url(<?php echo $yj_base.$slide['image'] ?>);">
						</a>
						<?php } ?>
					</li>
					<?php } ?>
					<?php endforeach; ?>
				</ul>
			</div>
		</div>
		<!-- end of slider -->
		<div class="navigation" id="ImageSliderNav">
			<?php foreach ($all_slides as $key => $slide):?>
			<?php if (!empty($slide['image'])){ ?>
			<a href="#" title="">
				<!--empty-->
			</a>
			<?php } ?>
			<?php endforeach; ?>
		</div>
	</div>
</div>
<?php }else{ ?>
	Please add minimum one Shadow slider image in template settings
<?php } ?>