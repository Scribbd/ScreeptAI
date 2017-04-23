var controlFerry = require('control.ferry');

var helperCreeps = require('helper.creeps');

var roleEnergyFerry = {

    'typeID': 'ferry',
    'typeBuild1': [MOVE,MOVE,CARRY,CARRY],
    'typeBuild2': [MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY],

    run: function(creep) {

        // Set memory for fist time.
        if (creep.memory.state === undefined) {
            creep.memory['state'] = 'search';
            creep.memory['phase'] = '';
            creep.memory['harvestContainer'] = '';
            creep.memory['priorityContainer'] = '';
            creep.memory['baseContainer'] = '';
        }
        //Logic!
        //STATE SEARCH
        else if(creep.memory.state == 'search') {
            
        }
        //STATE FERRY
        else if(creep.memory.state == 'ferry') {
            if(creep.memory.phase == 'toHarvest') {
                var target = Game.getObjectById(creep.memory.harvestContainer);
                if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(taget);
                }
                if(creep.carry.energy >= creep.carryCapacity) {
                    creep.memory.phase = 'toBase';
                }
            } else if (creep.memory.phase == 'toBase') {
                var target = Game.getObjectById(creep.memory.baseContainer);
                if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(taget);
                }
                if(creep.carry.energy <= 0) {
                    creep.memory.phase = 'toHarvest'
                }
            }
        }
        //STATE PRIORITY
        else if(creep.memory.state == 'priority') {
            var priority = Game.getObjectById(creep.memory.priorityContainter);

            if(creep.memory.phase == '') {



                creep.memory.phase
            } else if (creep.memory.phase == '') {


                creep.memory.phase
            }

            if (priority.store <= 0) {
                controlFerry.clear
                creep.memory.state = 'ferry';
            }
        }
        //STATE FAIL
        else {
            if(Game.flags['FailFlag'] != null) {
                creep.moveTo(Game.flags['FailFlag'].pos, {visualizePathStyle: {stroke: '#ffffff'}});
            } else {
                creep.say('FAILSTATE');
            }
        }

    }
};

helperCreeps.submitCreepBuild(roleEnergyFerry.typeName, roleEnergyFerry.typeBuild1, 1);
helperCreeps.submitCreepBuild(roleEnergyFerry.typeName, roleEnergyFerry.typeBuild2, 2);

module.exports = roleEnergyFerry;
