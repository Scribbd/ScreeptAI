var helperCreeps = require('helper.creeps');

var roleMiner = {

    'typeID': 'ferry',
    'typeBuild1': [CARRY, MOVE, WORK]
    'typeBuild2': [CARRY, CARRY, MOVE, MOVE, WORK, WORK],

    /** @param {Creep} creep **/
    run: function(creep) {
        //Information


        //From tutorial
	    if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.energy < structure.energyCapacity;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else {
                //creep.say('Idle -_- zz');
                if(Game.flags['IdleFlag'] != null) {
                    creep.moveTo(Game.flags['IdleFlag'].pos, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
	}
};

helperCreeps.submitCreepBuild(roleMiner.typeName, roleMiner.typeBuild1, 1);
helperCreeps.submitCreepBuild(roleMiner.typeName, roleMiner.typeBuild2, 2);

module.exports = roleMiner;
