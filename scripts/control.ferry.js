var helperCreeps = require('helper.creeps');
/**
 * Ferry control, system for harvesters to call ferries to their side to get the energy out.
 */
var controlFerry = {

    run: function() {


        if(Memory.empire.control.ferryInterval === undefinded) {
            console.log('Setting up ferryControl for the first time');
            Memory.empire.control.ferryInterval = 10;
            Memory.empire.control.ferryShift = 2;
        }

        // Process scheduled stuff
        if ((Memory.empire.control.count + Memory.empire.control.ferryShift) % Memory.empire.control.ferryInterval == 0) {
            console.log('controlFerry scheduled run!');


        }
        // Process priority queue
        if(Memory.ferryControl.priorityQueue.length > 0) {

        }
    },

    submitPriority: function(container) {
        Memory.ferryControl.priorityQueue.push(container.id);
    },

    clearPriority: function(container) {
        if(Memory.ferryControl.priorityQueue[0] == container.id) {
            Memory.ferryControl.priorityQueue.shift();
        } else {
            console.log("ControlFerry: Given ID does not match top of priorityQueue");
        }
    }
};

module.exports = controlFerry;
