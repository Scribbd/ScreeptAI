var helperCreeps = {
    getPartsList: function(creep) {
        var body = creep.body
        var list = {};
        
        for (var part in body) {
            if (!list[part['type']]) {
               list[part['type']] = 1; 
            }
            
            list[part['type']] = list[part['type']] + 1;
        }
        return list;
    }
    
    buildPartsArray: function(partList) {
        var partArray = [];
        
        for(var partType in partList) {
            for(i = 0; i < partList[partType]; i++) {
                partArray.push(partList[partType]);
            }
        }
        
        return partArray;
    }
};

module.exports = helperCreeps;