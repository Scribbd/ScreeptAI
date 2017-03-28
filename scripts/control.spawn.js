var helperVisuals = require('helper.visuals');

/**
 * Respawn control. v1, limited to one home.
 */
var controlRespawn = {
    run: function() {
        // Not needing action
        if(Memory.spawnQueue == null) {
            Memory.spawnQueue = {};
        }
        
        if(Object.keys(Memory.spawnQueue).length > 0) {
            for(var spawnee in Memory.spawnQueue) {
                var respawnStatus = Game.spawns['Home'].canCreateCreep([WORK, CARRY, MOVE], Memory.spawnQueue[spawnee]);
                if(respawnStatus == OK) {
                    helperVisuals.showNextToRoomObject(Game.spawns['Home'], Memory.spawnQueue[spawnee]);
                    delete Memory.spawnQueue[spawnee];
                }
                else if (respawnStatus == ERR_NOT_ENOUGH_ENERGY) {
                    Game.spawns['Home'].createCreep([WORK, CARRY, MOVE], spawnee, {role: Memory.spawnQueue[spawnee]});
                    helperVisuals.showNextToRoomObject(Game.spawns['Home'], 'O_o No Power!');
                }
                else if (respawnStatus == ERR_BUSY) {
                    helperVisuals.showNextToRoomObject(Game.spawns['Home'], '>.< Busy!!');
                }
                else {
                    console.log('Cannot respawn! ', respawnStatus)
                }
            }
        }
    }
};

module.exports = controlRespawn;