/**
 * Damini Singh : 1001408915
 * On Reset button - maximum score stays the same as previous games, 
 * but on initialization, maximum score resets.
 */

	var id = 0;
	var strike = 0;
	var balltop;
	var ballleft;
	var direction;
	var max = 0;
	var angle;

function startGame()
{
	var elem = document.getElementById("ball");	
	document.getElementById("messages").innerHTML = "Game is started";
	
	var speed = 0;	
	firstbounce(0,"first");

	//This function is called when the ball is on left wall
	function firstbounce(value,direction)
	{	
		
		//For setting the speed
		var speedvalue = setSpeed();		
		if(speedvalue == 0)
			{
				speed = 30;
			}
		else if (speedvalue == 1)
			{
				speed = 10;
			}
		else 
			{
				speed = 0.0000001;
			}
		
		//This is when the function is called next time from the other function.
		if (value == 2)
			{
				var top = parseInt(elem.style.top,10) ;
		    	var left = parseInt(elem.style.left,10) ;
			}
		
		else
			{
				// this is for the first function
				var top = balltop;
			    var left = ballleft;
			}

		//This condition is to checkwhen "start button is clicked twice"
		if(id ==0)
			{
				id = setInterval(firstframe, speed);
			}
		else
			{
				clearInterval(id);
				id = setInterval(firstframe, speed);
			}
	    function firstframe() 
	    {
	    	
	    	var paddletop = parseInt(document.getElementById("paddle").style.top);
			var paddlebottom = paddletop - 100;
			
			
			//Calls the second function when ball hits the bottom wall.
			if (top >= 399)  
		        {    
		        	 clearInterval(id);	
			         ballbounce("right"); 
		        	         
		        } 
	        
	      //Calls the function when ball hits the top wall.
	        else if(top <= -79) 
	        	{
	        	   
	        	    clearInterval(id);
		        	tobottombounce("right"); 
		        	
	        	}
	        
	     // This method is called when ball hits the right ball
	        else if( left >= 750 && left <=765 && top <= paddletop && top >= paddlebottom )
    				{
	        			strike ++;
	        			document.getElementById("strikes").innerHTML = strike;
	        			clearInterval(id);
	        			// goes in left after striking right wall
	        			
						toleftbounce("left");

    				}
	        // This method is called when paddle doesnt hit on the paddle
    	    	else if(left >= 750)
	        		{
	    	    	
    	    		document.getElementById("messages").innerHTML = "better luck next time";
    	    		clearInterval(id);
	        		resetGame();
	        		}
	       
	        
	        else
		        {
	        	//when ball hits top wall from top, it goes to right
	        	if (direction == "right")
	        		{
		        	left  = left + Math.cos(45/180*Math.PI);
		  		    top = top - Math.sin(45/180*Math.PI);
		            elem.style.top = top + 'px'; 
		            elem.style.left = left + 'px'; 	  
	        		}
	        	
	        	else if (direction =="first")
	        	{
	        		left  = left + Math.cos(angle/180*Math.PI);
		  		    top = top + Math.sin(angle/180*Math.PI);
		            elem.style.top = top + 'px'; 
		            elem.style.left = left + 'px';
	        	}
	        	else
        		{
	        	// when ball hits left wall from bottom, it goes to right
        		left  = left + Math.cos(45/180*Math.PI);
	  		    top = top + Math.sin(45/180*Math.PI);
	            elem.style.top = top + 'px'; 
	            elem.style.left = left + 'px'; 	
        		}
		        }
	    }
    
    }	// end of firstbounce function
    
	
	//Method when ball hits the bottom wall.
    function ballbounce(direction)
    {
    	
    	var top = parseInt(elem.style.top,10) ;
    	var left = parseInt(elem.style.left,10);  
	
    	id = setInterval(secondframe, speed);
    	
    	
    	function secondframe()
		    	{
    		
	    		var paddletop = parseInt(document.getElementById("paddle").style.top);
				var paddlebottom = paddletop - 100;
							
				
				// This method is called when ball hits the right ball
							
				 if( left >= 750 && left <=765 && top <= paddletop && top >= paddlebottom )
    				{
	    				strike +=1;
						document.getElementById("strikes").innerHTML = strike;
    					clearInterval(id);  	    					
						toleftbounce("left");

    				}
    	    	else if(left >= 750)
        		{
    	    		document.getElementById("messages").innerHTML = "better luck next time";
    	    		clearInterval(id);    	    		
    	    		resetGame();
        		}
    			
    	    	else if(top <= -79) //top
	        	{
    	    		clearInterval(id);
		        	tobottombounce("right"); 
		        	
	        	}
    			
    	    	else if(left <= 1) 
        		{
        		 
        		 clearInterval(id);
        		 firstbounce(2,"right");      		 
        		}
    			
    	   			    			
    			else
    				{
	    				if(direction == "right")
	    					{
		    	    		left  = left + Math.cos(45/180*Math.PI);
		    	    		top = top - Math.sin(45/180*Math.PI);
		    	            elem.style.top = top + 'px'; 
		    	            elem.style.left = left + 'px';
	    					}
	    				else
    					{   // ball goes to left when coming from the right wall
	    					left  = left - Math.cos(45/180*Math.PI);
		    	    		top = top - Math.sin(45/180*Math.PI);
		    	            elem.style.top = top + 'px'; 
		    	            elem.style.left = left + 'px';
    					}
    				}    		
		    	}
    	
    } // end of ballbounce function
    
    
    // This method is called when ball hits the right wall
    function toleftbounce(direction)
    {
    	
    	var top = parseInt(elem.style.top,10) ;
    	var left = parseInt(elem.style.left,10) ;
    	id = setInterval(thirdframe, speed);
    	
    	function thirdframe()
    	{
    					
    		// this is called when ball hits the top wall
			 if(top <= -79)
			{
    			clearInterval(id);
    			tobottombounce("left");   			
			}
    		
    		else if(left <= 1)// left
    		{
    		 
    		 clearInterval(id);
    		 firstbounce(2,"right");     		 
    		}
    		
    		else if (top >= 399)  
    			 
		        {    
		        	 clearInterval(id);	
			         ballbounce(); 
		        	         
		        } 
    		
    		else
    		{
    		if(direction == "left")
    			{
	    		left  = left - Math.cos(45/180*Math.PI);
	    		top = top - Math.sin(45/180*Math.PI);
	            elem.style.top = top + 'px'; 
	            elem.style.left = left + 'px';
    			}
    		
    		else
    			{
    			left  = left - Math.cos(45/180*Math.PI);
	    		top = top + Math.sin(45/180*Math.PI);
	            elem.style.top = top + 'px'; 
	            elem.style.left = left + 'px';
    			
    			}
    		}
    	}
    }
    
    
    //this memthod is called when ball hits the top wall and it can go in all the 
    // three directions(left<= 0, left >= 750, top >=400)
    function tobottombounce(direction)
    {
    	
    	var top = parseInt(elem.style.top,10) ;
    	var left = parseInt(elem.style.left,10) ;
    	id = setInterval(fourthframe, speed);
    	
		
    	function fourthframe()
    	{
    		var paddletop = parseInt(document.getElementById("paddle").style.top);
    		var paddlebottom = paddletop - 100;
    		
			   	
    	//condition for ball hitting the left ball.
		if(left <= 1)
    		{
    		
    		 clearInterval(id);
    		 firstbounce(2,"left");
    		 
    		}
    	//condition for ball hitting the bottom wall
    	else if (top >= 399)
    	{
    		
   		 	clearInterval(id);
   		    ballbounce("right")
    	}
    	
    	//Right wall
    	else if( left >= 750 && top <= paddletop && top >= paddlebottom)
    		
    	{	
    		
    		 strike +=1;
			 document.getElementById("strikes").innerHTML = strike;
			 clearInterval(id);
			 toleftbounce("right");
   		 	
   		   
    	}
    	
    	else if(left >= 750)
			{
    		document.getElementById("messages").innerHTML = "better luck next time";
    		clearInterval(id);
			resetGame();
			}
    	
    	
    	else
    		{
    		if(direction == "left")
    			{	
    				// ball goes in the left
		        	left  = left - Math.cos(45/180*Math.PI);
		    		top = top + Math.sin(45/180*Math.PI);
		            elem.style.top = top + 'px'; 
		            elem.style.left = left + 'px';
    			}
    		
    		else
    			{
    			    // ball goes in the right
	    			left  = left + Math.cos(45/180*Math.PI);
		    		top = top + Math.sin(45/180*Math.PI);
		            elem.style.top = top + 'px'; 
		            elem.style.left = left + 'px';
    			}
    		}

		}
    	
    }
    
   
} // End of StartGame function


function movePaddle(event)
{ 		
	var x = event.pageX;       // Get the horizontal coordinate
	var y = event.clientY;     // Get the vertical coordinate
	
	var elem = document.getElementById("paddle");
	var paddletop = elem.style.top;
	
	if( y >= 400)
		{
		elem.style.top = 400 + 'px';
		}
	
	else
		{
		elem.style.top = y + 'px'
		}
	
    elem.style.left = 750 + 'px';
    

}

function initialize()
{	
	document.getElementById("messages").innerHTML = "All the best for the game";
	
	// angle for the first wall is determined
	angle = Math.floor(Math.random() * (45 - (-45) + 1)) + (-45);
	var elem = document.getElementById("ball");
	
	// This is for random position in the starTing
	var range = Math.floor((Math.random() * 400) + 0);
	balltop = range;
	ballleft = 0;
	
	elem.style.top = range + 'px';   
	elem.style.left = 0 + 'px';


}


function setSpeed()
{
	
	var speed ;
    var elements = document.getElementsByName("speed");
    for (var i = 0, l = elements.length; i < l; i++)
    {
        if (elements[i].checked)        	
        {	
        	
            return elements[i].value ;
            
        }
    }
    
}


function resetGame()
	
{	
	var elem = document.getElementById("ball");
	document.getElementById("messages").innerHTML = "Game is reset";
	//For setting the maximum score
	if(strike > max)
		{
			max = strike;
		}
	document.getElementById("score").innerHTML = max;
	
	//set strike value to 0 after resetting the game.
	strike = 0;
	document.getElementById("strikes").innerHTML = strike;
		
	// This is for random position in the starTing
	var range = Math.floor((Math.random() * 400) + 0);	
	elem.style.top = range + 'px';
	elem.style.left = 0 + 'px';
	balltop = range;
	ballleft = 0;
	clearInterval(id);

		
}

