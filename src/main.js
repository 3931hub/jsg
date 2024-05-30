import kaboom from "kaboom"

const k = kaboom()

loadSprite("bean", "sprites/bean.png")

// add bean
const bean = add([
	pos(120, 80),
	sprite("bean"),
	area(),
	body(),
	setGravity(1500)

 ]);

	// add platform
add([
    rect(width(), 48),
    pos(0, height() - 48),
    outline(4),
    area(),
    body({ isStatic: true }),
    color(127, 200, 255),
]);


// add tree tag to object
function spawnTree() {
add([
    rect(48, 64),
    area(),
    outline(4),
    pos(width(), height() - 48),
    anchor("botleft"),
    color(255, 180, 255),
    move(LEFT, 240),
	rect(48, rand(24, 64)),
	"tree", // add string/tag for collision connecting to the string/tag
]);

wait(rand(1, 1.5), () => {
	spawnTree();
 });
}
spawnTree();

// collide function with objects
bean.onCollide("tree", () => {
    addKaboom(bean.pos);
    burp();
	go("lose"); // go to "lose" scene here
});

    // keep track of score
    let score = 0;

    const scoreLabel = add([
        text(score),
        pos(24, 24),
    ]);

    // increment score every frame
    onUpdate(() => {
        score++;
        scoreLabel.text = score;

		scene("lose", (score) => {

			add([
				sprite("bean"),
				pos(width() / 2, height() / 2 - 80),
				scale(2),
				anchor("center"),
			]);

			add([
				text("Game Over"),
				pos(center()),
				anchor("center"),
			]);
		
			// display score
			add([
				text(score),
				pos(width() / 2, height() / 2 + 80),
				scale(2),
				anchor("center"),
			]);
		});

	})		

// .jump() when "space" key is pressed
onKeyPress("space", () => {
	if (bean.isGrounded()) {
		bean.jump();
	}

	onClick(() => addKaboom(mousePos()))

});

go("game")
