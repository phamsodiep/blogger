import React from 'react';
import { M } from './math.js';
import { DocumentContext, DocumentContextManager } from './context.js';


const DOC_CTX = new DocumentContextManager(null);
const CONST_COLOUR = {
    color: "inherit"
};

function TypoExit() {
  DOC_CTX.exit();
  return null;
}

class TypoStyle {
  static BULLET_CLASSES = ["lindent0a", "lindent0b", "lindent0c"];

  /*constructor() {
  }*/

  getBulletClass() {
    const lv = DOC_CTX.getContext().bullet.level;

    return TypoStyle.BULLET_CLASSES[lv < 3 ? lv : 2];
  }

  getUpperBulletClass(upLv) {
    const lv = DOC_CTX.getContext().bullet.level - upLv;

    if (lv < 0) {
      return TypoStyle.BULLET_CLASSES[0];
    }
    return TypoStyle.BULLET_CLASSES[lv < 3 ? lv : 2];
  }
}
const TYPO_STYLE = new TypoStyle();

export function def(children, src, tooltip) {
  const isLocal = typeof src === "string" && src.startsWith("#");
  const target = isLocal ? null : "_blank";
  const rel = isLocal ? null : "noopener noreferrer";

  return function (props) {
    const suffix = props.s === undefined ? "" : "s";
    let txt = null;
    if (props.u === undefined && props.l === undefined) {
      txt = children;
    }
    else {
      let s = children.substring(1);
      if (props.u) {
        txt = children.charAt(0).toUpperCase() + s;
      }
      else {
        txt = children.charAt(0).toLowerCase() + s;
      }
    }
    return (
      <a
        target={target}
        rel={rel}
        href={src}
        title={tooltip}
        style={CONST_COLOUR}
      >
        {txt}{suffix}
      </a>
    );
  }
}

export function D(props) {
  return null;
}

export class Sect extends React.Component {
  static contextType = DocumentContext;

  render() {
    let sectionId = this.props.to;
    if (typeof sectionId !== "string") {
      return null;
    }
    let sectionCaption = this.context.section !== undefined ?
      this.context.section[sectionId] : null;
    let txt = this.props.children === undefined ? sectionCaption : this.props.children;
    let href = "#" + sectionId;
    let tooltip = typeof this.props.t === "string" ? this.props.t : "";
    return (
      <a
        href={href}
        title={tooltip}
        style={CONST_COLOUR}
      >
        <i>{txt}</i>
      </a>
    );
  }
}

export class U extends React.Component {
  static contextType = DocumentContext;

  computeHeaderString(headerText) {
    const FORMAT = this.props.f;
    const createElement = function (txt, index) {
      return [(!['b', 'i', 'u'].includes(FORMAT)) ? txt :
        React.createElement(
          FORMAT,
          null,
          txt
        ),
        index
      ];
    }
    if (this.props.h === undefined) {
      return createElement(headerText, null);
    }
    let index = DOC_CTX.nextSectionNumber(headerText);
    return createElement(index + ". " + headerText, index)
  }

  createHeaderElement() {
    const ctx = DOC_CTX.getContext();
    let headerElement = null;
    const headerTag = this.props.tag === undefined ? "div" : this.props.tag;
    const headerText = this.props.h;

    if (typeof headerText === "string" && headerText !== "") {
      const lv = ctx.level;
      const sepLv = 3 - lv >= 0 ? 3 - lv : 0;
      //const isSep = ctx.indexes[lv] > 1 && this.props.s !== true;
      const isSep = ctx.indexes[lv] > 0 && this.props.s !== true;
      const className = isSep ? "para_sep" + sepLv : null;
      const [header, index] = this.computeHeaderString(headerText);
      const content = React.createElement(
        headerTag,
        {
          id: 'sec_' + index
        },
        header
      );
      headerElement = typeof className === "string" ?
        (
          <div className={className}>
            {content}
          </div>
        ) :
        content;
    }

    return headerElement;
  }

  fetchBulletClass() {
    let subType = this.props.sub === undefined ? "" : this.props.sub;
    let subClass = "para_sep0";
    switch(subType) {
      case 'b':
        subClass = TYPO_STYLE.getBulletClass();
        DOC_CTX.nextBulletIcon();
        break;

      case 't':
        subClass = "lindent00";
        DOC_CTX.nextBulletIcon();
        break;

      case 's':
      default:
        break;
    }
    return subClass;
  }

  createSingleSubElement(innerElement) {
    /*let subClass = this.fetchBulletClass();
    let children = [];
          //@TODO: tach ham
          let e = innerElement;
          if (e.type === S) {
            if (subClass.startsWith("para_sep")) {
              children[children.length] = e;
            }
            else {
              children[children.length] = (
                <div className={subClass}>
                  {e}
                </div>
              );
            }
          }
    return children;*/
    const listOfElement = [innerElement];
    return this.createListOfSubElement(listOfElement);
  }

  createListOfSubElement(innerElement) {
    let subClass = this.fetchBulletClass();
    let children = [];
    let n = innerElement.length;
        for (let i = 0; i < n; i++) {
          let e = innerElement[i];
          if (e.type === S) {
            let className = subClass;
            // FIX BUG: Two bullet index for level 2 indent
            if (e.props.children !== undefined && e.props.children.type === U) {
              if (subClass.startsWith("lindent0")) {
                className = "lindent00";
              }
            }

            // @TODO REVIEW ME!
            // Add support remove bullet
            else if (e.props.rb === true){
              className = "lindent00";
            }

            if (e.props.hb) {
              if (TypoStyle.BULLET_CLASSES.includes(className)) {
                className = TYPO_STYLE.getUpperBulletClass(2) + " lindenthb";
              }
            }

            if (
              (className.startsWith("para_sep") && i === 0)
              || e.props.w === true
            ) {
              children[children.length] = e;
            }
            else {
              children[children.length] = e.props.h ? (
                <div>
                  {e}
                </div>
              ) : (
                <div className={className}>
                  {e}
                </div>
              );
            }
          }
        }
    return children;
  }

  createChildrenElement() {
    let children = [];
    let innerElement = this.props.children;

    if (innerElement !== undefined) {
      let n = innerElement.length;

      if (typeof n === "number") {
        children = this.createListOfSubElement(innerElement);
      }
      else {
        children = this.createSingleSubElement(innerElement);
      }
    }
    return children;
  }

  render() {
    DOC_CTX.penetrate(this.context);

    return (
      <React.Fragment>
        {this.createHeaderElement()}
        {this.createChildrenElement()}
        <TypoExit />
      </React.Fragment>
    );
  }

}

export class S extends React.Component {
  render() {
    let innerElement = this.props.children;
    let children = null;
    if (innerElement !== undefined) {
      if (typeof(this.props.html) === "string" &&
        typeof(innerElement) === "string")
      {
        if (this.props.html.length >= 2) {
          const tokens = [this.props.html.charAt(0), this.props.html.charAt(1)];
          innerElement = innerElement.split(tokens[0]).join("<");
          innerElement = innerElement.split(tokens[1]).join(">");
        }
      }
      children = this.props.math ? (
        <M>{innerElement}</M>
      ) : (
        innerElement
      );
      children = this.props.pre ? (
        <pre>{children}</pre>
      ) : (
        children
      );
    }
    else {
      children = (<div>&nbsp;</div>);
    }
    return (
      <React.Fragment>
        {children}
      </React.Fragment>
    );
  }
}

export class Figure extends React.Component {
  static contextType = DocumentContext;

  render() {
    const ctx = this.context;
    const figure = ctx.figure.list[this.props.id];
    const params = figure[2][this.props.var === undefined ? 0 : this.props.var];
    if (figure === undefined || params === undefined) {
      return null;
    }
    const computeFigcaption = function() {
      const lv = ctx.level + 1;
      const indexes = ctx.indexes.slice(1, lv);
      let index = indexes.join(".");
      if (ctx.figure.indexes[index] === undefined) {
        ctx.figure.indexes[index] = 1;
      }
      else {
        ctx.figure.indexes[index]++;
      }
      index += "." + ctx.figure.indexes[index];
      return (
        <React.Fragment>
            <b>Figure</b> {index}: &nbsp;
            <i>{figure[0]}</i>
        </React.Fragment>
      );
    };
    const figcaption = computeFigcaption();
    const wrapperStyle = {
      position: "relative",
      left: params[2] + "px",
      width: params[3] + "px"
    };
    const containerStyle = params[4] === null ? {} : {
      overflowX: "scroll",
      overflowY: "hidden",
      width: "100%",
      height: "100%",
    };
    let imgScaleStyle = {
      width: params[0] + "px"
    };

    // Enlarge to fix bug image is not centered
    if (params[0] < params[3]) {
      imgScaleStyle.width = params[3] + "px";
      imgScaleStyle.textAlign = "center";
    }

    const captionStyle = {
      textAlign: "center",
      width: "100%"
    };

    return (
      <div style={wrapperStyle}>
          <div style={containerStyle}>
              <div style={imgScaleStyle}>
                  <img
                      alt=""
                      border="0"
                      data-original-height={params[1]}
                      data-original-width={params[0]}
                      height={params[1]}
                      width={params[0]}
                      src={figure[1]}
                  />
              </div>
          </div>
          <div style={captionStyle}>{figcaption}</div>
      </div>
    );
  }
}

