const d = document,
      el = (id) => d.getElementById(id)

let fieldMy = d.querySelector('.My'),
    fieldEnemy = d.querySelector('.Enemy'),
    table,
    row,
    column,
    error = d.createElement('p'),
    start = d.createElement('button'),
    i = 0, j = 0, a = 0, itter = 0, forOur = 1,
    first = 0, side = 0, test = 0,
    diapozone = [], log = true, propusk = true,
    center = d.querySelector('center'),
    rand = el('random');

let box = [];
for(i = 1; i < 11; i++){
    for(j of 'АБВГДЕЖЗИК'){
        box.push(j+i)
    }
}
let en = [];
for(i = 1; i < 11; i++){
    for(j of 'ABCDEFGHIJ'){
        en.push(j+i)
    }
}

let range = function(number){
    while(number % 10 !== 0){
        number--
    }
    return([number, number+10])
}

let setDirection = function(side, first, n, box){
    a = 0;
    if(side === 1){
        while((first - side) >= range(first)[0] && !el(box[first - side]).className && a < n){
            a++;
            first--;
        }
        first += a;
        while((first + side) < range(first)[1] && !el(box[first + side]).className && a < n){
            a++;
            first++;
        }
    } else if(side === 10){
        while((first - side) >= 0 && !el(box[first - side]).className && a < n){
            a++;
            first -= side;
        }
        first += 10 * a;
        while((first + side) < 100 && !el(box[first + side]).className && a < n){
            a++;
            first += side;
        }
    }
    return a;
}

let createShip = function(n, box){
    let wasN = n,
    	wasBox = box.slice(0, );
    log = true;

    // Создание первой части корабля
    while(log){
    	test = 0;
        first = Math.floor(Math.random() * 100)
        while(el(wasBox[first]).className){
            first = Math.floor(Math.random() * 100)
        }
        // Определение направления постройки
        side = [1, 10][Math.floor(Math.random() * 2)]

        while(log && test < 2){
            if(n !== 1 && setDirection(side, first, n, box) !== n){
                if(side === 10){side = 1} else{side = 10}
            } else{log = false}
            test++
        }
    }
    el(box[first]).className = 'ship';
    wasBox.splice(first, 1);

    // Создание остальных частей
    side = [side, -side][Math.floor(Math.random() * 2)]
    for(i = 1; i < n; i++){
        if(side === 1 || side === -1){
            if(first + side >= range(first)[0] && first + side < range(first)[1] && !el(box[first + side]).className){
                el(box[first + side]).className = 'ship';
                wasBox.splice(first + side, 1);
                first += side;
            } else{
                first -= side;
                n++;
            }
        } else{
            if(first + side >= 0 && first + side < 100 && !el(box[first + side]).className){
                el(box[first + side]).className = 'ship';
                wasBox.splice(first + side, 1);
                first += side;
            } else{
                first -= side;
                n++;
            }
        }
    }
    for(j of [1, -10, -1, 10]){
        if(first + j >= 0 && first + j < 100 && el(box[first + j]).className === 'ship'){
            side = j;
            break
        }
    }
    for(i = 0; i < wasN; i++){
        if(box[first][0] === 'А'){
            for(j of [10, -10, -9, 11, 1]){
                if(first + j >= 0 && first + j < 100 && !el(box[first + j]).className){
                    el(box[first + j]).className = 'mimo';
                    wasBox.splice(first + j, 1);
                }
            }
        } else if(box[first][0] === 'К'){
            for(j of [10, -10, 9, -11, -1]){
                if(first + j >= 0 && first + j < 100 && !el(box[first + j]).className){
                    el(box[first + j]).className = 'mimo';
                    wasBox.splice(first + j, 1);
                }
            }
        } else{
            for(j of [10, -10, -9, 9, -11, 11, -1, 1]){
                if(first + j >= 0 && first + j < 100 && !el(box[first + j]).className){
                    el(box[first + j]).className = 'mimo';
                    wasBox.splice(first + j, 1);
                }
            }
        }
        first += side;
    }
}
    

window.onload = function(){
    table = d.createElement('table')
    table.className = 'our';
    for(i = 0; i < 10; i++){
        row = d.createElement('tr');
        for (j = 0; j < 10; j++){
            column = d.createElement('td');
            column.id = en[a];
            column.addEventListener('click', ourShip);
            row.appendChild(column);
            a++;
        }
        table.appendChild(row);
    }
    fieldMy.appendChild(table);
    fieldMy.appendChild(error);
    start.innerHTML = '<b>СТАРТ</b>';
    fieldMy.appendChild(start);

    a = 0;
    table = d.createElement('table')
    for(i = 0; i < 10; i++){
        row = d.createElement('tr');
        for (j = 0; j < 10; j++){
            column = d.createElement('td');
            column.id = box[a];
            row.appendChild(column);
            a++;
        }
        table.appendChild(row);
    }
    fieldEnemy.appendChild(table);

    createShip(4, box);
    console.log('COMPLETE!!!');
    createShip(3, box);
    console.log('COMPLETE!!!');
    createShip(3, box);
    console.log('COMPLETE!!!');
    createShip(2, box);
    console.log('COMPLETE!!!');
    createShip(2, box);
    console.log('COMPLETE!!!');
    createShip(2, box);
    console.log('COMPLETE!!!');
    createShip(1, box);
    console.log('COMPLETE!!!');
    createShip(1, box);
    console.log('COMPLETE!!!');
    createShip(1, box);
    console.log('COMPLETE!!!');
    createShip(1, box);
    console.log('COMPLETE!!!');
}

// Мои ходы
let move = function(){
    let t = event.target,
        location = box.indexOf(t.id),
        side = 0,
        log = false,
        a = 0;

    if(t.className === 'ship'){
        propusk = false;
        t.className = 'yellow';
        // Однопалубники
        for(j of [1, -1, 10, -10]){
            if(el(box[location + j])?.className === 'mimo' || el(box[location + j])?.className === undefined || el(box[location + j]).style.backgroundColor === 'green'){
                a++
            } else if((j === 1 || j === -1) && (location + j < range(location)[0] || location + j >= range(location)[1])){
                a++
            }
            if(el(box[location + j])?.className === 'ship'){
                a = 0;
                break;
            }
        }
        //
        if(a === 4)
            log = true;
        for(j of [1, -1, 10, -10]){
            if((j === 1 || j === -1) && location + side >= range(location)[1] && location + side < range(location)[0]){
                continue;
            } else if((j === 10 || j === -10) && location + side >= 100 && location + side < 0){
                continue;
            }   
            if(el(box[location + j])?.className === 'yellow'){
                side = j;
                log = true;
                break;
            }   
        }
        for(i = 0; i<4; i++){
            if((side === 1 || side === -1) && location + side < range(location)[1] && location + side >= range(location)[0]){
                location += side;
            } else if((side === 10 || side === -10) && location + side < 100 && location + side >= 0){
                location += side;
            } else{
                break;
            }
            if(el(box[location])?.className === 'ship'){
                log = false;
                break;
            }
            if(el(box[location])?.className === 'mimo') 
                break;
        }
        location -= side;
        for(i = 0; i<4; i++){
            if((side === 1 || side === -1) && location - side < range(location)[1] && location - side >= range(location)[0]){
                location -= side;
            } else if((side === 10 || side === -10) && location - side < 100 && location - side >= 0){
                location -= side;
            } else{
                break;
            }
            if(el(box[location])?.className === 'ship'){
                log = false;
                break;
            }
            if(el(box[location])?.className === 'mimo') 
                break;
        }
        location = box.indexOf(t.id)
        for(j of [1, -1, 10, -10]){
            if((j === 1 || j === -1) && location + side >= range(location)[1] && location + side < range(location)[0]){
                continue;
            } else if((j === 10 || j === -10) && location + side >= 100 && location + side < 0){
                continue;
            }   
            if(el(box[location + j])?.className === 'yellow'){
                side = j;
                break;
            }   
        }
        if(log){
            for(i = 0; i<4; i++){
                el(box[location]).className = 'red';
                if(box[location][0] === 'А'){
                    for(j of [10, -10, -9, 11, 1]){
                        if(location + j >= 0 && location + j < 100 && el(box[location + j]).className === 'mimo'){
                            el(box[location + j]).style.backgroundColor = 'green';
                        }
                    }
                } else if(box[location][0] === 'К'){
                    for(j of [10, -10, 9, -11, -1]){
                        if(location + j >= 0 && location + j < 100 && el(box[location + j]).className === 'mimo'){
                            el(box[location + j]).style.backgroundColor = 'green';
                        }
                    }
                } else{
                    for(j of [10, -10, -9, 9, -11, 11, -1, 1]){
                        if(location + j >= 0 && location + j < 100 && el(box[location + j]).className === 'mimo'){
                            el(box[location + j]).style.backgroundColor = 'green';
                        }
                    }
                }
                if((side === 1 || side === -1) && location + side < range(location)[1] && location + side >= range(location)[0]){
                    location += side;
                } else if((side === 10 || side === -10) && location + side < 100 && location + side >= 0){
                    location += side;
                }
                if(el(box[location])?.className !== 'yellow')
                    break;
            }
        }
    } else if(t.className === 'red' || t.className === 'yellow' || t.style.backgroundColor === 'green'){
        propusk = false;
    } else{
        t.style.backgroundColor = 'green';
        propusk = true;
    }
    if(win(box) === 20){
        center.innerHTML = 'Враг уничтожен';
        for(i = 0; i<100; i++){
            d.querySelectorAll('.Enemy td')[i].removeEventListener('click', move)
        }
    } else if(propusk){
        enemyMove();
    }
}

let win = function(box){
    let a = 0,
        i = 0;

    for(i = 0; i<100; i++){
        if(el(box[i]).className === 'red')
            a++
    }
    return a;
}

let ourShip = function(){
    let t = event.target,
        loc = en.indexOf(t.id),
        wasLoc = loc,
        side = 0,
        a = 1,
        odn = true,
        ships = d.querySelectorAll('.My .ship'),
        my = d.querySelectorAll('.My td');

    if(!t.className){
        t.className = 'ship';
        t.style.backgroundColor = 'black';
        itter++;
        for(j of [4, 7, 10, 12, 14, 16, 17, 18, 19, 20]){
            // Для однопалубников
            if(itter > 16){
                odn = false;
                if(en[loc][0] === 'A'){
                    for(i of [10, -10, -9, 11, 1]){
                        if(loc + i >= 0 && loc + i < 100)
                            el(en[loc + i]).className = 'mimo';
                    }
                } else if(en[loc][0] === 'J'){
                    for(i of [10, -10, 9, -11, -1]){
                        if(loc + i >= 0 && loc + i < 100)
                            el(en[loc + i]).className = 'mimo';
                    }
                } else{
                    for(i of [10, -10, 9, -9, -11, 11, -1, 1]){
                        if(loc + i >= 0 && loc + i < 100)
                            el(en[loc + i]).className = 'mimo';
                    }
                }
            }
            //
            if(itter === j && odn){
                for(j of [1, -1, 10, -10]){
                    if(el(en[loc + j])?.className === 'ship'){
                        side = j;
                    }
                } 
                for(i = 0; i < 4; i++){
                    if(((side===1||side===-1) && loc+side<range(loc)[1] && loc+side>=range(loc)[0] && el(en[loc + side])?.className === 'ship') || ((side===10 || side===-10) && el(en[loc + side])?.className === 'ship')){
                        forOur++;
                        a++;
                        if(loc + side < 100 && loc + side >= 0){
                            loc += side;
                        } else{break}
                    } else{break}
                }
                for(i = 0; i < 4; i++){
                    if(((side===1||side===-1) && wasLoc-side<range(wasLoc)[1] && wasLoc-side>=range(wasLoc)[0] && el(en[wasLoc - side])?.className === 'ship') || ((side===10 || side===-10) && el(en[wasLoc - side])?.className === 'ship')){
                        forOur++;
                        a++;
                        if(wasLoc - side < 100 && wasLoc - side >= 0){
                            wasLoc -= side;
                        }
                    } else{break}
                }
                if(forOur === itter){
                    for(i = 0; i < a; i++){
                        el(en[wasLoc])?.removeEventListener('click', ourShip)
                        if(en[wasLoc][0] === 'A'){
                            for(j of [10, -10, -9, 11, 1]){
                                if(wasLoc + j >= 0 && wasLoc + j < 100 && !el(en[wasLoc + j]).className){
                                    el(en[wasLoc + j]).className = 'mimo';
                                    el(en[wasLoc + j])?.removeEventListener('click', ourShip)
                                }
                            }
                        } else if(en[wasLoc][0] === 'J'){
                            for(j of [10, -10, 9, -11, -1]){
                                if(wasLoc + j >= 0 && wasLoc + j < 100 && !el(en[wasLoc + j]).className){
                                    el(en[wasLoc + j]).className = 'mimo';
                                    el(en[wasLoc + j])?.removeEventListener('click', ourShip)
                                }
                            }
                        } else{
                            for(j of [10, -10, -9, 9, -11, 11, -1, 1]){
                                if(wasLoc + j >= 0 && wasLoc + j < 100 && !el(en[wasLoc + j]).className){
                                    el(en[wasLoc + j]).className = 'mimo';
                                    el(en[wasLoc + j])?.removeEventListener('click', ourShip)
                                }
                            }
                        }
                        if(wasLoc + side < 100 && wasLoc + side >= 0)
                            wasLoc += side;
                    }
                    forOur++;
                } else{
                    error.innerHTML = 'Неправильное построение корабля!'
                }
            }
        }
    } else if(t.className === 'ship'){
        error.innerHTML = '';
        itter--;
        forOur--;
        t.className = '';
    }
    if(ships.length === 19){
        for(i = 0; i < 100; i++){
            my[i].removeEventListener('click', ourShip);
            start.style.display = 'block';
        }
    }
}

start.addEventListener('click', function(){
    let allEnemy = d.querySelectorAll('.Enemy td');

    start.style.display = 'none';
    for(i = 0; i < 100; i++){
        allEnemy[i].addEventListener('click', move);
    }
});


let target = 0,
	type = [],
	copytype = [],
	it = 0,
	next = 0,
	hurt = false,
	sp = [1, -1, 10, -10],
	col = 4,
	firstTarget = 0;
let enemyMove = function(){
	let go = true,
		sideType = 0,
		t = 0,
		s = 0,
		log = true;

    while(go){
    	if(hurt){
    		target += next;
    	} else{
    		target = Math.floor(Math.random() * 100);
    	}
    	//
    	console.log(target)
    	//
    	t = target;
    	if(el(en[target]).className === 'ship'){
    		if(!it){
    			firstTarget = target;
    			for(j of [1, -1, 10, -10]){
	    			if(el(en[target + j])?.className === 'ship'){
	    				sideType = j;
	    			}
	    		}
	    		for(i=0; i<4; i++){
	    			if(el(en[target - sideType])?.className === 'ship'){
	    				if(sideType === 1 || sideType === -1){
	    					if(target - sideType >= range(firstTarget)[0] && target - sideType < range(firstTarget)[1]){
	    						target-=sideType;
	    					}
	    				} else if(sideType === 10 || sideType === -10){
	    					if(target - sideType >= 0 && target - sideType < 100){
	    						target-=sideType;
	    					}
	    				} else{break}
	    			} else{break}
	    		}
	    		for(i=0; i<4; i++){
	    			if(el(en[target])?.className === 'ship'){
	    				type.push(target);
	    				target+=sideType;
	    			} else{break}
	    		}
	    		target = t;
	    		copytype = type.slice(0, );
	    		it = 1;
	    		hurt = true;
	    		s = new Set(copytype);
	    		next = sp[Math.floor(Math.random() * col)];
	    		while(log){
	    			if(s.size === 1){
	    				log = false;
    				} else if(en[target][0] === 'A' && next === -1){
    					next = sp[Math.floor(Math.random() * col)];
    				} else if(en[target][0] === 'J' && next === 1){
    					next = sp[Math.floor(Math.random() * col)];
    				} else if(target + next >= 100 || target + next < 0){
    					next = sp[Math.floor(Math.random() * col)];
    				} else if(el(en[target + next]).style.backgroundColor === 'green'){
    					next = sp[Math.floor(Math.random() * col)];
    				} else{
    					log = false;
    				}
    			}
    			log = true;
    		}
    		if(s.size !== 1){
    			el(en[target]).className = 'yellow';
    			el(en[target]).style.backgroundColor = 'yellow';
    			type.splice(type.indexOf(target), 1);
    			if((next===1||next===-1) && (target+next<range(target)[0] || target+next>=range(target)[1])){
    				next = -next;
    			} else if((next===10||next===-10) && (target+next>=100 || target+next<0)){
    				next = -next;
    			}
    		} else{
    			type = [];
    		}
    		if(type.length === 0){
    			for(i of copytype){
    				el(en[i]).className = 'red';
    				el(en[i]).style.backgroundColor = 'red';
    				if(en[i][0] === 'A'){
                        for(j of [10, -10, -9, 11, 1]){
                            if(i + j >= 0 && i + j < 100 && el(en[i + j]).className === 'mimo'){
                                el(en[i + j]).style.backgroundColor = 'green';          
                            }
                        }
                    } else if(en[i][0] === 'J'){
                        for(j of [10, -10, 9, -11, -1]){
                            if(i + j >= 0 && i + j < 100 && el(en[i + j]).className === 'mimo'){
                                el(en[i + j]).style.backgroundColor = 'green';          
                            }
                        }
                    } else{
                        for(j of [10, -10, -9, 9, -11, 11, -1, 1]){
                            if(i + j >= 0 && i + j < 100 && el(en[i + j]).className === 'mimo'){
                                el(en[i + j]).style.backgroundColor = 'green';
                            }
                        }
                    }
    			}
    			if(win(en) === 20){
			        center.innerHTML = 'Вы проиграли битву, но не войну!';
			        for(i = 0; i<100; i++){
			            d.querySelectorAll('.Enemy td')[i].removeEventListener('click', move)
			        }
			        go = false;
			    }
    			it = 0;
    			col = 4;
    			sp = [1, -1, 10, -10];
    			hurt = false;
    			next = 0;
    		}
    	} else if(el(en[target]).className === 'yellow' || el(en[target]).className === 'red' || el(en[target]).style.backgroundColor === 'green'){
    		go = true;
    		if(hurt){
    			if(el(en[target]).style.backgroundColor === 'green'){
    				target = firstTarget;
    				next = -next;
    			}
    		}
    	} else{
    		el(en[target]).style.backgroundColor = 'green';
    		go = false;
    		if(hurt){
    			target = firstTarget;
    			if(sp.length > 1){
    				sp.splice(sp.indexOf(next), 1);
    			}
    			col--;
    			while(log){
    				if(en[target][0] === 'A' && next === -1){
    					next = sp[Math.floor(Math.random() * col)];
    				} else if(en[target][0] === 'J' && next === 1){
    					next = sp[Math.floor(Math.random() * col)];
    				} else if(target + next >= 100 || target + next < 0){
    					next = sp[Math.floor(Math.random() * col)];
    				} else if(el(en[target + next]).style.backgroundColor === 'green'){
    					next = sp[Math.floor(Math.random() * col)];
    				} else{
    					log = false;
    				}
    			}
    			log = true;
    		}
    	}
    }
}

rand.onclick = function(){
	let my = d.querySelectorAll('.My td');

	createShip(4, en);
	createShip(3, en);
	createShip(3, en);
	createShip(2, en);
	createShip(2, en);
	createShip(2, en);
	createShip(1, en);
	createShip(1, en);
	createShip(1, en);
	createShip(1, en);

	for(i = 0; i < 100; i++){
        my[i].removeEventListener('click', ourShip);
        if(my[i].className === 'ship'){
        	my[i].style.backgroundColor = 'black';
        }
    }
    start.style.display = 'block';
    rand.style.display = 'none';
}