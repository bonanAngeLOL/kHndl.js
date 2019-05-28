// $kHndl init
let $kHndl = new function(){
    //This object stores pressed keys
    this.kRecipe = {keysC:[],keysS:{u:[],d:[]}};
    //Where codes and shorcuts expected to be performed are stored
    this.queue = {
                    codes: [],
                    shortc: []
                };
    //Funtion to store list of keys in "queue"
    this.addEv = (list,callBack,type)=>
            //To select a queue in accordance with "type" parameter
                this.queue[(type==1?"shortc":"codes")].
            //List of keys and callback function pushed to list
                push({'kList':list,'callBack':callBack});

    //Object to be passed as argument to Proxy
    this.kCallback = 	
            {  
                // Function to check a list accomplishment
                //  where 
                //      com = command key
                //      index = queue index where that key and com will be compared
                //      result = Info about match status to be returned
                checkQ : (com,index,result=[]) => 

                    (
                        //Iterates through all code lists in "index" position to compare "key" and "com"
                        //and if them are equal, returns codelist index and finished boolean if true
                        //or false
                        this.queue.codes.forEach
                            (
                                (x,y)=>x.kList[index]==com?result.push({codeIndex:y,finished:x.kList.length-1==index}):0
                            ),
                            result
                    ),

                checkS : (com,result=[])=>
                    (
                        //When "keyuped" keys equals to "keydowned" ones, iterates through shortc lists to search for any martches
                        //if all elements of 
                        this.queue.shortc.forEach
                            (
                                (pEl, pId)=>pEl.kList.every
                                    (
                                        (el)=>this.kRecipe.keysS.u.includes(el)
                                    )
                                    ?   (pEl.callBack(),result.push({codeIndex:pId}))
                                    :   0
                            ),
                            result
                    ),
                // To execute callback function of codelist
                action : (result,exCount=0)=>
                (
                    //Iterate trough list of matched codelists
                    result.forEach
                        (
                            //If com matched with last code from list then
                            //callBack function is excuted
                            R=>R.finished?(this.queue.codes[R.codeIndex].callBack(),exCount++)
                            :0
                        ),
                    exCount
                ),
                
                get : function(obj,prop)
                     {
                        /*Is this really usefull?*/
                        switch(prop){
                            case 'last':
                                return obj.keysC.shift();
                                break;
                            case 'all':
                                return obj.keysC;
                                break;
                            case 'length':
                                return obj.keysC.length;
                                break;
                            case 'clean':
                                obj.keysC.length = 0;
                                return obj.keysC.length==0;
                            default:
                                return false;
                                break;
                        }
                     },
                set: function(obj, prop, value)
                     {
                        switch(prop){
                            //function to add a new keystroke 
                            case 'addC':
                                    if(obj.keysS.d.includes(value)){return false}
                                    obj.keysS.d.push(value);
                                    checked = this.checkQ(value,obj.keysC.length);
                                    //If there was at least a match 
                                    if(checked.length>0){
                                        //If callBack function has been successfully executed
                                        //and only one codelist was matched, then there is no nedeed
                                        //to still keeping history
                                        if(this.action(checked)==1&&checked.length==1){
                                            //Empty history
                                            obj.keysC.length=0;
                                        }
                                        else{
                                            //Add key code to history
                                            obj.keysC.push(value);
                                        }
                                    }
                                    else{
                                        //If no code matched there won't be a code to be matched 
                                        //as of current history, then, empty history
                                        obj.keysC.length = 0;
                                    }
                                return value;
                                break;
                            case 'addS':
                                    obj.keysS.u.push(value);
                                    if(obj.keysS.u.length==obj.keysS.d.length){
                                        checked = this.checkS();
                                        obj.keysS.u.length = 0;
                                        obj.keysS.d.length = 0
                                    }
                                return value;
                                break;
                            default:
                                return false;
                        }
                     }
            };
    //Proxy Initialized
	this.keys = new Proxy(this.kRecipe,this.kCallback);
    //Event for codes attached to document

    //For key down commands
	document.addEventListener("keydown",Ev=>this.keys.addC=Ev.key);

    //For keyup in shortcuts
    document.addEventListener("keyup",Ev=>this.keys.addS=Ev.key);
}