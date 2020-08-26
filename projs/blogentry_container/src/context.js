import React from 'react';


export const DocumentContext = React.createContext({});

export function DocumentContextProvider(props) {
  let ctx = {
    indexes: [],
    level: 0,
    figure: {
      list: props.figureList,
      indexes: {}
    },
    bullet: {
      level: 0
    },
    section: {}
  };

  return (
    <DocumentContext.Provider value={ctx}>
        {props.children}
    </DocumentContext.Provider>
  );
}

export class DocumentContextManager {
  constructor(ctx) {
    this.ctx = ctx;
  }

  penetrate(ctx) {
    this.ctx = ctx;
    this.ctx.level++;
    for (let i = this.ctx.level + 1; i < this.ctx.indexes.length; i++) {
        this.ctx.indexes[i] = undefined;
    }
  }

  exit() {
    this.ctx.level--;
    if (this.ctx.bullet.level > 0) {
      this.ctx.bullet.level--;
    }
  }

  nextBulletIcon() {
    this.ctx.bullet.level++;
  }

  nextSectionNumber(headerText) {
    this.ctx.indexes[this.ctx.level] =
        this.ctx.indexes[this.ctx.level] === undefined ?
        1 : this.ctx.indexes[this.ctx.level] + 1;
    let indexes = this.ctx.indexes.slice(1, this.ctx.level + 1);
    let index = indexes.join(".");
    this.ctx.section["sec_" + index] = index + ". " + headerText;
    return index;
  }

  getContext() {
    // DEBUG code
    //let json = JSON.stringify(this.ctx);
    //return JSON.parse(json);
    // RELEASE code
    return this.ctx;
  }
}
