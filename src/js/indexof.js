Array.prototype.indexOf = function(el){

 for (var i=0,n=this.length; i<n; i++){

  if (this[i] === el){

   return i;

  }

 }

 return -1;

}