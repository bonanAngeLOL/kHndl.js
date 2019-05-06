let kRecipe = {keys:[]};
let queue = {
				codes: [
                    	{
							kList:["ArrowUp","ArrowUp","ArrowUp"],
							callBack:()=>console.log("ArrowUpx3 xD")
						},
                    	{
							kList:["ArrowUp","ArrowLeft","ArrowLeft","ArrowLeft"],
							callBack:()=>console.log("Another Code xD")
						}
					   ]
			};

let kCallback = 	
	    {
	    	checkQ : (com,index,result=[]) => (queue.codes.forEach((x,y)=>x.kList[index]==com?result.push({codeIndex:y,finished:x.kList.length-1==index}):0),result),
			action : (result,exCount=0)=>(result.forEach(R=>R.finished?(queue.codes[R.codeIndex].callBack(),exCount++):0),exCount),
			get : function(obj,prop)
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
				 				console.log("Command: "+value+" position: "+obj.keys.length);
				 				checked = this.checkQ(value,obj.keys.length);
				 				console.log(checked);
				 				if(checked.length>0){
				 					if(this.action(checked)==1&&checked.length==1){
				 						obj.keys.length=0;
				 					}
				 					else{
				 						obj.keys.push(value);
				 					}
				 				}
				 				else{
				 					obj.keys.length = 0;
				 				}
				 			return value;
				 			break;
				 		default:
				 			return false;
				 	}
				 }
	    };
let keys = new Proxy(kRecipe,kCallback);

document.addEventListener("keydown",Ev=>keys.add=Ev.key);