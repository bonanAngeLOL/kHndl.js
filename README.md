# kHndl.js
==========

Keystrokes event listener for add hidden codes, keyboard commands and keyboard shortcuts

How to add a command or shortcut

Just call 
  
    $kHndl(keysList, callBack, type)

Where 
* **keysList** is an array of keyboard code keys
* **callBack** is a funtion to be executed
* **type** defines type of command
	* `true` for shorcut
	* `false` for code

When all the keystrokes of a command are done, callback function is executed

Example:
  
    $kHndl.addEv(["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","a","b","Enter"],()=>console.log("Konami Code activated"))
  
  Then, if all the keystrokes for the Konami Code are done, it will print in console
