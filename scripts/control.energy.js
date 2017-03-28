var helperTerrain = require('helper.terrain');

var controlEnergy = {
    
    run: function() {
        
        // setting memory
        if (Memory.energyControl == null) {
            console.log('controlEnergy is setting memory for the first time!')
            Memory.energyControl = {
              'delayCount': 0,
              'delay': 10,
              'rooms': {}
            };
        }
        
        if (Memory.energyControl.delayCount >= Memory.energyControl.delay) {
            // DISCOVERY LOOP
            for (var room in Game.rooms) {
                console.log('controlEnergy scheduled run!')
                console.log('  controlEnergy is now processing: ', room);
                
                //Add key to memory and source data to memory and do first discovery.
                if (Memory.energyControl.rooms[room] == null) {
                    console.log('  controlEnergy detected a new room.')
                    Memory.energyControl.rooms[room] = {
                        'sources': {},
                        'containers': {}
                    };
                    
                    //Process available sources in room
                    for (var source of Game.rooms[room].find(FIND_SOURCES)) {
                        console.log('  controlEnergy found source: ', source.id);
                        //Add keys to memory
                        Memory.energyControl.rooms[room].sources[source.id] = {'availableSpots': 0, 'claimedSpots': 0};
                        
                        //Determine available spots
                        var surrounding = Game.rooms[room].lookAtArea(source.pos.y - 1, source.pos.x - 1, source.pos.y + 1, source.pos.x + 1);
                        for(var x in surrounding) {
                            for (var y in surrounding[x]) {
                                console.log('    controlEnergy examining terain in room: ' + x + ', ', y);
                                if (!helperTerrain.isTileObstructed(surrounding[x][y])) {
                                    Memory.energyControl.rooms[room].sources[source.id].availableSpots++;
                                }
                            }
                        }
                        console.log('    controlEnergy found source with available spots: ', Memory.energyControl.rooms[room].sources[source.id].availableSpots );
                    }
                }
                
                //Find EnergyContainers
                var containers = Game.rooms[room].find(FIND_STRUCTURES, { 
                        filter: function(structure) {
                            return structure.structureType == STRUCTURE_CONTAINER ||
                                structure.structureType == STRUCTURE_STORAGE;
                        } 
                    });
                
                for (var container of containers) {
                    //Set default memory when new container is found
                    if(Memory.energyControl.rooms[room].containers[container.id] == null) {
                        Memory.energyControl.rooms[room].containers[container.id] = { 'storageType': 'base' };
                    }
                }
            }
            
            // UPDATE LOOP
            
            
            Memory.energyControl.delayCount = 0;
        } else {
            Memory.energyControl.delayCount++;
        }
    },
    
    submitContainer: function(structure, type) {
        Memory.energyControl.rooms[structure.room.name].containers[structure.id].storageType = type;
    },
    
    removeContainer: function(roomName, id) {
        delete Memory.energyControl.rooms[roomName].containers[id];
    },
    
    claimSource: function(source) {
        console.log(JSON.stringify(Memory.energyControl.rooms[source.room.name]));
        Memory.energyControl.rooms[source.room.name].sources[source.id].claimedSpots++;
    },
    
    abandonSource: function(source) {
        Memory.energyControl.rooms[source.room.name].sources[source.id].claimedSpots--;
    },
    
    getAvailableTarget: function(roomName) {
        var sources = Memory.energyControl.rooms[roomName].sources;
        for (var source in sources) {
            if (sources[source].availableSpots > sources[source].claimedSpots) {
                return source;
            }
        }
        return null;
    }
};

module.exports = controlEnergy;