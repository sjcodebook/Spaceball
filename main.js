$(document).ready(function() {
  let spaceship = $("#spaceship");
  let bullet = $("#bullet");
  let wall = $("#wall");

  let keyLeft = 37;
  let keyTop = 38;
  let keyDown = 40;
  let keyRight = 39;
  let spaceBar = 32;

  let spaceshipSpeed = 10;
  let score = 0;

  spaceship.css({
    position: "absolute",
    top: 50,
    left: 100
  });

  bullet.css({
    position: "absolute",
    display: "none"
  });

  wall.css({
    position: "absolute",
    right: 40,
    top: 0,
    width: 30,
    height: 120,
    backgroundColor: "red"
  });

  let moveLeft = false;
  let moveRight = false;
  let moveTop = false;
  let moveDown = false;
  let bulletState = "available";
  let spaceClicked = false;

  $(document).on("keydown", function(e) {
    e.preventDefault();
    if (e.keyCode == keyLeft) {
      moveLeft = true;
    }
    if (e.keyCode == keyTop) {
      moveTop = true;
    }
    if (e.keyCode == keyRight) {
      moveRight = true;
    }
    if (e.keyCode == keyDown) {
      moveDown = true;
    }
    if (e.keyCode == spaceBar) {
      spaceClicked = true;
    }
  });

  $(document).on("keyup", function(e) {
    e.preventDefault();
    if (e.keyCode == keyLeft) {
      moveLeft = false;
    }
    if (e.keyCode == keyDown) {
      moveDown = false;
    }
    if (e.keyCode == keyTop) {
      moveTop = false;
    }
    if (e.keyCode == keyRight) {
      moveRight = false;
    }
    if ((e.keyCode = spaceBar)) {
      spaceClicked = false;
    }
  });

  function moveWall() {
    if (wall.position().top == 0) {
      wall.animate({ top: 480 }, 1000);
    }

    if (wall.position().top == 480) {
      wall.animate({ top: 0 }, 1000);
    }
  }

  function move() {
    if (spaceship.position().left > 250) {
      moveRight = false;
    }
    if (spaceship.position().left == 0) {
      moveLeft = false;
    }
    if (spaceship.position().top == 0) {
      moveTop = false;
    }
    if (spaceship.position().top == 460) {
      moveDown = false;
    }
    if (moveLeft) {
      spaceship.css({
        left: spaceship.position().left - spaceshipSpeed + "px"
      });
    }
    if (moveRight) {
      spaceship.css({
        left: spaceship.position().left + spaceshipSpeed + "px"
      });
    }
    if (moveDown) {
      spaceship.css({
        top: spaceship.position().top + spaceshipSpeed + "px"
      });
    }
    if (moveTop) {
      spaceship.css({
        top: spaceship.position().top - spaceshipSpeed + "px"
      });
    }

    if (spaceClicked) {
      if (bulletState == "available") {
        bulletState = "unavailable";
        bullet
          .css({
            display: "block",
            left: spaceship.position().left + 50 + "px",
            top: spaceship.position().top + 50 + "px"
          })
          .animate({ left: 1500 }, 500, function() {
            bulletState = "available";
          });
      }

      if (
        bullet.position().top > wall.position().top &&
        bullet.position().top < (wall.position().top + 120)
      ) {
        bulletState = "unavailable";
        bullet
          .css({
            display: "block"
          })
          .animate(
            {
              left: Math.floor(Math.random() * 30),
              top: Math.floor(Math.random() * 30)
            },
            50,
            function() {
              bullet.css({
                display: "none"
              });
              bulletState = "available";
            }
          );
          score++;
              $("#score").html(score);
      }
    }
  }

  function over() {
    clearInterval(moveRef);
    clearInterval(moveObstacleRef);
    $("#over").css({
      display: "block"
    });
  }
  var moveRef = setInterval(move, 20);
  var moveObstacleRef = setInterval(moveWall, 100);
  setTimeout(over, 200000);
});
