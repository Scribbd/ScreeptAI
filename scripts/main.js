var controlEmpire = require('control.empire');
var controlSpawn = require('control.spawn');
var controlEnergy = require('control.energy');
var controlFerry = require('control.ferry');

var roleCommon = require('role.common');

var roleMiner = require('role.miner');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepair = require('role.repair');
var roleHarvester = require('role.harvester');
var roleEnergyFerry = require('role.energyferry');
var roleEnergyDistributor = require('role.energydistributor');

var controlers = [controlSpawn, controlEnergy, controlFerry];

module.exports.loop = function() {
    //Empire Loop
    controlEmpire.run();

    //Delete Loop
    controlEmpire.clearMemory();

    //Respawn Loop
    controlSpawn.run(controlers);

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
        if(creep.memory.role == 'ferry') {
            roleEnergyFerry.run(creep);
        }
        if(creep.memory.role == 'distributor') {
            roleEnergyDistributor.run(creep);
        }
    }

    controlEmpire.upCount();
}
