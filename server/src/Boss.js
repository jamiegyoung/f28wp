class Boss extends Stage {
    id;
    super(level);

    constructor(id, level, wordLength, userDamage){
        this.id = id;
        this.level = level;
        this.wordLength = wordLength;
        this.userDamage = userDamage;
    }

    sethealth(level){

    }

    get health(){

    }

    decrementHealth(){
        return wordLength * userDamage;
    }

    setdamage(){

    }

    get damage(){
        
    }

    get experienceGiven(){

    }

}