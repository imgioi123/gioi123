/**
 * Created by nhatnk on 4/26/17.
 */

class Hero {
    constructor(image, top, left, size) {
        this.image = image;
        this.top = top;
        this.left = left;
        this.size = size;
    }
    getHeroElement = function() {

    }

    moveRight = function() {

    }

}

let hero = new Hero('pikachu.png', 20, 30, 200);

function start() {
    if (hero.left < window.innerWidth - hero.size) {
        hero.moveRight();
    }
    document.getElementById('game').innerHTML = hero.getHeroElement();
    setTimeout(start, 500)
}

start();