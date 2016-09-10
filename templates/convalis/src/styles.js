/*======================================================================*\
|| #################################################################### ||
|| # Package - Joomla Template based on YJSimpleGrid Framework          ||
|| # Copyright (C) 2010  Youjoomla.com. All Rights Reserved.            ||
|| # Authors - Dragan Todorovic and Constantin Boiangiu                 ||
|| # license - PHP files are licensed under  GNU/GPL V2                 ||
|| # license - CSS  - JS - IMAGE files  are Copyrighted material        ||
|| # bound by Proprietary License of Youjoomla.com                      ||
|| # for more information visit http://www.youjoomla.com/license.html   ||
|| # Redistribution and  modification of this software                  ||
|| # is bounded by its licenses                                         ||
|| # websites - http://www.youjoomla.com | http://www.yjsimplegrid.com  ||
|| #################################################################### ||
\*======================================================================*/
window.addEvent("load", function() {
   $$('.yj_hover_effect').each(function (el) {
	var parent_width	= el.getParent().getSize().x;
	var parent_height	= el.getParent().getSize().y;
	var image    		= el.getElement('img');
	var readmore		= el.getElement('.yj_readmore');
	var zoom     		= el.getElement('.yj_zoom');
	var titcat			= el.getElement('.yj_titcat');
	var title			= el.getElement('.yj_title');
	var category		= el.getElement('.yj_category');
    var fx = new Fx.Morph(image, {
      duration: 400,
      'link': 'cancel',
	  transition: Fx.Transitions.Circ.easeOut
    });
    var fx2 = new Fx.Morph(readmore, {
      duration: 400,
      'link': 'cancel',
	  transition: Fx.Transitions.Circ.easeOut
    });
	var fx3 = new Fx.Morph(zoom, {
      duration: 400,
      'link': 'cancel',
	  transition: Fx.Transitions.Circ.easeOut
    });
	var fx4 = new Fx.Morph(titcat, {
      duration: 400,
      'link': 'cancel',
	  transition: Fx.Transitions.Circ.easeOut
    });
    el.addEvents({
      mouseenter: function () {
        fx.start({
		   'opacity':[0]
        });
        fx2.start({
		   right:10
        });
        fx3.start({
		   left:10
        });
        fx4.start({
		   'opacity':[1],
        });
      },
      mouseleave: function () {
        fx.start({
		   'opacity':[1]
        });
		fx2.start({
		   right:-30
        });
        fx3.start({
		   left:-30
        });
        fx4.start({
		   'opacity':[0]
        });
      }
    });
  });
   $$('.cme.team .yjme_item').each(function (el) {
	var tag			= el.getElement('.team_member_tag');
    var fx = new Fx.Morph(tag, {
      duration: 400,
      'link': 'cancel',
	  transition: Fx.Transitions.Circ.easeOut
    });
    el.addEvents({
      mouseenter: function () {
        fx.start({
			right:-5
        });
      },
      mouseleave: function () {
        fx.start({
			right:-150
        });
      }
    });
  });  
});