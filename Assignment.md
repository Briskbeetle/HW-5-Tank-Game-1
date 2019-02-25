# Tank Game 1

## Cannon Upgrades

Make the cannon a separate element of the tank that rotates using the 'a' and 'd' keys. The angle of the cannon should also dictate the direction of the bullets fired by the player.

COMPLEATED!!!
Added new bullet shape!

## Enemies

Create a simple enemy class is similar to the bullet class that has an update and draw function. For their draw function you decide the way they look, define a unique shape for your enemies using points similar to the player.

Spawn enemies randomly on the screen and an interval you decide (remember how we used timers in our Arduino code, and use a similar method!). To get a random number from JavaScript use `Math.random()`. More info on this api can be found [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random).

COMPLEATED!!!

## Collisions

Enemies should collide with the bullets. This should cause both the enemy that was hit, and the bullet to be deactivated. You will need to use nested loops to accomplish this, or you could use the `array.find` function. Make sure that you are only checking for collisions with active bullets.

COMPLEATED!!
Added tank tackling as well!! 

## BONUS!

Here are some suggestions of little improvements to this version. None of these are required for this assignment, but you can complete these for 0.5 bonus points each.
- Update the wrapping code for the player to make the transition smoother. (Hint, let the player move futher out of bounds before moving them)
COMPLEATED!!!

- Deactivate the bullets when they exit the screen.
COMPLEATED!!!

- Make the bullets start at the end of the cannon barrel when they are activated.
Compleated!!!

## Submission

Upload your code to Github and submit the link to canvas.
