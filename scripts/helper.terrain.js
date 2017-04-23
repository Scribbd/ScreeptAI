var helperTerrain = {
    
    isTileObstructed: function(tileObject) {
        if(tileObject.length <= 1) {
            if (tileObject[0].type == 'terrain') {
                if (tileObject[0].terrain == 'wall') {
                    return true;
                }
            }
        }
        
        for (var object of tileObject) {
            if(object.type == 'source') {
                return true;
            }
            if(object.type == 'structure') {
                for (var obstruction of OBSTACLE_OBJECT_TYPES) {
                    if (object.structure.structureType == obstruction) {
                        return true;
                    }
                }
            }
        }

        return false;
    },
    
    getFirstFound: function(siteArray, siteType, wantedType) {
        for (var site of siteArray) {
            if (site[siteType].structureType == wantedType) {
                console.log('found thing! ' + JSON.stringify(site));
                return site;
            }
        }
        return ERR_NOT_FOUND;
    },
    
    getRelativePosition: function(roomPos1, roomPos2) {
        if (roomPos1.roomName == roomPos2.roomName) {
            return new RoomPosition(roomPos1.roomName, roomPos1.x - roomPos2.x, roomPos1.y - roomPos2.y);
        }
        return ERR_NOT_IN_RANGE;
    }
};

module.exports = helperTerrain;