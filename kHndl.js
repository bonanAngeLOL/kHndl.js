let kRecipe = {keys:[]};
let queue = [
				["ArrowUp","ArrowUp","ArrowUp"],
				["ArrowUp","ArrowLeft","ArrowLeft","ArrowLeft"]
			];
let kCallback = 	
	    {
	    	checkQ = (com,index,result) => ((for(var i=0;i<queue.length;i++){
	    		queue[i][index]==com?result.push(i):0;
	    	}),result),
			get: function(obj,prop)
				 {
					switch(prop){
						case 'last':
							return obj.keys.shift();
							break;
						case 'all':
							return obj.keys;
							break;
						case 'length':
							return obj.keys.length;
							break;
				 		case 'clean':
				 			obj.keys.length = 0;
				 			return obj.keys.length==0;
						default:
							return false;
							break;
					}
				 },
			set: function(obj, prop, value)
				 {
				 	switch(prop){
				 		case 'add':
				 			obj.keys.push(value);
				 			return value;
				 			break;
				 		default:
				 			return false;
				 	}
				 }
	    };
let keys = new Proxy(kRecipe,kCallback);

document.addEventListener("keydown",Ev=>keys.add=Ev.key);