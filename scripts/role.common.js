var roleCommon = {
    
    run: function(creep) {
        // Report and act on Death
        if(creep.ticksToLive <= 1) {
            console.log('Creep is near death: ', creep.name);
            creep.say('I am dying! >_<');
            Memory.respawnQueue[creep.name] = creep.memory.role;
        }
    }
};

module.exports = roleCommon;