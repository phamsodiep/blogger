import React from 'react';



export function C(props) {
  const style = {
    fontFamily: "'Courier New', 'Courier', 'monospace'",
    fontSize: 14
  }

  let lines = props.children.split("\n");
  let divs = [];
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    //line = line.split(" ").join("\xa0");
    line = line.replace(/ /g, '\xa0');
    divs[divs.length] = (
      <div style={style}>
        {line}
      </div>

    );
  }
  return (
    <React.Fragment>
        {divs}
    </React.Fragment>
  );
}

