let $kHndl = new function(){
    this.kRecipe = {keys:[]};
    this.queue = {
                    codes: []
                };
    this.addEv = (list,callBack)=>this.queue.codes.push({'kList':list,'callBack':callBack});
    this.kCallback = 	
            {
                checkQ : (com,index,result=[]) => (this.queue.codes.forEach((x,y)=>x.kList[index]==com?result.push({codeIndex:y,finished:x.kList.length-1==index}):0),result),
                action : (result,exCount=0)=>(result.forEach(R=>R.finished?(this.queue.codes[R.codeIndex].callBack(),exCount++):0),exCount),
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
                                    checked = this.checkQ(value,obj.keys.length);
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
	this.keys = new Proxy(this.kRecipe,this.kCallback);
	document.addEventListener("keydown",Ev=>this.keys.add=Ev.key);
}