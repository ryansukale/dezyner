$(function(){	var $styleTarget={};	var initialElementStyles='';	var newElementStyles='';			var defaultStyleClassNames = ['bodyClass','wrapper','banner','header-panel','menu-panel','main-panel','content-panel','push','footer'];		var customClassNames = [];		var defaultStyleClassStyles = {		'bodyClass':			{				'height': '100%',				'margin':'0px',				'padding':'0px',				'text-align':'center'			},		'wrapper':{			'min-height': '100%',			'height': 'auto !important',			'height': '100%',			'margin': '0 auto -4em;'		},		'header-panel':{			'width':'100%',			'height':'80px',			'background-color':'#d0d0d0',			'margin':'0px',			'padding':'0px'		},		'banner':{},		'menu-panel':{			'width':'100%',			'height':'20px',			'background-color':'grey'		},		'main-panel':{			'width':'978px',			'margin-left':'auto',			'margin':'auto',			'padding':'auto',			'padding-right':'auto',			'text-align':'left',			'overflow':'auto',			'border':'1px solid grey'		},		'content-panel':{			'margin':'5px',			'width':'966px',			'height':'100%',			'float':'left',			'border':'1px solid black'		},		'push':{			'height': '4em'			},		'footer':{			'height': '4em'		}	};		console.log('here');		/*This function is used to set up the CSS properties for the default elements on the layout*/	function setupDefaultCSS(){		var count = 3;		$.each(defaultStyleClassStyles,function(className,cssPropertyMap){			//console.log('asd');			//if(count>0)			//{			//	console.log(className +' : '+ cssPropertyMap)			//}												$.each(cssPropertyMap,function(cssProperty,cssValue){				//if(count>0)				//{				//console.log(cssProperty + ' ' + cssValue);				//}				$('.'+className).css(cssProperty,cssValue).data(cssProperty,cssValue);			});						if(className=='wrapper'){				console.log($('.'+className).attr('style'));				$('.'+className).attr('style',$('.'+className).attr('style') + ';height:auto !important;height:100%;');				console.log($('.'+className).attr('style'));			}					});	}		setupDefaultCSS();		var cssProperties =['id','background-color','class','position','overflow',						'float','clear','margin','padding',						'border','width','height','border'];		var basicAttrs = ['id','class'];		var selectListAttributes = ['position','overflow','float','clear'];		var storedAttributes = ['background-color','position','overflow',						'float','clear','margin','padding',						'border','width','height','border'];			var newChildDefaultCSSProps = {'margin':'5px','width':'50px',									'height':'50px',									'border':'1px solid black'};			var hiddenSiblings = false;	$('.customizer input[name="backgroundColor"]').live('click',function(event){						if(hiddenSiblings==false){			$(this).parents('li').siblings().hide();			hiddenSiblings=true;			////console.log('hiding siblig');			$('.dezyner').dialog('option','width',620).dialog('option','height',400);;		}		else{			$(this).parents('li').siblings().show();			hiddenSiblings=false;			$('.dezyner').dialog('option','width','290px').dialog('option','height','auto');		}				colorPicker(event,undefined, undefined, undefined, false);	});			/*Initizlize the dialog on the designer and on the popup that shows the CSS*/	$('.dezyner').dialog(		{ 	autoOpen: false ,			width:290		});	$('.css-properties').dialog({ autoOpen: false });		$('.html-details').dialog({ autoOpen: false ,width : 600, height:500});				function init($target){		$styleTarget = $target;		initialElementStyles=$styleTarget.attr('style');			}		$('.wrapper div, .footer, .footer div').bind('click',function(event){		resetDezyner('.selection-panel-1');				//Save the initial state of the element so that it can be restored in case the user chooses to cancel		//the styling operation.		init($(event.target));				$( ".dezyner").dialog('open').dialog('option','title','Choose A Task');		event.stopPropagation();			}).css({'cursor':'pointer'});			function resetDezyner(selector){		$(selector).css({'display':'block'}).siblings().css({'display':'none'});	}			function setupCurrentProperties($propertyContainer){				//console.log('inside setupCurrentProperties');				$('.options li',$propertyContainer).each(function(key,attrDetails){					//Get the attribute name and the attribute value holder			var attrName = $('.attr-name',attrDetails).html();			var $valueHolder= $('.values',attrDetails).children();						//console.log("setupCurrentProperties : "+attrName);						//If it is an attribute, extract the attribute value from the element			if($.inArray(attrName,basicAttrs)>-1){				$valueHolder.val($styleTarget.attr(attrName));			}			else{				//If it is one of the attributes for which we use a select list				if($.inArray(attrName,selectListAttributes)>-1){					$( ".dezyner").dialog('option','title','Current Values');									$('option',$valueHolder)						.removeAttr('selected')						.each(function(){							if($(this).html()==$styleTarget.css(attrName)){								$(this).attr('selected','selected');							}						});					}				else{									if($styleTarget.data(attrName)){						$valueHolder.val($styleTarget.data(attrName));					}					else{						$valueHolder.val($styleTarget.css(attrName));					}													}							}					});			}		$('.customizer .apply').click(function(){		var styles = {};		//console.log("applying styles");				$('.customizer .options li').each(function(key,attrDetails){						//Get the attribute name and the attribute value holder			var attrName = $('.attr-name',attrDetails).html();			var $valueHolder= $('.values',attrDetails).children();			var value ='';						//If it is an attribute, then simply set it on the target element			if($.inArray(attrName,basicAttrs)>-1){				$styleTarget.attr(attrName,$valueHolder.val());			}			else{							//If it is a select field, get the selected option				if( $valueHolder[0].tagName =="SELECT"){					value=$valueHolder.find("option:selected").html();						}				else{					//If it is a textfield, then get the textfield's value					value = $valueHolder.val();				}				//Save the css style on a temporary style array				styles[attrName]=value;			}						//Eventually store the attributes and styles in the data map of the element			$styleTarget.data(attrName,value);								});						var styleAttrValue=''		newElementStyles='';		$.each(styles,function(key,value){			styleAttrValue += key +':' + value +';';			newElementStyles+= key +':' + value +'; <br/>';		});						$styleTarget.attr('style',styleAttrValue);				var styleDetails = '{';				$.each(storedAttributes,function(key,attribute){			styleDetails+=attribute+':'+$styleTarget.data(attribute)+'; ' + '<br/>';		});		styleDetails +='}';						$styleTarget.attr('title',styleDetails).tipTip({defaultPosition:'top'});	});		$('.dezyner .add-child-panel').click(function(event){		//console.log('asd');				var $parentElement = $styleTarget;				var $childElement = $('<div/>');				if($parentElement.css('overflow')!='auto'){			$parentElement.css({'overflow':'auto'});			//$parentElement.css({'overflow':'auto','height':'auto'});			$parentElement.data('overflow','auto');			//$parentElement.data('height','auto');		}						var parentHasFloatedChldren=false;				/*		$.each($parentElement.children().last(),function(key, value){			if($(this).css('float')=='left'&&$(this).css('clear')!='both'){				$childElement.css('float','left');			}		});		*/				//Determine the float style of the element based upon the float sytle of the last		//child of the parent container.		var $lastChild  = $parentElement.children().last();		if(			($lastChild.css('float')=='left'||$lastChild.css('float')=='right')						&&			$lastChild.css('clear')!='both'){				$childElement.css('float',$lastChild.css('float'));			}				$.each($parentElement.children(),function(key, value){			var totalWidthOccupiedByChildren=0;			if($(this).css('float')=='left'&&$(this).css('float')!='right'){				$childElement.css('float','left');			}		});						$parentElement.append($childElement);				//Apply the default properties to the child element		$.each(newChildDefaultCSSProps,function(key,value){			$childElement.data(key,value);		});								$.each(cssProperties,function(index,cssProperty){			$childElement.css(cssProperty,$childElement.data(cssProperty));		});				$styleTarget = $childElement;		setupCurrentProperties($('.customizer'));		$('.customize').parent().hide();		$('.customizer').show();		////console.log($parentElement.size());		////console.log($parentElement.css('overflow'));					});			$('.customizer .get-css').click(function(){		$('.css-properties').html(newElementStyles);		$('.css-properties').dialog('open').dialog('option','title','CSS for this div');	});		$('.customize').click(function(){		$(this).parent().hide();		setupCurrentProperties($('.customizer'));		$('.customizer').show();	});			$('.dezyner .delete').click(function(){		$styleTarget.remove();				if($('.main-panel').children().size()==0){			$('.main-panel').css('height','100%');		}	});			//$('.wrapper div, .footer, .footer div').tipTip({defaultPosition:'left'});		$('.wrapper div, .footer, .footer div').mouseover(function(event){		//console.log($(this).attr('class'));	});		/*$('.wrapper div, .footer, .footer div').hover(function(event){		$(this).addClass('customize-selector');		event.stopPropagation();	},	function(event){		$(this).removeClass('customize-selector');		event.stopPropagation();	});	*/		$('.copy-html').click(function(event){		console.log('adds');				var $allHtml = $('html').clone();				$allHtml.find('.dezyner,.html-details').remove();				$allHtml.find('.footer').nextAll().remove();				var allHtmlString = '<html>' + $allHtml.html() +'</html>';				//console.log(allHtmlString);		//allHtmlString=allHtmlString.replaceAll('<','&lt;');		//allHtmlString=allHtmlString.replaceAll('>','&gt;');		//console.log(allHtmlString);		//console.log();								$('.html-details').append('<textarea>');				$('.html-details textarea').css({'width':'500px','height':'500px'}).val(allHtmlString);				//$('.html-details').html($allHtml.html());				$('.html-details').dialog('open').dialog('option','title','HTML Of Your Design');			});		$('.customize-parent').click(function(event){		$(this).parent().hide();		$styleTarget=$styleTarget.parent();		setupCurrentProperties($('.customizer'));		$('.customizer').show();	});		$('.dezyner .selection-panel-1 div').hover(function(){		$(this).addClass('selection');	},	function(){		$(this).removeClass('selection');	});		$('.push').unbind('click').unbind('mouseover').unbind('mouseout');		$('.wrapper div, .footer, .footer div').tipTip({defaultPosition:'left'});	//$('.wrapper div, .footer, .footer div').tipTip({defaultPosition:'left'});	//$('.content-panel').tipTip({defaultPosition:'top'});});