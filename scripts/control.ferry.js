var helperCreeps = require('helper.creeps');
/**
 * Ferry control, system for harvesters to call ferries to their side to get the energy out.
 */
var controlFerry = {
    
    run: function() {
        
        
        if(Memory.ferryControl == null) {
            console.log('Setting up ferryControl for the first time');
            Memory.ferryControl = {
                'delayCount': 0,
                'delay': 10,
                'priorityQueue': [],
                'ferries': {}
            }
        }
        
        // Process scheduled stuff
        if (Memory.ferryControl.delayCount >= Memory.ferryControl.delay) {
            
            
            
            Memory.ferryControl.delayCount = 0;
        } else {
            Memory.ferryControl.delayCount++;
        }
        // Process priority queue
        if(Memory.ferryControl.priorityQueue.length > 0) {
            
        }
    },
    
    submitPriority: function(containerID) {
        Memory.ferryControl.priorityQueue.push(containerID);
    },
    
    clearPriority: function(containerID) {
        if(Memory.ferryControl.priorityQueue[0] == containerID) {
            Memory.ferryControl.priorityQueue.shift();
        } else {
            console.log("ControlFerry: Given ID does not match top of priorityQueue");
        }
    }
};

module.exports = controlFerry;