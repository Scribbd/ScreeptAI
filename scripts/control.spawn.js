var helperVisuals = require('helper.visuals');

/**
 * ControlSpawn: When a creept dies, it will do the burial and makes its replacer.
 * Runs each tick
 */
var controlSpawn = {
    run: function(roles) {

        //RUN EACH TICK
        //Discovery Loop (Looks for status: new)
        for(var room in Memory.empire.rooms) {
            if(Memory.empire.rooms[room].status == 'new') {
                Memory.empire.rooms[room].spawnQueue = [];
            }
        }

        //Spawn Loop
        for(var room in Memory.empire.rooms) {
            if(room.spawners.length > 0 && room.spawnQueue.length > 0) {
                for (var homeID in room.spawners) {
                    var home = Game.spawns[homeID];
                    var respawnStatus = home.canCreateCreep([WORK, CARRY, MOVE], Memory.spawnQueue[spawnee]);
                    if(respawnStatus == OK) {
                        helperVisuals.showNextToRoomObject(Game.spawns[home], Memory.spawnQueue[spawnee]);
                        var spawnee = room.spawnQueue.shift();
                        home.createCreep(spawnee.build, spawnee.name);
                    } else {
                        helperVisuals.showNextToRoomObject(Game.spawns[home], '>.< ERROR!!');
                        console.log('Cannot respawn! ', respawnStatus);
                    }
                }

            } else if(room.spawners.length > 0 && room.spawnQueue.length <= 0) {
                if(Game.spawns['Home'].createCreep(room.spawnQueue[0].build, room.spawnQueue[0].name == OK)) {
                    helperVisuals.showNextToRoomObject(Game.spawns['Home'], room.spawnQueue[0].name);
                } else {
                    Memory.empire.rooms[Game.spawns['Home'].room.name].spawnQueue.push(room.spawnQueue.shift());
                }
            }
        }
    },

    /**
     * Requires the creep Object
     */
    reportDeath: function(creep) {

    }

    clearMemory: function() {
        for(var name in Memory.creeps) {
            if(!Game.creeps[name] && !Game.creeps[name].memory.keepMemory) {
                console.log('Clearing non-existing creep memory:', name);
                delete Memory.creeps[name];
            }
        }
    }
};

module.exports = controlSpawn;
