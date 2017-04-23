
/**
 * ControlEmpire: the base on which screeptAI acts and moves.
 */
var controlEmpire = {

    run: function() {

        // Initiation
        if(Memory.empire === undefined) {
            console.log('Initianting ScreeptAI Empire');
            Memory.empire = {};
            Memory.empire['rooms'] = {};
            Memory.empire['control'] = {
                'count': 0;
                'empireInterval': 10;
            }
        }

        // Scheduled loop
        if (Memory.empire.control.count % Memory.empire.control.empireInterval == 0) {
            for (var room in Game.rooms) {
                // Room discovery
                if (Memory.empire[room] === undefined) {
                    Memory.empire[room] = {'status': 'new'};
                    Memory.empire.spawners = [];
                    var spawns = room.find(FIND_MY_STRUCTURES, {
                        filter: { structureType: STRUCTURE_SPAWN }
                    });
                    for (var spawn in spawns) {
                        Memory.empire.rooms[room].spawners.push(spawn.id);
                    }
                }
            }
        }
    },

    /**
     * Add spawn to the spawners
     */
    reportSpawn: function(newSpawn) {
        if (Memory.empire.rooms[newspawn.room.name].spawners.indexOf(newSpawn.id) < 0) {
            Memory.empire.rooms[newspawn.room.name].spawners.push(newSpawn.id);
        }
    },

    /**
     * Check memory of all controlers to be cleared
     */
    clearMemory: function(controlers) {
        for (var controler of controlers) {
            controler.clearMemory();
        }
    },

    /**
     * Do stuff that should be done at the end of a tick.
     */
    endTick: function() {
        Memory.empire.control.count++;

        // Set all new rooms to discovered
        for(var room in Memory.empire.rooms) {
            if(Memory.empire.rooms[room].status == 'new') {
                Memory.empire.rooms[room].status = 'discovered';
            }
        }
    }
}

module.exports = controlEmpire;
