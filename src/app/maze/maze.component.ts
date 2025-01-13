import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-maze',
  templateUrl: './maze.component.html',
  styleUrls: ['./maze.component.css'],
  standalone: false
})
export class MazeComponent implements AfterViewInit {
  stepsCount = 0;

  ngAfterViewInit() {
    const circle = document.createElement('div');
    let position = { x: 0, y: 0 };
    const keys = {
      left: 37,
      up: 38,
      right: 39,
      down: 40
    };
    const width = prompt('please enter board width?');
    const height = prompt('please enter board height?');

    this.makeGrid(width, height);
    circle.style.width = '20px';
    circle.style.height = '20px';
    circle.style.backgroundColor = '#000';
    let removedNode = 0;
    const firstmushroom = Math.floor((parseInt(width, 10) + parseInt(height, 10)) / 4);
    const firstGrid = document.querySelector('.grid-item-' + firstmushroom + '' + firstmushroom);
    const mushroomsCount = (parseInt(width, 10) + parseInt(height, 10)) / 2;
    position = { x: firstmushroom, y: firstmushroom };
    firstGrid.appendChild(circle);
    let lengthDiv = 0;
    function handleKey(e) {
      const obj = this;
      lengthDiv++;
      switch (e.keyCode) {
        case keys.left:
          position.y--;
          break;
        case keys.up:
          position.x--;
          break;

        case keys.right:
          position.y++;
          break;

        case keys.down:
          position.x++;
          break;
      }

      const gridItem = <HTMLDivElement>(document.querySelector('.grid-item-' + position.x + '' + position.y));
      const node = document.querySelector('.grid-item-' + position.x + '' + position.y);
      if (position.x >= 0 && position.y >= 0) {
        if (node && node.innerHTML.includes('background-color')) {
          removedNode ++;
          const selectedCircle = <HTMLDivElement>(document.querySelector('#greenCircle' + position.x + '' + position.y));
          selectedCircle.style.display = 'none';
        }
      }
      gridItem.appendChild(circle);
      if (mushroomsCount === removedNode) {
        alert(`you have completed the game in ${lengthDiv} steps`);
      }


    }
    window.addEventListener('keydown', handleKey);

    for (let index = 0; index < mushroomsCount; index++) {
      this.addMushrooms(mushroomsCount);
    }


  }

  makeGrid(rows, cols) {
    const container = <HTMLDivElement>(document.querySelector('.grid'));

    container.style.setProperty('--grid-rows', rows);
    container.style.setProperty('--grid-cols', cols);

    let x = 0;
    let y = 0;
    for (let c = 0; c < rows * cols; c++) {
      const cell = document.createElement('div');

      y = c % cols;

      if (y === (rows - 1)) {
        x++;
      }

      container.appendChild(cell).className = 'grid-item grid-item-' + x + '' + y;
    }
  }

  addMushrooms(mushroomsCount) {
    const mushroom = document.createElement('div');

    const randomNumberX = this.getRandomIndex(mushroomsCount);
    const randomNumberY = this.getRandomIndex(mushroomsCount);

    mushroom.style.width = '20px';
    mushroom.style.height = '20px';
    mushroom.style.backgroundColor = '#228644';
    mushroom.id = `greenCircle` + randomNumberX + '' + randomNumberY;
    const gridItem = document.querySelector('.grid-item-' + randomNumberX + '' + randomNumberY);
    gridItem.appendChild(mushroom);

  }

  getRandomIndex(mushroomsCount) {
    // console.log(Math.random() * (max - min + 1) + min);
    const random = Math.floor(Math.random() * (mushroomsCount - 1 + 1) + 1);
    return random;
  }


}
