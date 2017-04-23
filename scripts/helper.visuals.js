var helperVisuals = {
    
    /**
     * function to show info next to room objects
     * roomObject, roomObject to be shown next to
     * textString, the string that has to be shown
     */ 
    showNextToRoomObject: function(roomObject, textString) {
        roomObject.room.visual.text(
            textString,
            roomObject.pos.x + 1, 
            roomObject.pos.y, 
            {align: 'left', opacity: 0.8});
    }
};

module.exports = helperVisuals;