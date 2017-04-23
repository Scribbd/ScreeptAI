var helperTerrain = require('helper.terrain');

var controlEnergy = {

    run: function() {

        // setting memory
        if (Memory.empire.control.energyCount === undefined) {
            console.log('controlEnergy is setting memory for the first time!')
            Memory.empire.control.energyInterval = 10;
            Memory.empire.control.energyShift = 1;
        }

        if ((Memory.empire.control.count + Memory.empire.control.energyShift) % Memory.empire.control.energyInterval == 0) {
            // DISCOVERY LOOP
            for (var room in Game.rooms) {
                console.log('controlEnergy scheduled run!')
                console.log('  controlEnergy is now processing: ', room);

                //Add key to memory and source data to memory and do first discovery.
                if (Memory.rooms[room] === undefined) {
                    console.log('  controlEnergy detected a new room.')
                    Memory.empre.rooms[room].energy = {
                        'sources': {},
                        'containers': {}
                    };

                    //Process available sources in room
                    for (var source of Game.rooms[room].find(FIND_SOURCES)) {
                        console.log('  controlEnergy found source: ', source.id);
                        //Add keys to memory
                        Memory.empire.rooms[room].energy.sources[source.id] = {'availableSpots': 0, 'claimedSpots': 0};

                        //Determine available spots
                        var surrounding = Game.rooms[room].lookAtArea(source.pos.y - 1, source.pos.x - 1, source.pos.y + 1, source.pos.x + 1);
                        for(var x in surrounding) {
                            for (var y in surrounding[x]) {
                                console.log('    controlEnergy examining terain in room: ' + x + ', ', y);
                                if (!helperTerrain.isTileObstructed(surrounding[x][y])) {
                                    Memory.empire.rooms[room].energy.sources[source.id].availableSpots++;
                                }
                            }
                        }
                        console.log('    controlEnergy found source with available spots: ', Memory.empire.rooms[room].energy.sources[source.id].availableSpots );
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
                    if(Memory.empire.rooms[room].energy.containers[container.id] === undefined) {
                        Memory.empire.rooms[room].energy.containers[container.id] = { 'storageType': 'base' };
                    }
                }
            }

            // UPDATE LOOP
        }
    },

    submitContainer: function(structure, type) {
        Memory.empire.rooms[structure.room.name].energy.containers[structure.id].storageType = type;
    },

    claimSource: function(source) {
        Memory.empire.rooms[source.room.name].energy.sources[source.id].claimedSpots++;
    },

    abandonSource: function(source) {
        Memory.empire.rooms[source.room.name].energy.sources[source.id].claimedSpots--;
    },

    getAvailableTarget: function(roomName) {
        var sources = Memory.empire.rooms[roomName].energy.sources;
        for (var source in sources) {
            if (sources[source].availableSpots > sources[source].claimedSpots) {
                return source;
            }
        }
        return null;
    },

    clearMemory: function() {
        for(var room in Memory.empire.rooms) {
            for(var container in Memory.empire.rooms[room].energy.containers) {
                if(!Game.structures(container)) {
                    delete Memory.empire.rooms[room].energy.containers[container];
                }
            }
        }
    }
};

module.exports = controlEnergy;
