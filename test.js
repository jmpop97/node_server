const name=["Activate","Deactivate"]
var names=""
for(var i in name){
    names += "('"+ name[i]+"'),"
}
console.log(names.slice(0,-1))