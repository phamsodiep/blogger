import React from 'react';
import { IndexContext, def, U, S } from './typo.js';
import * as Mat from './math.js';


const Lenin = def(
  "Vladimir Lenin",
  "https://en.wikipedia.org/wiki/Vladimir_Lenin",
  "Владимир Ильич Ленин"
);

const NaturalLanguage = def(
  "Natural language",
  "https://en.wikipedia.org/wiki/Natural_language",
  null
);

const ProgrammingLanguage = def(
  "programming language",
  "https://en.wikipedia.org/wiki/Programming_language",
  "a special kind of language used to\ndescrible computer program"
);

const Flowchart = def(
  "flowchart",
  "https://en.wikipedia.org/wiki/Flowchart",
  null,
);

const Uml = def(
  "UML",
  "https://en.wikipedia.org/wiki/Unified_Modeling_Language",
  null
);

const Program = def(
  "program",
  "https://en.wikipedia.org/wiki/Computer_program",
  null
);

const DiscreteMathematics = def(
  "discrete mathematics",
  "https://en.wikipedia.org/wiki/Discrete_mathematics",
  null
)

const DigitalElectronics = def(
  "digital electronics",
  "https://en.wikipedia.org/wiki/Digital_electronics",
  null
)

const ComputerScience = def(
  "computer science",
  "https://en.wikipedia.org/wiki/Computer_science",
  null
);

const FormalLanguage = def(
  "formal language",
  "https://en.wikipedia.org/wiki/Formal_language",
  null
);

const Word = def(
  "word",
  "#",
  null
);

const Alphabet = def(
  "alphabet",
  "#",
  null
);

export const ctx = {
  indexes: [],
  level: 0
};
export const ARTICLE = (
<IndexContext.Provider value={ctx}>
<U h="Introduction" tag="h2">
    <S><Lenin /> claims that language is a material form of our thinking. It is
    not only method of human communication but also thinking.
    In <ComputerScience /> context, language plays two functions:</S>

    <S><U sub="b">
        <S><i>Thinking function</i>: language is used to express programmer's
        algorithm. Most of contemporary programmers express their algorithm
        directly in <ProgrammingLanguage /> instead of <Flowchart /> or <Uml />.
        (<i>It is noted that <Uml /> is also a kind of language too</i>).</S>

        <S><i>Communication function</i>: Programmer writes
        a <Program /> in <ProgrammingLanguage />, then by somehow computer will
        read the <Program /> written in <ProgrammingLanguage /> for execution.
        </S>
    </U></S>

    <S>In <ComputerScience /> scope, there is <ProgrammingLanguage /> which is
    used to communicate between human being and computer. Programmers should
    "talk" in a kind of language that computer could "understand". To make
    thing simpler, because computer hardware is designed based on theories
    of <DiscreteMathematics />, <DigitalElectronics />, <ComputerScience />,
    the language is processed should be in a special kind that these theories
    could solve to "understand". The <FormalLanguage /> that we are going to
    learn in the following sections is a good candidate for that purpose.</S>

    <S/>
</U>
<U h="Formal language" tag="h2">
    <S><U h="Examples" f="b">
        <S><NaturalLanguage /> composed by words, phrases, paragraphs...
        whereas <FormalLanguage /> is simpler, it composed by <Word s/> and
        the <Word s/> is composed by <Alphabet s/>.</S>
        <S>For example, <FormalLanguage /> expresses natural numbers,
        well-formed additions, and well-formed addition equalities
        has <Alphabet s/>:&nbsp;
        {Mat.set("Σ", ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "="])}.
        Some example of <Word s/> are:</S>
        <S><U sub="b">
            <S>{Mat.num(0)}</S>
            <S>{Mat.num(123)}</S>
            <S>{Mat.num("23+4")}</S>
            <S>{Mat.num("23+4=555")}</S>
        </U></S>
        <S><Word u/> {Mat.num("=638=")} or {Mat.num("003")} is not expressed
        by that language, <Word /> is composed from <Alphabet /> is governed
        by some rules, not all <Word s/> concatenated by <Alphabet s/> is
        belonged to the language. Natural numbers, additions and addition
        equalities are called as <Word /> in <FormalLanguage />.</S>
    </U></S>

    <S><U h="Concepts" tag="div" f="b">
        <S>WREREW sfwr</S>
    </U></S>

    <S>In <ComputerScience /> scope, there is <ProgrammingLanguage /> which is
    used to communicate between human being and computer. Programmers should
    "talk" in a kind of language that computer could "understand". To make
    thing simpler, Because computer hardware is designed based on theories
    of <DiscreteMathematics />, <DigitalElectronics />, <ComputerScience />,
    the language is processed should be in a special kind that these theories
    could solve to "understand". The <FormalLanguage /> that we are going to
    learn in the following sections is a good candidate for that purpose.</S>
</U>
</IndexContext.Provider>
);

