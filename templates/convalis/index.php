<?php
/*======================================================================*\
|| #################################################################### ||
|| # Package - Joomla Template based on YJSimpleGrid Framework          ||
|| # Copyright (C) since 2007  Youjoomla.com . All Rights Reserved.     ||
|| # license - PHP files are licensed under  GNU/GPL V2                 ||
|| # license - CSS  - JS - IMAGE files  are Copyrighted material        ||
|| # bound by Proprietary License of Youjoomla.com                      ||
|| # for more information visit http://www.youjoomla.com/license.html   ||
|| # Redistribution and  modification of this software                  ||
|| # is bounded by its licenses                                         ||
|| # websites - http://www.youjoomla.com | http://www.yjsimplegrid.com  ||
|| #################################################################### ||
\*======================================================================*/
/* 
	Joomla! Template Based on YJSG Framework version 1.0.14 Stable - 9-18-2012
*/
defined( '_JEXEC' ) or die( 'Restricted index access' );
define( 'TEMPLATEPATH', dirname(__FILE__) );
define( 'YJSGPATH', TEMPLATEPATH.DIRECTORY_SEPARATOR);
require( YJSGPATH."yjsgcore/yjsg_core.php");/* YJSGFramework main functions*/
?>
<!DOCTYPE html>
<html xml:lang="<?php echo $this->language; ?>" lang="<?php echo $this->language; ?>" dir="<?php echo $this->direction; ?>">
<head>
<?php require( YJSGPATH."yjsgcore/yjsg_head.php");/* <head> files containing css , js and conditions */?>
</head>
<body id="stylef<?php echo $default_font_family ?>" class="yjsgbody style_<?php echo $css_file.$browserClassName.$rtlClass ?>">
	<div id="centertop" class="yjsgsitew">
		<?php require( YJSGPATH."layouts/yjsg_headerblock.php");/* header - header grid located in this file */?>
	</div>
		<?php 
		if($topMenuLocation == 0 ){ /* if topmenu location is inside the header we dont need it here */
			require( YJSGPATH."layouts/yjsg_topmenu.php");/* top menu */
		}
		?>
		<?php 
            if ($slider_switch == 1) {
                $slider_itemid = JRequest::getVar('Itemid');
                if( is_array( $assign_slider_itemid )){
                    if( in_array($slider_itemid, $assign_slider_itemid) ){
                     require_once( YJSGPATH."layouts/shadow_slider.php"); /*shadow slider */
					 $document->addStyleDeclaration("#topmenu_holder{position:absolute;width:100%;}");
                    }
                }elseif($slider_itemid == $assign_slider_itemid){
                    require_once( YJSGPATH."layouts/shadow_slider.php");
					$document->addStyleDeclaration("#topmenu_holder{position:absolute;width:100%;}");
                }
            }
        ?>
		<?php yjsg_print_grid_area('yjsg1',true,$yjsg1_before,$yjsg1_after); /* grid 1 top1=top5 */ ?>
		<?php yjsg_print_grid_area('yjsg2',true);/* grid 2 adv1-adv5*/ ?>
		<?php yjsg_print_grid_area('yjsg3',true,$yjsg3_before,$yjsg3_after);/*grid 3 user1-user5*/ ?>
		<?php yjsg_print_grid_area('yjsg4',true);/* grid4 user6-user10*/ ?>
	<!-- end centartop-->
	<div id="centerbottom" class="yjsgsitew">
		<?php require( YJSGPATH."layouts/".$yjsg_loadlayout.".php");/* mid grid - mainbody grids located in layout*/?>
		<?php require( YJSGPATH."layouts/yjsg_pathway.php");/* pathway including breadcrumb module position */ ?>
	</div>
	<!-- end centerbottom-->
	<?php yjsg_print_grid_area('yjsg5',true,$yjsg5_before,$yjsg5_after);/* grid 5 user11-user15*/ ?>
		<?php yjsg_print_grid_area('yjsg6',true);/* grid 6 user16-user20*/ ?>
    <div class="bottom_out">
        <?php yjsg_print_grid_area('yjsg7',true);/* grid 7 user21-user25*/ ?>
        <?php require( YJSGPATH."layouts/yjsg_footer.php");/* footer -  footer menu , copyright , YJSG logo , validation links*/ ?>
	</div>
	<?php require( YJSGPATH."layouts/yjsg_notices.php");/* IE6 and nonscript notices*/?>
	<?php 
    if($responsive_on == 1 && ($topmenu_off == 2 || $itemid == 0 )) {
        require( YJSGPATH."layouts/yjsg_mobilemenu.php");/* responsive menu select list loaded at the end . better for seo */
    }
    ?>
	<?php 
    if ($this->countModules('sidepanel') || $yjsgBotPanel_loaded || $yjsgTopPanel_loaded) { 
        require( YJSGPATH."layouts/yjsg_panels.php");/* Sliding panels */
    }
    ?>
</body>
</html>