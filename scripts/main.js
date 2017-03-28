var controlRespawn = require('control.respawn');
var controlEnergy = require('control.energy');

var roleCommon = require('role.common');

var roleMiner = require('role.miner');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepair = require('role.repair');

var roleHarvester = require('role.harvester');

module.exports.loop = function() {
    //Main Creep loop
    
    //Delete Loop
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            console.log('Clearing non-existing creep memory:', name);
            delete Memory.creeps[name];
        }
    }
    //Respawn Loop
    controlRespawn.run();
    
    //Energy Discovery Loop
    controlEnergy.run();
    
    //Action Loop
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        
        roleCommon.run(creep);
        
        if(creep.memory.role == 'miner') {
            roleMiner.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'repair') {
            roleRepair.run(creep);
        }
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
    }    
}