// 总的食物对象
; (function (w) {
    var list = [];

    // 食物对象
    function Food(width, height, x, y, bgColor) {
        this.width = width || 20;
        this.height = height || 20;
        this.x = x || 0;
        this.y = y || 0;
        this.bgColor = bgColor || "green";
    }

    // 食物渲染
    Food.prototype.render = function (map) {
        removeList(map);

        this.x = this.randomNum(map).x;
        this.y = this.randomNum(map).y;

        this.sFood(map, this.x, this.y);

        if (+game.score1.innerHTML % 25 == 0 && +game.score1.innerHTML != 0) {
            this.x1 = this.randomNum(map).x;
            this.y1 = this.randomNum(map).y;

            if (this.x == this.x1 && this.y == this.y2) {
                this.x1 = this.randomNum(map).x;
                this.y1 = this.randomNum(map).y;
            }

            this.sFood(map, this.x1, this.y1, 'url("./241.gif")');
        }
    }

    Food.prototype.sFood = function (map, x, y, bgColor) {
        var div1 = document.createElement("div");

        div1.style.width = this.width + "px";
        div1.style.height = this.height + "px";
        div1.style.position = "absolute";
        div1.style.left = x + "px";
        div1.style.top = y + "px";
        div1.style.background = bgColor || this.bgColor;
        div1.style.borderRadius = "10px";

        map.appendChild(div1);
        list.push(div1);
    }

    Food.prototype.randomNum = function (map) {
        var x = Math.floor(Math.random() * map.clientWidth / this.width) * this.width;
        var y = Math.floor(Math.random() * map.clientHeight / this.height) * this.height;
        for (var i = 0; i < map.children.length; i++) {
            if (x == parseInt(map.children[i].style.left) && y == parseInt(map.children[i].style.top)) {
                x = Math.floor(Math.random() * map.clientWidth / this.width) * this.width;
                y = Math.floor(Math.random() * map.clientHeight / this.height) * this.height;
            }
        }
        return {
            x: x,
            y: y
        }
    }

    // 删除食物被吃后的剩余
    function removeList(map) {
        for (var i = 0; i < list.length; i++) {
            map.removeChild(list[i]);
        }
        list = [];
    }

    w.Food = Food;
}(window))

    // 总的蛇对象
    ; (function (w) {
        var list = [];

        // 蛇对象
        function Snake(width, height, dirction) {
            this.width = width || 20;
            this.height = height || 20;
            this.dirction = dirction || "right";
            this.num = 0;

            this.body = [
                { x: 3, y: 1, bgColor: "red" },
                { x: 2, y: 1, bgColor: "pink" },
                { x: 1, y: 1, bgColor: "skyblue" },
                { x: 0, y: 1, bgColor: "skyblue" }
            ]

            // this.text = ["我", "P", "Y", "P", "是", "全", "黑", "马", "最", "帅", "的", "不", "接", "受", "反", "驳", ",", "既", "然", "玩", "到", "了", "这", "么", "后", "面", ",", "那", "相", "信", "你", "一", "定", "是", "我", "的", "忠", "粉", "丝", ",", "快", "加", "P", "Y", "教", "吧", "!", "我", "教", "成", "员", "有", "艾", "平", "、", "大", "司", "马", "、", "爱", "丽", "以", "及", "."];
        }

        // 蛇的渲染
        Snake.prototype.render = function (map) {
            removeList(map);

            for (var i = 0; i < this.body.length; i++) {
                var div1 = document.createElement("div");

                div1.style.width = this.width + "px";
                div1.style.height = this.height + "px";
                div1.style.position = "absolute";
                div1.style.background = 'url("./101.gif") 20px';
                div1.style.left = this.body[i].x * this.width + "px";
                div1.style.top = this.body[i].y * this.height + "px";
                div1.style.borderRadius = "10px";
                // div1.style.color = getRandomColor();
                // if (list.length >= this.text.length) {
                //     div1.innerHTML = this.text[this.text.length - 1];
                // } else {
                //     div1.innerHTML = this.text[i];
                // }
                // div1.style.fontSize = "20px";

                map.appendChild(div1);
                list.push(div1);
            }
        }

        // 蛇移动
        Snake.prototype.move = function (food, map, game) {
            for (var i = this.body.length - 1; i > 0; i--) {
                this.body[i].x = this.body[i - 1].x;
                this.body[i].y = this.body[i - 1].y;
            }

            this.eat(food, map, game);

            switch (this.dirction) {
                case "right":
                    this.body[i].x++;
                    break;
                case "left":
                    this.body[i].x--;
                    break;
                case "top":
                    this.body[i].y--;
                    break;
                case "bottom":
                    this.body[i].y++;
                    break;
            }
        }

        // 蛇吃食物
        Snake.prototype.eat = function (food, map, game) {
            this.snakeHeadX = this.body[0].x * this.width;
            this.snakeHeadY = this.body[0].y * this.height;
            var foodX = food.x;
            var foodY = food.y;
            var foodX1 = food.x1
            var foodY1 = food.y1;

            var Snakefoot = this.body[this.body.length - 1];

            if (this.snakeHeadX == foodX && this.snakeHeadY == foodY) {
                this.addLenght(Snakefoot);
                this.num += 5;
                game.score1.innerHTML = this.num;
                food.render(map);
            }

            if (this.snakeHeadX == foodX1 && this.snakeHeadY == foodY1) {
                this.addLenght(Snakefoot);
                this.num += 25;
                game.score1.innerHTML = this.num;

                game.wall.newWall(map);
                food.render(map);
            }

        }

        Snake.prototype.addLenght = function (Snakefoot) {
            this.body[this.body.length] = {
                x: Snakefoot.x,
                y: Snakefoot.y,
                bgColor: getRandomColor()
            }
        }

        // 删除蛇皮
        function removeList(map) {
            for (var i = 0; i < list.length; i++) {
                map.removeChild(list[i]);
            }
            list = [];
        }

        function getRandomColor() {
            var r1 = Math.floor(Math.random() * 256);
            var r2 = Math.floor(Math.random() * 256);
            var r3 = Math.floor(Math.random() * 256);

            var str = "rgb(" + r1 + "," + r2 + "," + r3 + ")";

            return str;
        }
        w.Snake = Snake;
    }(window))

    // 障碍物对象
    ; (function (w) {
        var remList = [];

        function Wall(width, height, bg) {
            this.width = width || 20;
            this.height = height || 20;
            this.bg = bg || 'url("./墙.jpg")';
            this.list = [];
        }

        Wall.prototype.random = function (map) {
            removeList(map);

            this.num = Math.floor(Math.random() * 10);

            for (var i = 0; i < this.num; i++) {
                this.newWall(map);
            }
        }

        Wall.prototype.newWall = function (map) {
            var x = Math.ceil(Math.random() * (map.clientWidth - this.width - this.width) / this.width) * this.width;
            var y = Math.ceil(Math.random() * (map.clientHeight - this.height - this.height) / this.height) * this.height;

            var div1 = document.createElement("div");

            div1.style.width = this.width + "px";
            div1.style.height = this.height + "px";
            div1.style.background = this.bg;
            div1.style.position = "absolute";
            div1.style.width = this.width + "px";
            div1.style.borderRadius = 10 + "px";
            div1.style.left = x + "px";
            div1.style.top = y + "px";

            map.appendChild(div1);
            this.list.push({
                x: div1.style.left,
                y: div1.style.top
            });
            remList.push(div1);
        }

        function removeList(map) {
            for (var i = 0; i < remList.length; i++) {
                map.removeChild(remList[i]);
            }
            remList = [];
        }

        w.Wall = Wall;
    }(window))

    // 总的游戏控制器对象
    ; (function (w) {
        var that;

        // 游戏控制器对象
        function Game(map, gogogo, stopMove, score1, score2, endBox, rem, norem, username, rank, colorSelect) {
            this.map = map;
            this.gogogo = gogogo;
            this.stopMove = stopMove;
            this.score1 = score1;
            this.score2 = score2;
            this.endBox = endBox;
            this.username = username;
            this.rem = rem;
            this.norem = norem;
            this.timeId;
            this.rank = rank;
            this.food = new Food(0, 0, 0, 0, 'url("./251.gif") 20px');
            this.snake = new Snake();
            this.wall = new Wall();
            this.colorSelect = colorSelect;
            that = this;
        }

        // 游戏开始执行代码
        Game.prototype.start = function () {
            this.food.render(this.map, this.snake);
            this.snake.render(this.map);
            this.wall.random(this.map);
            this.moveAuto(this.food, this.map);
            this.Gogo(this.gogogo)
            this.bindKey();
        }

        // 游戏的点击事件
        Game.prototype.Gogo = function () {
            document.onkeydown = function (e) {
                e = e || window.event;
                if (e.keyCode == 13) {
                    this.start();
                    gogogo.style.display = "none";
                    this.endBox.style.display = "none";
                    this.flag = true;
                }
            }.bind(that);

            this.gogogo.onclick = function () {
                this.start();
                gogogo.style.display = "none";
                this.flag = true;
            }.bind(that);

            this.stopMove.onclick = function () {
                this.stopMove.style.display = "none";
                this.moveAuto(this.food, this.map);
            }.bind(that);
            this.colorSelects(this.map);
        }

        // 蛇自动移动
        Game.prototype.moveAuto = function (food, map) {
            this.flag = true;
            this.timeId = setInterval(function () {
                this.snake.move(food, map, this);

                // 判断

                // 获得蛇头位置
                this.snakeHeadX = this.snake.body[0].x * this.snake.width;
                this.snakeHeadY = this.snake.body[0].y * this.snake.height;

                // 蛇走到边界时
                if (this.snakeHeadX < 0) {
                    this.snake.body[0].x = map.offsetWidth / this.snake.width - 1;
                }
                if (this.snakeHeadY < 0) {
                    this.snake.body[0].y = map.offsetHeight / this.snake.height - 1;
                }
                if (this.snakeHeadX >= map.offsetWidth) {
                    this.snake.body[0].x = 0;
                }
                if (this.snakeHeadY >= map.offsetHeight) {
                    this.snake.body[0].y = 0;
                }

                // 蛇吃到自身时
                for (var i = this.snake.body.length - 1; i > 0; i--) {
                    if (this.snakeHeadX == this.snake.body[i].x * this.snake.width && this.snakeHeadY == this.snake.body[i].y * this.snake.height) {
                        this.snakeDie();
                    }
                    if (this.food.x == this.snake.body[i].x * this.snake.width && this.food.y == this.snake.body[i].y * this.snake.height) {
                        this.food.render(this.map);
                    }
                }

                // 蛇撞到障碍物时
                for (var i = 0; i < this.wall.list.length; i++) {
                    if (this.snakeHeadX == parseInt(this.wall.list[i].x) && this.snakeHeadY == parseInt(this.wall.list[i].y)) {
                        this.snakeDie();
                    }
                }

                // 蛇前进渲染
                this.snake.render(this.map);
            }.bind(that), 100)

        }

        // 蛇死亡时
        Game.prototype.snakeDie = function () {
            clearInterval(this.timeId);
            this.endBox.style.display = "block";
            game.score1.innerHTML = 0;
            this.score2.innerHTML = this.snake.num;
            this.rem.onclick = function () {
                var flag = true;
                var rankNames = document.querySelectorAll(".rankName");
                var rankScores = document.querySelectorAll(".rankScore");
                for (var i = 0; i < rankNames.length; i++) {
                    if (this.username.value == rankNames[i].innerHTML) {
                        if (this.snake.num > +rankScores[i].innerHTML) {
                            rankScores[i].innerHTML = this.snake.num;
                            flag = false;
                        } else {
                            this.endBox.style.display = "none";
                            alert("自动保留历史最高成绩");
                            return;
                        }
                    }
                }
                if (flag) {
                    var tr1 = document.createElement("tr");
                    var td1 = document.createElement('td');
                    td1.setAttribute("class", "rankName");
                    var td2 = document.createElement('td');
                    td2.setAttribute("class", "rankScore");
                    if (this.username.value == "") {
                        td1.innerHTML = "匿名玩家";
                    } else {
                        td1.innerHTML = this.username.value;
                    }
                    td2.innerHTML = this.snake.num;
                    tr1.appendChild(td1);
                    tr1.appendChild(td2);
                    for (var i = 0; i < rankScores.length; i++) {
                        if (+this.snake.num > +rankScores[i].innerHTML) {
                            this.rank.insertBefore(tr1, rankScores[i].parentNode);
                            break;
                        } else {
                            this.rank.appendChild(tr1);
                        }
                    }
                }

                this.endBox.style.display = "none";
                this.score1.innerHTML = 0;
            }.bind(that);

            this.norem.onclick = function () {
                this.endBox.style.display = "none";
                this.score1.innerHTML = 0;
            }.bind(that);

            this.newGame();
            return;
        }

        // 新建游戏
        Game.prototype.newGame = function () {
            var game = new Game(map, gogogo, stopMove, score1, score2, endBox, rem, norem, username, rank, colorSelect);
            game.Gogo();
            gogogo.style.display = "block";
        }

        // 皮肤选择器
        Game.prototype.colorSelects = function (map) {
            for (var i = 0; i < this.colorSelect.length; i++) {
                this.colorSelect[i].onclick = function () {
                    var col1 = map.style.backgroundColor;
                    map.style.backgroundColor = this.style.backgroundColor;
                    this.style.backgroundColor = col1;
                }
            }
        }

        // 绑定键盘按键
        Game.prototype.bindKey = function () {
            document.onkeydown = function (e) {
                e = e || window.event;
                // e.preventDefault();

                switch (e.keyCode) {
                    case 37:
                        if (this.snake.dirction != "right") {
                            this.snake.dirction = "left";
                        }
                        break;
                    case 38:
                        if (this.snake.dirction != "bottom") {
                            this.snake.dirction = "top";
                        }
                        break;
                    case 39:
                        if (this.snake.dirction != "left") {
                            this.snake.dirction = "right";
                        }
                        break;
                    case 40:
                        if (this.snake.dirction != "top") {
                            this.snake.dirction = "bottom";
                        }
                        break;
                    case 32:
                        if (this.flag) {
                            clearInterval(this.timeId);
                            this.stopMove.style.display = "block";
                            this.flag = false;
                        } else {
                            this.stopMove.style.display = "none";
                            this.moveAuto(this.food, this.map);
                        }
                        break;
                    case 97:
                        var Snakefoot = this.snake.body[this.snake.body.length - 1];
                        this.snake.body[this.snake.body.length] = {
                            x: Snakefoot.x,
                            y: Snakefoot.y,
                            bgColor: ""
                        }
                        break;
                    case 49:
                        var Snakefoot = this.snake.body[this.snake.body.length - 1];
                        this.snake.body[this.snake.body.length] = {
                            x: Snakefoot.x,
                            y: Snakefoot.y,
                            bgColor: ""
                        }
                        break;
                }
            }.bind(that);
        }
        w.Game = Game;
    }(window))
