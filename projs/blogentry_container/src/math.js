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

// https://en.wikipedia.org/wiki/Mathematical_operators_and_symbols_in_Unicode
// x is odd ⟶ x mod 2 != 0
// U & interset ⋃ & ⋂         ∖ reject
// belong | not belong  ->    ∈	/ ∉
// epsilon: ε
export function M(props) {
  const style = {
    fontFamily: "'Courier New', 'Courier', 'monospace'",
    fontSize: 14
  }
  return (
    <span style={style}>
      {props.children}
    </span>
  );
}

