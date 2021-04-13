let bodies = [];

var width = document.body.clientWidth;
var height = document.body.clientHeight;
var scrollHeight = document.body.scrollHeight;
var myX = (document.body.clientWidth / 4) * 3;
var myY = (document.body.clientHeight / 4) * 3;
var half_width = document.body.clientWidth / 2;
var half_height = document.body.clientHeight / 2;
var line_width = document.body.clientHeight / 70;
var vw = document.body.clientWidth / 100;
var vh = document.body.clientHeight / 100;

console.log(document.body.clientWidth)
console.log(window.innerWidth)

var once = true;
var twice = true;

let engine = Matter.Engine.create();
let render = Matter.Render.create({
    element: document.getElementById("page"),
    engine: engine,
    canvas: myCanvas,
    options: {
        width: document.body.clientWidth,
        height: document.body.scrollHeight,
        background: "transparent",
        wireframes: false,
    }
});

var myCanvas = document.getElementById('world');
var world = engine.world;

// window.addEventListener("DOMContentLoaded", count());
// count()
// console.log(count())

// function count() {
//     var number = 1;
//     return number;
// }

function createBodies() {
    //Left wall 0
    const left_wall = createBlock(-20, scrollHeight/2, 40, scrollHeight, {
        isStatic: true,
        render: {
            visible: false
        }
    });
    bodies.push(left_wall)

    //right wall 1
    const right_wall = createBlock(width+20, scrollHeight/2, 40, scrollHeight, {
        isStatic: true,
        render: {
            visible: false
        }
    });
    bodies.push(right_wall)

    //floor 2

    const floor = createBlock(half_width, scrollHeight+15, width, 30, {
        isStatic: true,
        render: {
            visible: false
        }
    });
    bodies.push(floor)

    // 1번 바 3
    const bar_1 = createBlock(half_width/2,myY,half_width,line_width, {
        isStatic: true,
        render: {
        //   fillStyle: "transparent",
          fillStyle: '#f5d259',
          visible: false
        //   lineWidth: 3
        },
        angle: Math.PI * 0.01
    });
    bodies.push(bar_1)
    
    // 2번 바 4
    // const bar_2 = createBlock(myX+50,half_height/2,line_width+3,half_height, {
    //     isStatic: true,
    //     angle: -Math.PI * 0.06
    // });
    // bodies.push(bar_2)

    // // 3번 바 5
    // const bar_3 = createBlock(width/5*4,half_height/2,myY,line_width, {
    //     isStatic: true,
    // });
    // bodies.push(bar_3)
    
    
    // createBlock(page.half_width,page.half_height/2,10,10,{
    //     isStatic: true
    // });


    // const ball_1 = Matter.Bodies.circle(width / 5, 10, 30, {
    //     // angularSpeed: 1000,
    //     // density: 1,
    //     friction: 0,
    //     // frictionAir: 0,
    //     // frictionStatic: 100,
    //     // force: { x: 0.001, y: 0},
    //     restitution: 1,
    //     render: {
    //       fillStyle: "transparent",
    //       strokeStyle: "#d0f224",
    //       lineWidth: 3
    //     }
    //   });
    //   bodies.push(ball_1);

    // jiwon 안에 있는 o 4
    const o_ball = Matter.Bodies.circle(half_width-57, half_height-14*vh, 17,{
        isStatic: true,
        render: {
            fillStyle: "transparent",
            strokeStyle: "#000000",
            lineWidth: 10
          },
    });
    bodies.push(o_ball);
    
    // Developer 위에 있는 바 5 
    const bar_4 = createBlock(width/2,scrollHeight/9*4,width/10*1,line_width, {
        isStatic: true,
        angle: Math.PI * 0.021,
        render: {
            visible: false
        }
    });
    bodies.push(bar_4)

    // Developer 안에 있는 o 6
    const o_ball_2 = Matter.Bodies.circle(width/2+44,scrollHeight/9*4+23, 17,{
        isStatic: true,
        render: {
            fillStyle: "transparent",
            strokeStyle: "#000000",
            lineWidth: 10
          },
    });
    bodies.push(o_ball_2);

    // works 에 있는 바 7

    const line_1 = createBlock(width/2+160,scrollHeight/9*4+135,80,1, {
        isStatic: true,
        frictionStatic: 1,
        // angle: Math.PI * 0.021,
        render: {
            visible: false
        }
    });
    bodies.push(line_1)
    
    
}

function createBlock(x, y, w, h, options = {}) {
    const block = Matter.Bodies.rectangle(x, y, w, h, {
        friction: 1,
        frictionAir: 0.001,
        render: {
        //   fillStyle: "transparent",
        //   strokeStyle: "#8d9091",
          lineWidth: 0,
        //   opacity: 0.4
        },
        ...options
      }) 
    // bodies.push(block)
    return block
}

function createBall(x,y,r,options = {}) {
    const ball = Matter.Bodies.circle(x,y,r,{
        isStatic: true,
        render: {
            fillStyle: "transparent",
            strokeStyle: "#000000",
            lineWidth: 10
        },
        ...options
    });
    return ball;
}


createBodies();

Matter.World.add(engine.world,bodies);
Matter.Engine.run(engine);
Matter.Render.run(render);


function HandleClick(x,y,z) { 
    const ball_1_2 = createBall(x,y, 17,{
        isStatic: false,
        restitution: 1,
        render: {
            fillStyle: "transparent",
            strokeStyle: "#000000",
            lineWidth: 10
          }
    });
    Matter.World.add(engine.world, ball_1_2);
    // console.log(bodies[3])

    Matter.World.remove(engine.world, bodies[z]);
    // setTimeout(() => {
    //     Matter.World.remove(engine.world, bar_1_2);
    //   }, 5000);
    return ball_1_2;
};

var introduction = document.getElementById("introduction")
introduction.style.display = "none";

document.addEventListener('scroll', function() {
    var currentScrollValue = document.documentElement.scrollTop;
    // console.log(currentScrollValue);
    if(currentScrollValue > 150) {
        // count(half_width-57,half_height-14*vh,6);
        // count(half_width-57,half_height-14*vh,6);
        if (once == true) {
            test1();
            HandleClick(half_width-57,half_height-14*vh,4)
        }
        if (introduction.style.display === "none"){
            introduction.style.display = "block";
        }
    };
})

function test1() {
    once = false;
    console.log("++++++++++++")
}

function test2() {
    twice = false;
    console.log("++++++++++++")
}

var count = (function() {
    var flag = false;
    console.log("123")
    return function(x,y,z) {        
        if(!flag) {
            flag = true;
            var check = HandleClick(x,y,z);
        }
        return check;
    };
})(); 

// console.log(count())

// o 이 한 번만 떨어지기 위함 

// Matter.Events.on()
var colorA = '#f55a3c',
    colorB = '#f5d259';

//collision 이벤트 감지

Matter.Events.on(engine, 'collisionStart', function(event) {
    var pairs = event.pairs;
    
    for (var i = 0, j = pairs.length; i != j; ++i) {
        var pair = pairs[i];

        if (pair.bodyA === bodies[3]) {
            pair.bodyB.render.strokeStyle = colorB;
        } else if (pair.bodyB === bodies[3]) {
            pair.bodyA.render.strokeStyle = colorB;
        }
    }
});

function test() {
    console.log("test")
}

var circle = document.getElementById("circle")
var maze = document.getElementById("maze")
var works = document.getElementById("works")
var box_1 = document.getElementById("box_1")
circle.style.display = "none";

Matter.Events.on(engine, 'collisionStart', function(event) {
    var pairs = event.pairs;
    
    for (var i = 0, j = pairs.length; i != j; ++i) {
        var pair = pairs[i];

        if (pair.bodyA === bodies[5]) {
            // pair.bodyB.render.strokeStyle = colorA;
            Matter.World.remove(engine.world, bodies[6]);
            // count(width/2+6*vw,scrollHeight/9*4+2.5*vh,8);
            // if (twice == true) {
            //     // test2();
            //     console.log("1")
            //     // HandleClick(width/2+44,scrollHeight/9*4+23, 6);
                
            // }

            if (circle.style.display === "none"){
                circle.style.display = "block";
            }

            maze.style.opacity="0.5";

            setTimeout(function(){
                maze.style.opacity="0.2";


            },6000);
        } 
    }
});

Matter.Events.on(engine, 'collisionStart', function(event) {
    var pairs = event.pairs;
    
    for (var i = 0, j = pairs.length; i != j; ++i) {
        var pair = pairs[i];

        if (pair.bodyA === bodies[7]) {

            // works 에 있는 왼쪽 바 
        const line_2 = createBlock(width/2+135,scrollHeight/9*4+115,60,1, {
            isStatic: true,
            frictionStatic: 1,
            angle: Math.PI * 0.5,
            render: {
                visible: false
            }
        });
        Matter.World.add(engine.world, line_2);
        
        // works 에 있는 오른쪽 바 
        const line_3 = createBlock(width/2+185,scrollHeight/9*4+115,60,1, {
            isStatic: true,
            frictionStatic: 1,
            angle: Math.PI * 0.5,
            render: {
                visible: false
            }
        });
        Matter.World.add(engine.world, line_3);

        // works 에 있는 위쪽 바
        const line_4 = createBlock(width/2+160,scrollHeight/9*4+95,80,1, {
            isStatic: true,
            frictionStatic: 1,
            // angle: Math.PI * 0.021,
            render: {
                visible: false
            }
        });
        Matter.World.add(engine.world, line_4);
        works.style.color="#f5d259"

        } 
    }
});





