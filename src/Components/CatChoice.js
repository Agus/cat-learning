import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import './CatChoice.css';
import { Cat } from './Cat';

const generateCats = () => {
  // TODO: Super lazy way of loading images
  const cats = ['Cat1.jpg', 'Cat12.jpeg', 'Cat15.jpeg', 'Cat18.jpeg', 'Cat20.jpg', 'Cat5.jpg', 'Cat8.jpeg', 'Cat10.jpeg', 'Cat13.jpeg', 'Cat16.jpeg', 'Cat19.jpg', 'Cat3.jpg', 'Cat6.jpg', 'Cat9.jpeg', 'Cat11.jpeg', 'Cat14.jpeg', 'Cat17.jpeg', 'Cat2.jpg', 'Cat4.png', 'Cat7.jpeg'];
  const catsPairs = [];
  for (let i = 0; i < cats.length; i += 2) catsPairs.push([{ catImage: cats[i], clicks: 0 }, { catImage: cats[i + 1], clicks: 0 }]);

  // eslint-disable-next-line prefer-spread
  const indexes = Array.apply(null, { length: catsPairs.length }).map(Number.call, Number);

  const randomIndexes = indexes.sort(() => Math.random() - 0.5);
  const currentPair = randomIndexes.shift();
  return {
    catsPairs,
    randomIndexes,
    currentPair,
  };
};

export class CatChoice extends Component {
  constructor() {
    super();
    this.state = generateCats();
  }

  getWinnerCatImage() {
    const { catsPairs } = this.state;
    const sortedCats = catsPairs.flat().sort((a, b) => (b.clicks - a.clicks));
    return sortedCats[0].catImage;
  }

  nextPair() {
    this.setState((state) => {
      let { randomIndexes } = state;
      const currentPair = randomIndexes[0];
      randomIndexes = randomIndexes.slice(1);
      return { currentPair, randomIndexes };
    });
  }

  handleClick(catIndex) {
    this.setState((state) => {
      const { catsPairs, currentPair } = state;
      catsPairs[currentPair][catIndex].clicks++; //eslint-disable-line
      return {
        catsPairs,
      };
    });
    this.nextPair();
  }

  startOver() {
    this.setState(() => generateCats());
  }

  render() {
    const { catsPairs, currentPair } = this.state;
    return (
      <div>
        {
          currentPair === undefined
            ? (
              <div>
                <span>
                  Winner!!
                </span>
                <div className="Box">
                  <Cat className="WinnerCat" catImage={this.getWinnerCatImage()} />
                </div>
                <Button onClick={() => this.startOver()} className="StartAgain" variant="contained" color="primary">
      Start Again!
                </Button>
              </div>
            )
            : (
              <div className="Box">
                {
                catsPairs[currentPair].map((cat, catIndex) => <Cat onClick={() => this.handleClick(catIndex)} key={cat.id} catImage={cat.catImage} />)
              }
              </div>
            )
          }
      </div>
    );
  }
}
