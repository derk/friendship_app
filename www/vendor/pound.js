GuidMaker = function(){
    return {
        s4: function () {
            return Math.floor((1 + Math.random()) * 0x10000)
               .toString(16)
               .substring(1);
        },
        guid: function() {
            return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
                this.s4() + '-' + this.s4() + this.s4() + this.s4();
        }
    }
}

var pound = {};
var p = pound;
//pound.insert(key, object)
//adds to or CREATES a store
//key: name of thing to store
//object: value of thing to store in json form
//pound.add("foo",{"thing":"thing value"});
//adds {"thing":"thing value"} to a key called "foo" in localStorage
pound.add = function(key,object){
var collection = [];

    if (localStorage[key]){
        collection = JSON.parse(localStorage[key]);
        object.timestamp = new Date();
        object.created_at = new Date();
        console.log(object);

        collection.push(object);
        localStorage[key] = JSON.stringify(collection);
    }
    else
    {
        object.timestamp = new Date();
        object.created_at = new Date();
        console.log(object);
        collection = [object];
        localStorage[key] = JSON.stringify(collection);
        pound.add("pound",key);
    }

return {added:object};
};


//pound.save(key, object, id)
//equivalent of upsert
//key: name of thing to store
//object: value of thing to store in json form
//
//pound.save("foo",{thing:"thing value", id:id_value});
//looks to find a thing called foo that has an array of objects inside
//then looks to find an object in that array that has an id of a particular value, 
// if it exists, the object is updated with the keys in the object to replace
///if it does not exist, it is added
pound.save = function(key,object){
var collection = [];


    if (localStorage[key]){

        var exists = false;
        collection = JSON.parse(localStorage[key]);
        
        _.each(collection, function(el, idx){
            if (el.guid == object.guid){
                exists = true;
                object.timestamp = new Date();
                collection[idx] = object;
            }
   
        });
        
        if (exists === false){
            object.timestamp = new Date();
            object.created_at = new Date();
            collection.push(object);
        }
    }

    else
    {
        object.created_at = new Date();
        collection = [object];
        pound.add("pound",key);
    }

    localStorage[key] = JSON.stringify(collection);

    return {saved:object};
};

//pound.update(key, object)
//get collection of JSON objects
//iterate through collection and check if passed object matches an element
//merge attributes of objects
//set the collection at the current index to the value of the object
//stringify the collection and set the localStorage key to that value

pound.update = function(key, object) {
var collection = JSON.parse(localStorage[key]);
    
    _.each(collection, function(el, idx) {
        
        if (el.guid == object.guid) {

            for( var attribute in el) {
                el[attribute] = object[attribute]
                object.updated_at = new Date();
            }

            collection[idx] = object
        }
    });
    localStorage[key] = JSON.stringify(collection);

    return {updated:object};
}

//pound.find(key,criteria_object)
//key: name of localstorage location
//criteria_object: object that matches the criteria you're looking for
//pound.find("foo")
//returns the ENTIRE contents of the localStorage array
//pound.find("foo",{thing:"thing value"})
//returns the elements in the array that match that criteria

pound.find = function(key,criteria_object){
var collection = [];
if(localStorage[key]){
    collection = JSON.parse(localStorage[key]);

    if (criteria_object){
        return _.where(collection,criteria_object) || [] }
    else { return collection || [];}
        }
else{ return [];}
};

pound.list = function(){
    return pound.find("pound");
};

//pound.delete(key,id)
//removes an item from a collection that matches a specific id criteria
pound.delete = function(key,id){

    var collection = [];
    var object_to_delete;
    collection = JSON.parse(localStorage[key]);

        _.each(collection, function(el, idx){
            if (el.guid == guid){
                object_to_delete = collection[idx];
                collection[idx] = false;
            };
        });

    localStorage[key] = JSON.stringify(_.compact(collection));

    return {deleted:object_to_delete};
}


//pound.nuke(key)
//completely removes the key from local storage and pound list
pound.nuke = function(key){
    var collection = pound.list;

    localStorage.removeItem(key);
       _.each(collection, function(el, idx){
            if (el == key){
                collection[idx] = false;
            };
        });
    localStorage["pound"] = JSON.stringify(_.compact(collection));

    return {cleared:key};
};