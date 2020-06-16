import React from 'react';


export function set(name, list) {
  const style = {
    fontFamily: "'Courier New', 'Courier', 'monospace'",
    fontSize: 14
  }
  return (
    <span style={style}>
      {name + " = {" + list.join(", ") + "}"}
    </span>
  );
}

export function num(txt) {
  const style = {
    fontFamily: "'Courier New', 'Courier', 'monospace'",
    fontSize: 14
  }
  return (
    <span style={style}>
      {txt}
    </span>
  );
}

