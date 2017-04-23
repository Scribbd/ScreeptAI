var roleBuilds = {)

var helperCreeps = {

    getCreepsByRole: function(roleCreep) {
        var found = [];
        for(creep in Game.creeps) {
            if (Game.creeps[creep].memory.role == roleCreep) {
                found.push(creep)
            }
        }
        return found;
    },

    submitCreepBuild: function(typeName, typeBuild, level) {
        roleBuilds[name] = [];
        roleBuilds[name][level - 1] = build;
    },

    getCreepBuild: function(typeName, level) {
        return roleBuilds[typeName][level - 1];
    }
};

module.exports = helperCreeps;
