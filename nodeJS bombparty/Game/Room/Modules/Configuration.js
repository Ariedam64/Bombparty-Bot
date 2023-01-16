class Configuration {


    constructor(maxBombDuration = null, maxPlayers = null, maxWordLength = null, minBombDuration = null, minPlayers = null, startTimerDuration = null, submitRateLimitInterval = null, submitRateLimitMax = null) {

        //Configuration information
        this.maxBombDuration = maxBombDuration;
        this.maxPlayers = maxPlayers;
        this.maxWordLength = maxWordLength;
        this.minBombDuration = minBombDuration;
        this.minPlayers = minPlayers;
        this.startTimerDuration = startTimerDuration;
        this.submitRateLimitInterval = submitRateLimitInterval;
        this.submitRateLimitMax = submitRateLimitMax;
    }


    /* GETTERS */
    get_maxBombDuration() { return this.maxBombDuration };
    get_maxPlayers() { return this.maxPlayers };
    get_maxWordLength() { return this.maxWordLength };
    get_minBombDuration() { return this.minBombDuration };
    get_minPlayers() { return this.minPlayers };
    get_startTimerDuration() { return this.startTimerDuration };
    get_submitRateLimitInterval() { return this.submitRateLimitInterval };
    get_submitRateLimitMax() { return this.submitRateLimitMax };

    /* SETTERS */
    set_maxBombDuration(newMaxBombDuration) { this.maxBombDuration = newMaxBombDuration };
    set_maxPlayers(newMaxPlayers) { this.maxPlayers = newMaxPlayers };
    set_maxWordLength(newMaxWordLength) { this.maxWordLength = newMaxWordLength };
    set_minBombDuration(newMinBombDuration) { this.minBombDuration = newMinBombDuration };
    set_minPlayers(newMinPlayers) { this.minPlayers = newMinPlayers };
    set_startTimerDuration(newStartTimerDuration) { this.startTimerDuration = newStartTimerDuration };
    set_submitRateLimitInterval(newSubmitRateLimitInterval) { this.submitRateLimitInterval = newSubmitRateLimitInterval };
    set_submitRateLimitMax(newSumbitRateLimitInterval) { this.submitRateLimitMax = newSumbitRateLimitInterval };

    /* FUNCTIONS */

    setup(jsonData) {

        this.set_maxBombDuration(jsonData[1].constants.maxBombDuration)
        this.set_maxPlayers(jsonData[1].constants.maxPlayers)
        this.set_maxWordLength(jsonData[1].constants.maxWordLength)
        this.set_minBombDuration(jsonData[1].constants.minBombDuration)
        this.set_minPlayers(jsonData[1].constants.minPlayers)
        this.set_startTimerDuration(jsonData[1].constants.startTimerDuration)
        this.set_submitRateLimitInterval(jsonData[1].constants.submitRateLimit.interval)
        this.set_submitRateLimitMax(jsonData[1].constants.submitRateLimit.max)

    }
    
}

//Export the class
module.exports = Configuration;