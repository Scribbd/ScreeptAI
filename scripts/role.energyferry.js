var controlFerry = require('control.ferry');

var roleEnergyFerry = {
    
    'typeID': 'ferry',
    'typeBuild': [MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY],
    
    run: function(creep) {
        
        // Set memory for fist time.
        if (creep.memory.state == null) {
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
                
                if(creep.carry.energy ) {
                    creep.memory.phase = 'toBase';
                }
            } else if (creep.memory.phase == 'toBase') {
                
                
                if() {
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

module.exports = roleEnergyFerry;