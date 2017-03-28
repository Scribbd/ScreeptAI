/**
 * Respawn control. v1, limited to one home.
 */
var controlRespawn = {
    run: function() {
        // Not needing action
        if(Memory.respawnQueue == null) {
            Memory.respawnQueue = {};
        }
        
        if(Object.keys(Memory.respawnQueue).length > 0) {
            for(var death in Memory.respawnQueue) {
                var respawnStatus = Game.spawns['Home'].canCreateCreep([WORK, CARRY, MOVE], Memory.respawnQueue[death]);
                if(respawnStatus == OK) {
                    Game.spawns['Home'].createCreep([WORK, CARRY, MOVE], death, {role: Memory.respawnQueue[death]});
                    Game.spawns['Home'].room.visual.text(
                        '🛠️' + Memory.respawnQueue[death],
                        Game.spawns['Home'].pos.x + 1, 
                        Game.spawns['Home'].pos.y, 
                        {align: 'left', opacity: 0.8});
                    
                    delete Memory.respawnQueue[death];
                }
                else if (respawnStatus == ERR_NOT_ENOUGH_ENERGY) {
                    Game.spawns['Home'].createCreep([WORK, CARRY, MOVE], death, {role: Memory.respawnQueue[death]});
                    Game.spawns['Home'].room.visual.text(
                        'O_o No Power!',
                        Game.spawns['Home'].pos.x + 1, 
                        Game.spawns['Home'].pos.y, 
                        {align: 'left', opacity: 0.8});
                }
                else if (respawnStatus == ERR_BUSY) {
                    Game.spawns['Home'].room.visual.text(
                        '>.< BUSY!',
                        Game.spawns['Home'].pos.x + 1, 
                        Game.spawns['Home'].pos.y, 
                        {align: 'left', opacity: 0.8});
                }
                else {
                    console.log('Cannot respawn! ', respawnStatus)
                }
            }
        }
    }
};

module.exports = controlRespawn;