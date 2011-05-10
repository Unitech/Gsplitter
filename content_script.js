/*
 *
 * Gsplitter
 * The Google Splitter
 * by Strzelewicz Alexandre
 * http://hemca.com
 * http://gsplitter.hemca.com
 * v1.51
 *
 * Question ? Ask me : strzel_a@hemca.com
 *
 *
 * Revision published 16/12/10
 *
 */

chrome.extension.sendRequest({method: "getState"}, function(response) {
	// if Gsplitter is switcher ON && the adress contain Google == execute gsplitter
if (response.status == '1' && window.location.href.indexOf("google") > 0){gsplitter();}
});

function gsplitter(){

    // We hide the body during page defasing
$('body').hide();


$(document).ready(function(){

var default_url = "http://www.gsplitter.hemca.com/split/";
var dblClick = 0;
var timeoutPrev = 420;
var timeoutColla = 200;
var timeUnload = 2500;
var imgExpand = chrome.extension.getURL("images/expand.png");
var imgExpandToRight = chrome.extension.getURL("images/expandtoright.png");
var imgAdd = chrome.extension.getURL("images/ico_plus.gif");
var imgFavoris = chrome.extension.getURL("images/favoris.png");
var site =  "http://www.gsplitter.hemca.com/split/";

var speedExpand = 400;
// For smooth expand (Switch on/off)
chrome.extension.sendRequest({method: "getSmooth"}, function(response) {
	
	if (response.status == '0'){
	    speedExpand = 0;
	    timeoutPrev	= 70;
	    timeoutColla = 70;
	}
    });

// remove flag windowunload
$('#nav').click(function(){ $(window).unbind();});
$('#gbar').click(function(){ $(window).unbind();});
$('.lsbb').click(function(){ $(window).unbind();});

$('#main').attr("style", 'width :' + (window.innerWidth * 0.35) + 'px;');

$('.m').remove();


$('.vspib').remove();
$('#guser').remove();
$('#leftnav').remove();
$('#rhs').remove();
$('.l').unbind();
$('#center_col').css('marginLeft', '0px');
$('.tsf-p').css('marginLeft', '18px');
$('#vspb').remove();
//$('.ws').remove();
$('.ds').css('z-index', '0');
$('#nr-container').attr('style', 'margin-top : 50px;');
$('#center_col').css('margin-right', '0px');
$('#center_col').css('min-width', '100px');
$('#subform_ctrl').css('margin-left', '19px');
$('#subform_ctrl').css('margin-right', '14px');
$('#center_col').css('min-width', '100px');
$('#cnt').css('width', (window.innerWidth * 0.35) + 'px');
$('#cnt').css('min-width', '0px');
$('.tsf-p').css('margin-right', '14px');
$('.lst-td').attr('width', '90%');
$('#logo').parent().parent().css('margin-left', '33%');
$('.tsf-p').prepend('<br/><br/><br/><br>');
$('.s').css('width', '90%');

// forging CSS
var cssf;
cssf = '<style type="text/css">';
cssf += '#floatMenu{';
cssf += 'position : fixed;';
cssf += 'background-color : white;';
cssf += 'border-left : 1px solid #bcd2f9;';
cssf += 'left : 35%;';
cssf += 'top : 0%;';
cssf += 'width : 65.5%;';
cssf += 'z-index: 100;';
cssf += '}';
cssf += '#myFrame{';
cssf += 'z-index: 100;';
cssf += 'width : 99%;',
cssf += '}';
cssf += '#frameMenu{';
cssf += 'position : absolute;';
cssf += 'width : 14x;';
cssf += 'height : 200px;';
cssf += '}';
cssf += '.vst{';
cssf += 'color : #157cbf !important;';
cssf += '}';
cssf += '.visitinLink{';
cssf += 'border-bottom : 1px solid black;';
cssf += 'width : 50em;';
cssf += 'height : 500px;';
cssf += 'text-decoration : none !important;';
cssf += '}';
cssf += '.visitinBlock{';
cssf += 'font-weight : bold;';
cssf += 'text-decoration : none !important';
cssf += '}';
cssf += '</style>';
// Add it to head
$("head").append(cssf);

// Desactive Instant !
if ($('#po-off-message').attr('style')){
    $('#po-off').attr("onClick");
    $('#po-off').click(function(){parent.location=this.href;});
    $('#po-off').trigger('click');
}
$('.lsd').remove();

// Auto Expand or not ?
chrome.extension.sendRequest({method: "getInstant"}, function(response) {
	if (response.status == '1'){
	   
	    $('#expandButton').unbind('click');
	    $('#expandButton').remove();
	    $('#favorisButton').remove();
	    expand();
	}
});
chrome.extension.sendRequest({method: "getLastUrl"}, function(response) {
	default_url = response.lastUrl;
});

function expand(){
    $('#myFrame').mouseover(function(){
		timeoutId = setTimeout(function(){
			$('#myFrame').unbind('mouseover');
			$('#myFrame').unbind('mouseout');
			$("#floatMenu").animate({left:"-=32.5%"}, speedExpand);
			$("#myFrame").width(window.innerWidth * 0.962);
			$('#expandButton').attr("src", imgExpand);
			collapse();
		    }, timeoutPrev);
	    
	});
    $('#myFrame').mouseout(function(){
	    if (timeoutId){
		clearTimeout(timeoutId);
	    }
	});
}
function collapse(){
     $('#cnt').mouseover(function(e){
		timeoutId = setTimeout(function(){
			$('#cnt').unbind('mouseover');
			$('#cnt').unbind('mouseout');
			$("#floatMenu").animate({left:"+=32.5%"}, speedExpand - 50, function(){
		    	    $("#myFrame").width(window.innerWidth * 0.6425);
			    $('#expandButton').attr("src", imgExpandToRight);
			    });
			expand();
		    }, timeoutColla);
	});
    $('#cnt').mouseout(function(e){
	    if (timeoutId){
		clearTimeout(timeoutId);
	    }
	});
}    

// the remixed iframe ;)
var iframe;
iframe = '<div id="floatMenu">';
iframe += '<div id="frameMenu">';
iframe += '<img id="expandButton" src="' + imgExpandToRight + '" align="left">';
iframe += '<img style="margin-top: 2px;" id="favorisButton" src="' + imgAdd + '" align="right">';
iframe += '</div>';
iframe += '<iframe id="myFrame" name="myFrame" frameborder="0" height="100%" style="z-index: 100;" src="' + default_url + '"></iframe>';
iframe += '</div>'; 
$('body').prepend(iframe);

var swiPan = 0;
$('#expandButton').click(function(){
	if (swiPan == 0){
	    $("#myFrame").width(window.innerWidth - 60);
	    $("#floatMenu").animate({left:"-=32.5%"}, speedExpand);
	    this.src = imgExpand;
	    swiPan = 1;
	}else{
	    $("#floatMenu").animate({left:"+=32.5%"}, speedExpand, function(){
		    	    $("#myFrame").width(window.innerWidth * 0.6425);
			    $('#expandButton').attr("src", imgExpandToRight);
	    });
	    this.src = imgExpandToRight;
	    swiPan = 0;
	}
    });
$('#favorisButton').click(function(){
	window.open(site, '');
});

var linksPop = new Array();
var mouseDownEvent = new Array();
var i = 0;

/*
 * Links overiding begin here
 *
 *
 */
$('.l').each(function(){
	this.value = this.href;
	this.setAttribute('target', 'myFrame');
	linksPop[i++] = this.value;
	var attributes = $.map(this.attributes, function(item) {return item.name;});
	var img = $(this);
	$.each(attributes, function(i) {
		img.attr("style", "color : blue; cursor : pointer; text-decoration : underline;");
	    });
});
i = 0;
$('.r').each(function(){
	var tmp = ' <img src="' + imgAdd + '" onclick="window.open(\'' + linksPop[i++] + '\', \'\');"/> ';
	var tmpp = document.createElement();
	tmpp.innerHTML = tmp;
	//	$(this).prepend(tmp);
				this.appendChild(tmpp);
    });

i = 0;
$('#myFrame').load(function(){$(window).unbind();});
$('.l').click(function(){
	site = this.href;
	$('.visitinBlock').each(function(){
		this.setAttribute("class", "vsc");
		$(this).children().children().children().attr("class", "vst l");
		});
		$(this).parent().parent().parent().attr("class", "visitinBlock");
		  $(window).bind('beforeunload', function() {return "This site want to access on fullscreen.\n\nLeave or stay on the preview ?"; $(window).unbind();});
		setTimeout(function(){$(window).unbind();}, timeUnload);
	if (this.value.indexOf("twitter") > 0 ||this.value.indexOf("mail.yahoo") > 0|| this.value.indexOf("hotmail") > 0 || 
	    this.value.indexOf("groups.google.") > 0 ||
	    this.value.indexOf("chrome.google.") > 0 ||
	    this.value.indexOf("oreilly.") > 0 ||
	    this.value.indexOf("vimeo.") > 0 ||
	    this.value.indexOf("presence-pc.") > 0){
	    window.location = this.value;
	    return ;
	    }
	chrome.extension.sendRequest({method: "setLastUrl", url: this.value});
    });

$('.l').dblclick(function(){
	if (dblClick == 0){
	    $(window).unbind();
	    window.location = this.value;
	}else{
	    window.open(this.value, '');
	    document.getElementById('myFrame').src = default_url;
	}
    });
    $('body').show();
});



/*function test(){
    for (i = 0; i < 1000; i++){
    $.sleep(3, function(){
	});
}
test();
*/
}

/************** END **************/