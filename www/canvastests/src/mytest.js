(function(window, document, undefined){
//var mytest = (function (window, document) {


	swipeX = 0;
	swipeY = 0;
	swipeScale = 1;
	swipeWidth = $('#swipeview-slider').width();
	swipeHeight = $('#swipeview-slider').height();


	var test
	test = "goober"

	//create objects labled column row
	SwipeObjectCreator = function (type){
		swipeobject = {};
		decrement = type;
		iteration = 0;
		while (decrement>1){
			iteration = iteration+1;
			decrement = decrement / 2;
			for (var i=1;i<decrement+1;i++){
				iterationvar = String(iteration)+String(i);
				swipeobject[iterationvar] = {};
				swipeobject[iterationvar].prop = 'fun';
				///ultimately link this with our premade objects
			}
	  	}
	  	return _.clone(b32) 
	};

	createdivs = function(obj){

		for (var key in obj){
			var col=key.substr(1,1);
			var row=key.substr(2,2);
			console.log(col + "-" + row);
			itemtemplate = $('.template');
		    itemdom2 = itemtemplate.clone()
		    if(obj[key].t !== 'no'){
			    switch(obj[key].t){
					case 'be':
						itemdom2.addClass("be");
					break;				
					case 'te':
						itemdom2.addClass("te");
					break;				
					case 'co':
						itemdom2.addClass("co");
					break;				
					case 'bc':
						itemdom2.addClass("bc");
					break;				
					case 'tc':
						itemdom2.addClass("tc");
					break;				
					case 'ce':
						itemdom2.addClass("ce");
					break;
					case 'fin':
						itemdom2.addClass("fin");
					break;			
					case 'win':
						itemdom2.addClass("win");
					break;
				}
		       	if  ((obj[key].t !== 'co')&&(obj[key].t !== 'ce')&&(obj[key].t !== 'win')){
		       		itemdom2.addClass("hasbra");
		       	} 
		        itemdom2.removeClass('template hide')
		        console.log(col);
		        if (col !== '1'){
			        itemdom2.css( "top",  (row-1)*100 + '%');
			    }else{
			    	var topper = (row-1)*100;
			        itemdom2.css( "top",topper+50 + '%' );
			        console.log (topper+50);
			        console.log('inside');
			    }
		        itemdom2.css( "left", (col-1)*100 + '%');
		        $("#swipeview-slider").append(itemdom2);

	       	}

		}			
	};	

	cssexperiment = function (el){
		this.wrapper = typeof el == 'string' ? document.querySelector(el) : el;
		this.wrapper.style.overflow = 'hidden';
		this.wrapper.style.position = 'relative';
		div = document.createElement('div');
		div.id = 'swipeview-slider';
		div.style.cssText = 'position:relative;top:0;height:100%;width:100%;' + cssVendor + 'transition-duration:0;' + cssVendor + 'transform:translateZ(0);' + cssVendor + 'transition-timing-function:ease-out';
		this.wrapper.appendChild(div);
		this.slider = div;

		//this.refreshSize();
	};

	movethisfucker= function(temp){
		console.log(temp[0]);
		$('#swipeview-slider').css({'transform':'translate('+temp[0]*-1*swipeWidth+'px,'+temp[1]*-1*swipeHeight+'px)'+' scale('+1+')'})

	}
	navigation = function (type, el, dimension){
		//navholder = typeof el == 'string' ? document.querySelector(el) : el;

		intial = type/2;


		//iterationvalue
		iteration = 0;

		decrement = type;

		liveboxmultiple = 1;
		while (decrement>1){

		//column
		
		//row decreases
		decrement = decrement / 2;

		iteration = iteration+1;

		//should flip 16 times a section
			for (var i=1;i<intial+1;i++){
				//create a box 
				itemtemplate = $('.navtemplate');
			    itemdom = itemtemplate.clone()
		        .removeClass('navtemplate hide')
		        .css( "top",  i*dimension + 'px')
		        .css("left", iteration*dimension +'px')
		     	.addClass('navbox')
		     	.attr('id', iteration+'-'+i)
		        .css("z-index", 9999)
		        .click(function(event){
		        	console.log('here');
		        	console.log(event.target.id);

		        	var n=event.target.id.split("-");
		        	//console.log(n);
		        	movethisfucker(n);

		        });

				if (i%liveboxmultiple/2 === 0){
					itemdom.addClass('livebox');
				}

				iterationvar = String(iteration)+String(i);
				itemdom.addClass(iterationvar);
		        $("#navigation").append(itemdom);	

			}

			liveboxmultiple = liveboxmultiple *2

		 }
	  	return;


	}

	


})(window, document);