/**
 * taskID
 */ 

var roleRepair = {
    
    run: function(creep) {
        if(creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.repairing = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.repairing = true;
	        creep.say('🚧 repair');
	    }
	    if(creep.memory.taskID && Game.getObjectById(creep.memory.taskID).hits >= Game.getObjectById(creep.memory.taskID).hitsMax) {
	        creep.say("\\o.o/ done!");
	        delete creep.memory.taskID;
	    }
	    
	    
	    if(creep.memory.repairing) {
	        //Continue repairing job
	        if (creep.memory.taskID != null) {
	            var target = Game.getObjectById(creep.memory.taskID);
	            if (creep.repair(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
	        } 
	        else {
	            //Get job if none is given
	            var targets = creep.room.find(FIND_STRUCTURES, {
	                filter: function(object) {
	                    return (object.hits <= (object.hitsMax * 0.5));
	                }
	            });
	            if (targets.length) {
	                creep.memory.taskID = targets[0].id;
	            } else {
                    //creep.say('Idle -_- zz');
                    creep.moveTo(Game.flags['IdleFlag'].pos, {visualizePathStyle: {stroke: '#ffffff'}});
	            }
	        }
	    }
	    else {
	        var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            } 
	    }
    }
};

module.exports = roleRepair;