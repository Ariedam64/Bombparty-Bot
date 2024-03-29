class Rules {


    constructor(minTurnDuration = null, promptDifficulty = null, customPromptDifficulty = null, maxWordsPerPrompt = null, maxPromptAge = null, startingLives = null, maxLives = null, bonusAlphabet = null) {

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
    get_bonusAlphabet() { return this.bonusAlphabet }

    /* SETTERS */
    set_minTurnDuration(newMinTurnDuration) { this.minTurnDuration = newMinTurnDuration };
    set_promptDifficulty(newPromptDifficulty) { this.promptDifficulty = newPromptDifficulty };
    set_customPromptDifficulty(new_CustomPromptDifficulty) { this.customPromptDifficulty = new_CustomPromptDifficulty };
    set_maxWordsPerPrompt(newMaxWordsPerPrompt) { this.maxWordsPerPrompt = newMaxWordsPerPrompt };
    set_maxPromptAge(newMaxPromptAge) { this.maxPromptAge = newMaxPromptAge };
    set_startingLives(newStartingLives) { this.startingLives = newStartingLives };
    set_maxLives(newMaxLives) { this.maxLives = newMaxLives };
    set_bonusAlphabet(newBonusAlphabet) { this.bonusAlphabet = newBonusAlphabet }

    /* FUNCTIONS */

    toString() {
        return `Rules Information:
    - Min Turn Duration: ${this.minTurnDuration}
    - Prompt Difficulty: ${this.promptDifficulty}
    - Custom Prompt Difficulty: ${this.customPromptDifficulty}
    - Max Words Per Prompt: ${this.maxWordsPerPrompt}
    - Max Prompt Age: ${this.maxPromptAge}
    - Starting Lives: ${this.startingLives}
    - Max Lives: ${this.maxLives}`;
    }

    setup(jsonData) {

        this.set_minTurnDuration(jsonData[1].rules.minTurnDuration.value)
        this.set_customPromptDifficulty(jsonData[1].rules.customPromptDifficulty.value)
        this.set_maxPromptAge(jsonData[1].rules.maxPromptAge.value)
        this.set_startingLives(jsonData[1].rules.startingLives.value)
        this.set_maxLives(jsonData[1].rules.maxLives.value)
        this.set_bonusAlphabet(jsonData[1].rules.customBonusAlphabet.value)
    }
}

//Export the class
module.exports = Rules;