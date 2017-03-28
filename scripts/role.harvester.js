var controlEnergy = require('control.energy');

var helperTerrain = require('helper.terrain');

/**
 * A stationairy miner
 */
var roleHarvester = {
    
    'typeID': 'harvester',
    'typeBuild': [MOVE,WORK,WORK,WORK,WORK,CARRY,CARRY],
    
    run: function(creep) {
        // Acquire target for the first time.
        if (creep.memory.state == null) {
            creep.say('^.^ initiating');
            creep.memory['state'] = 'search'; //>>ADVANCE STATE SEARCH
            creep.memory['phase'] = 'none';
            creep.memory['target'] = 'none';
            creep.memory['container'] = 'none';
        }
        // STATE SEARCH
        else if(creep.memory.state == 'search') {
            creep.say('( o.o)7 searching');
            creep.memory.target = controlEnergy.getAvailableTarget(creep.room.name);
            if(creep.memory.target != null) {
                console.log(JSON.stringify(Game.getObjectById(creep.memory.target)));
                controlEnergy.claimSource(Game.getObjectById(creep.memory.target));
                creep.memory.state = 'move'; //>>ADVANCE STATE DEPLOY
            } 
            // FAIL STATE
            else {
                creep.say('None found?');
                console.log('Harvester found no source to mine: ', creep.name);
                creep.memory.state = 'fail'; //>>ADVANCE STATE IDLE
            }
        }
        //STATE MOVE
        else if(creep.memory.state == 'move') {
            if(creep.harvest(Game.getObjectById(creep.memory.target), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.say('v o_ov move');
                creep.moveTo(Game.getObjectById(creep.memory.target), {visualizePathStyle: {stroke: '#ffffff'}});
            } else {
                creep.memory.state = 'scan'; //>> ADVANCE STATE DEPLOY
            }
        }
        // STATE SCAN
        else if(creep.memory.state == 'scan') {
            // PHASE DEPLOY CONTAINER
            creep.say('( o.o7 scan');
            //Check if a container is in range
            var found = creep.room.lookForAtArea(LOOK_STRUCTURES, creep.pos.y - 1, creep.pos.x - 1, creep.pos.y + 1, creep.pos.x + 1, true);
            //If found, use that
            if (found.length > 0) {
                creep.memory.container = helperTerrain.getFirstFound(found, LOOK_STRUCTURES, STRUCTURE_CONTAINER).structure.id;
                if (creep.memory.container != null) {
                    creep.memory.state = 'harvest'; //>> ADVANCE STATE MINE
                } else {
                    creep.memory.state = 'deploy'; //>> ADVANCE STATE DEPLOY
                }
            } else {
                creep.memory.state = 'deploy'; //>> ADVANCE STATE DEPLOY
            }
        }
        // STATE DEPLOY
        else if(creep.memory.state == 'deploy') {
            found = creep.room.lookForAtArea(LOOK_CONSTRUCTION_SITES, creep.pos.y - 1, creep.pos.x - 1, creep.pos.y + 1, creep.pos.x + 1, true);
            //Check if a site is found
            if(found.length > 0) {
                //Check for right type
                creep.memory.container = helperTerrain.getFirstFound(found, LOOK_CONSTRUCTION_SITES, STRUCTURE_CONTAINER).constructionSite.id;
            } else {
                //Place site
                var relPos = helperTerrain.getDif(creep.pos, Game.getObjectById(creep.memory.target).pos);
                
                creep.room.createConstructionSite(helperTerrain.getInv(relPos), STRUCTURE_CONTAINER);
            }
            creep.memory.state = 'build'; //>> ADVANCE STATE BUILD
            
        }
        // STATE BUILD
        else if(creep.memory.state == 'build') {
            if(creep.memory.container != ERR_NOT_FOUND) {
                var container = Game.getObjectById(creep.memory.container);
                
                //PHASE CONSTRUCT
                if(creep.memory.phase == 'construct') {
                    creep.build(container);
                    if(creep.carry.energy <= 0) {
                        creep.memory.phase = 'mine';
                    }
                }
                //PHASE MINE
                else {
                    creep.harvest(Game.getObjectById(creep.memory.target));
                    if (creep.carry.energy >= creep.carryCapacity) {
                        creep.memory.phase = 'construct';
                    }
                }
                if((container.progress + creep.getActiveBodyparts(WORK) * BUILD_POWER) >= container.progressTotal) {
                    controlEnergy.submitContainer(container, 'harvest');
                    creep.memory.state = 'scan'; //>> ADVANCE STATE SCAN
                }
            } else {
                creep.memory.state = 'FAILSTATE';
            }
        }
        // STATE HARVEST
        else if(creep.memory.state == 'harvest') {
            var container = Game.getObjectById(creep.memory.container);
            //PHASE STORE
            if(creep.memory.phase == 'store') {
                creep.transfer(Game.getObjectById(creep.memory.container), RESOURCE_ENERGY);
                if(creep.carry.energy <= 0) {
                    creep.memory.phase = 'mine';
                }
            }
            //PHASE MINE
            else {
                creep.harvest(Game.getObjectById(creep.memory.target));
                if (creep.carry.energy >= creep.carryCapacity) {
                    creep.memory.phase = 'store';
                }
            }
            if (Game.getObjectById(creep.memory.container).hits <= Game.getObjectById(creep.memory.container).hitsMax * 0.25) {
                creep.memory.state = 'maintain'; // ADVANCE STATE MAINTAIN
            }
        }
        // STATE MAINTAIN
        else if(creep.memory.state == 'maintain') {
            //PHASE REPAIR
            if(creep.memory.phase == 'repair') {
                creep.repair(Game.getObjectById(creep.memory.container));
                if(creep.carry.energy <= 0) {
                    creep.memory.phase = 'mine';
                }
            }
            //PHASE MINE
            else {
                creep.harvest(Game.getObjectById(creep.memory.target));
                if (creep.carry.energy >= creep.carryCapacity) {
                    creep.memory.phase = 'repair';
                }
            }
            if (Game.getObjectById(creep.memory.container).hits >= Game.getObjectById(creep.memory.container).hitsMax) {
                creep.memory.state = 'harvest'; //>> ADVANCE STATE HARVEST
            }
            
        }
        // STATE IDLE
        else if(creep.memory.state == 'idle') {
            creep.say('Idle -_- zz');
        }
        // STATE FAILSTATE
        else {
            if(Game.flags['FailFlag'] != null) {
                creep.moveTo(Game.flags['FailFlag'].pos, {visualizePathStyle: {stroke: '#ffffff'}});
            } else {
                creep.say('FAILSTATE');    
            }
        }
    },
    
    onDeath: function(creep) {
        
    }
};

module.exports = roleHarvester;