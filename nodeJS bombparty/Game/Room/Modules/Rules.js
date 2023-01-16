class Rules {


    constructor(minTurnDuration = null, promptDifficulty = null, customPromptDifficulty = null, maxWordsPerPrompt = null, maxPromptAge = null, startingLives = null, maxLives = null) {

        //Rules information
        this.minTurnDuration = minTurnDuration;
        this.promptDifficulty = promptDifficulty;
        this.customPromptDifficulty = customPromptDifficulty;
        this.maxWordsPerPrompt = maxWordsPerPrompt;
        this.maxPromptAge = maxPromptAge;
        this.startingLives = startingLives;
        this.maxLives = maxLives;
    }


    /* GETTERS */
    get_minTurnDuration() { return this.minTurnDuration };
    get_promptDifficulty() { return this.promptDifficulty };
    get_customPromptDifficulty() { return this.customPromptDifficulty };
    get_maxWordsPerPrompt() { return this.maxWordsPerPrompt };
    get_maxPromptAge() { return this.maxPromptAge };
    get_startingLives() { return this.startingLives };
    get_maxLives() { return this.maxLives };

    /* SETTERS */
    set_minTurnDuration(newMinTurnDuration) { this.minTurnDuration = newMinTurnDuration };
    set_promptDifficulty(newPromptDifficulty) { this.promptDifficulty = newPromptDifficulty };
    set_customPromptDifficulty(new_CustomPromptDifficulty) { this.customPromptDifficulty = new_CustomPromptDifficulty };
    set_maxWordsPerPrompt(newMaxWordsPerPrompt) { this.maxWordsPerPrompt = newMaxWordsPerPrompt };
    set_maxPromptAge(newMaxPromptAge) { this.maxPromptAge = newMaxPromptAge };
    set_startingLives(newStartingLives) { this.startingLives = newStartingLives };
    set_maxLives(newMaxLives) { this.maxLives = newMaxLives };

    /* FUNCTIONS */

    setup(jsonData) {

        this.set_minTurnDuration(jsonData[1].rules.minTurnDuration.value)
        this.set_promptDifficulty(jsonData[1].rules.promptDifficulty.value)
        this.set_customPromptDifficulty(jsonData[1].rules.customPromptDifficulty.value)
        this.set_maxWordsPerPrompt(jsonData[1].rules.maxWordsPerPrompt.value)
        this.set_maxPromptAge(jsonData[1].rules.maxPromptAge.value)
        this.set_startingLives(jsonData[1].rules.startingLives.value)
        this.set_maxLives(jsonData[1].rules.maxLives.value)

    }

}

//Export the class
module.exports = Rules;