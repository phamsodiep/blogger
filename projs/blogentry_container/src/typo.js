import React, { useContext } from 'react';


export const IndexContext = React.createContext({});

function computeHeaderString(ctx, headerText, format) {
  const createElement = function (txt) {
    return (!['b', 'i', 'u'].includes(format)) ? txt :
      React.createElement(
        format,
        null,
        txt
      );
  }
  if (ctx === null) {
    return createElement(headerText);
  }
  let indexes = ctx.indexes.slice(1, ctx.level + 1);
  return createElement(indexes.join(".") + ". " + headerText);
}

export function def(children, src, tooltip) {
  const isLocal = typeof src === "string" && src.startsWith("#");
  const style = {
    color: "inherit"
  };
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
        style={style}
      >
        {txt}{suffix}
      </a>
    );
  }
}

export function U(props) {
  const ctx = useContext(IndexContext);
  let headerElement = null;
  const headerTag = props.tag === undefined ? "div" : props.tag;
  const headerText = props.h;
  const createHeaderElement = function (context) {
    if (typeof headerText !== "string" || headerText === "") {
      return null;
    }
    const lv = ctx.level;
    const sepLv = 3 - lv >= 0 ? 3 - lv : 0;
    const isSep = ctx.indexes[lv] > 1 && props.s !== true;
    const className = isSep ? "para_sep" + sepLv : null;
    const content = React.createElement(
      headerTag,
      null,
      computeHeaderString(context, headerText, props.f)
    );
    return typeof className === "string" ?
      (
        <div className={className}>
          {content}
        </div>
      ) :
      content
  }
  
  ctx.level++;
  function ReleaseContext() {
    ctx.level--;
    return null;
  }

  if (props.h !== undefined) {
    ctx.indexes[ctx.level] =
      ctx.indexes[ctx.level] === undefined ? 1 : ctx.indexes[ctx.level] + 1;
    headerElement = createHeaderElement(ctx);
  }
  else {
    headerElement = createHeaderElement(null);
  }
  let subClass = "para_sep0";
  let subType = props.sub === undefined ? "" : props.sub;
  let children = [];
  let innerElement = props.children;

  if (innerElement !== undefined) {
    let n = innerElement.length;

    switch(subType) {
      case 'b':
        // @TODO: deaper level
        subClass = "lindent0a";
        break;

      case 't':
        subClass = "lindent00";
        break;

      case 's':
      default:
        break;
    }

    if (typeof n === "number") {
      for (let i = 0; i < n; i++) {
        let e = innerElement[i];
        if (e.type === S) {
          if (
            (subClass.startsWith("para_sep") && i === 0)
            || e.props.w === true
          ) {
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
      }
    }
    else {
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
    }
  }

  return (
    <React.Fragment>
      {headerElement}
      {children}
      <ReleaseContext />
    </React.Fragment>
  );
}

export function S(props) {
  let innerElement = props.children;
  let children = null;
  if (innerElement !== undefined) {
    /*if (innerElement.type === U) {
      //alert('OK');
    }*/
    children = innerElement;
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

