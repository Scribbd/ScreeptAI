var helperCreeps = require('helper.creeps');

var roleEnergyDistributor = {

    'typeName': 'distributor',
    'typeBuild1': [MOVE,MOVE,CARRY,CARRY],
    'typeBuild2': [MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY],


    run: function(creep) {

    }
};

helperCreeps.submitCreepBuild(roleEnergyDistributor.typeName, roleEnergyDistributor.typeBuild1, 1);
helperCreeps.submitCreepBuild(roleEnergyDistributor.typeName, roleEnergyDistributor.typeBuild2, 2);

module.exports = roleEnergyDistributor;
