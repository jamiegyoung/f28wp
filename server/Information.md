# Game Objects
## StageGroup
> e.g. 1-1
## Properties
|name  |type   |
|------|-------|
|level |int    |
|stages|[Stage]|

---

## Stage
|name  |type  |
|------|------|
|level |int   |
|boss  |Boss  |

---

## Boss
### Properties:
|name  |type  |
|------|------|
|name  |String|
|sprite|Path  |
|level |int   |

### Getters
|name           |returns                    |accesses|
|---------------|---------------------------|--------|
|experienceGiven|calculates experience given|level   |

### Methods:
|name           |arguments|accesses|returns    |
|---------------|---------|--------|-----------|
|setHealth      |         |level   |health: int|
|decrementHealth|amt: int |health  |           |

---

## Player:
### Properties:
|name      |type  |
|----------|------|
|id        |String|
|secretID  |String|
|experience|int   |

### Getters
|name  |returns                          |accesses  |
|------|---------------------------------|----------|
|level |calculates level from experience |experience|
|health|calculates health from experience|experience|
|damage|calculates damage from experience|experience|

### Methods:
|name         |arguments|accesses  |returns|
|-------------|---------|----------|-------|
|addExperience|         |experience|       |

I will add interactions with the words and sentences later when we have it figured out

---

## Other stuff
damage = wordLength * userDamage

time to kill will always be the same

you're given a sentence every 5 seconds, each word is an attack weighted by its length and if you finish the full sentence its a critical strike doing all the damage from every word again. This means that even if you do cheat and always type the full sentence, you're still restricted by the 5 seconds between each sentence, meaning you cannot instantly kill the boss.
