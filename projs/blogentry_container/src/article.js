import React from 'react';
import { IndexContext, def, U, S } from './typo.js';
import { M } from './math.js';


const RefWikiFormalLanguage = def(
  "https://en.wikipedia.org/wiki/Formal_language",
  "https://en.wikipedia.org/wiki/Formal_language",
  "Formal language"
);

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

const Set = def(
  "set",
  "https://en.wikipedia.org/wiki/Set_(mathematics)",
  null
);

const Automaton = def(
  "automaton",
  "https://en.wikipedia.org/wiki/Automata_theory",
  null
);

const FormalGrammar = def(
  "formal grammar",
  "https://en.wikipedia.org/wiki/Formal_grammar",
  [
    "It describes how to form strings from a language's alphabet\n",
    "that are valid according to the language's syntax."
  ].join("")
);

const RegularExpression = def(
  "regular expression",
  "https://en.wikipedia.org/wiki/Regular_expression",
  "It is a sequence of characters that define a search pattern."
);

const DecisionProblem = def(
  "decision problem",
  "https://en.wikipedia.org/wiki/Decision_problem",
  [
    "Procedure to make decision for a problem that can be posed\n",
    "as a yes-no question of the input values."
  ].join("")
);

const Word = def("word", "#Word", null);
const Alphabet = def("alphabet", "#Alphabet", null);
const Letter = def("letter", "#Letter", null);
const String = def("string", "#String", null);

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
        <S><dfn>Thinking function</dfn>: language is used to express programmer's
        algorithm. Most of contemporary programmers express their algorithm
        directly in <ProgrammingLanguage /> instead of <Flowchart /> or <Uml />.
        (<i>It is noted that <Uml /> is also a kind of language too</i>).</S>

        <S><dfn>Communication function</dfn>: Programmer writes
        a <Program /> in <ProgrammingLanguage />, then by somehow computer will
        read the <Program /> written in <ProgrammingLanguage /> for execution.
        </S>
    </U></S>

    <S>In <ComputerScience /> scope, there is <ProgrammingLanguage /> which is
    used to communicate between human being and computer. Programmers should
    "talk" in a kind of language that computer could "understand". To make
    thing simpler, because computer hardware is designed based on theories
    of <DiscreteMathematics />, <DigitalElectronics />, <ComputerScience />,
    the language is used should be in a special kind that these theories
    could solve to "understand". The <FormalLanguage /> that we are going to
    examine in the following sections is a good candidate for that purpose.</S>
</U>


<U h="Formal language" tag="h2">
    <S><U h="Examples" f="b">
        <S><NaturalLanguage /> composed by words, phrases, paragraphs...
        whereas <FormalLanguage /> is simpler, it composed by <Word s/> and
        the <Word s/> is composed by <Alphabet s/>.</S>
        <S>For example, <FormalLanguage /> expresses natural numbers,
        well-formed additions, and well-formed addition equalities
        has <Alphabet s/>:&nbsp;
        <M>Σ = &#123;0, 1, 2, 3, 4, 5, 6, 7, 8, 9 +, =&#125;</M>.
        Some example of <Word s/> are:</S>
        <S><U sub="b">
            <S><M>0</M></S>
            <S><M>123</M></S>
            <S><M>23+4</M></S>
            <S><M>23+4=555</M></S>
        </U></S>
        <S><Word u/> <M>=638="</M> or <M>003</M> is not expressed
        by that language, <Word /> is composed from <Alphabet /> is governed
        by some rules, not all <Word s/> concatenated by <Alphabet s/> is
        belonged to the language. Natural numbers, additions and addition
        equalities are called as <Word s/> in <FormalLanguage />.</S>
    </U></S>

    <S><U h="Concepts" tag="div" f="b">
        <S><section id="Alphabet">
            <div><b>Alphabet</b></div>
            <div>
                <dfn>Alphabet</dfn> is a <Set /> of <Letter s /> It could be a
                finite or infinite <Set /> (Finite <Set /> is more common).
            </div>
        </section></S>
        <S><section id="Letter">
            <div><b>Letter</b></div>
            <div>
                A <dfn>letter</dfn> is a member of <Alphabet />.
            </div>
        </section></S>
        <S><section>
            <div><b>Words over an alphabet</b></div>
            <div>
                A <dfn>word over an alphabet</dfn> can be any finite sequence
                (i.e., string) of <Letter s />. Given <M>Σ</M> is
                an <Alphabet />, <M>Σ</M><sup>*</sup> denotes <Set /> of all
                words over an alphabet <M>Σ</M>.
            </div>
        </section></S>
        <S><section id="String">
            <div><b>String</b></div>
            <div>
                A <dfn>string</dfn> is a finite sequence of <Letter s />
                expresses <Word />.
            </div>
        </section></S>
        <S><section>
            <div><b>Formal Language</b></div>
            <div>
                A <dfn>formal language</dfn> <M>L</M> over an
                alphabet <M>Σ</M> is a subset
                of <M>Σ</M><sup>*</sup>. In <ComputerScience /> and
                mathematics, formal language's shorthand is <dfn>language</dfn>.
            </div>
        </section></S>
        <S><section id="Word">
            <div><b>Word</b></div>
            <div>
                Given <i>language</i> <M>L</M>, <dfn>word</dfn> is a
                member of <Set /> <M>L</M>.
            </div>
        </section></S>
    </U></S>

    <S><U h="Language definition" tag="div" f="b">
        <S>Language definition is method used to define <Set /> <M>L</M>.
        Mathematics <Set /> definition could be applied, but it is not
        sufficient because of the complex nature of <M>Σ</M><sup>*</sup>.
        There are some addition methods:</S>
        <S><U sub="b">
            <S><dfn><Automaton u /></dfn>: if a <String /> composed by sequence
            of <Letter s/> that the sequence is accepted by <Automaton />,
            the words over an alphabet is expressed by that <String /> is
            a <Word />, this means that it is belongs to the language.
            <Automaton u /> is applied to define the language.</S>

            <S><dfn>Grammar</dfn>: if <FormalGrammar /> could generated
            a <String />, that <String /> is belonged to the
            language. <FormalGrammar u /> is applied to define the language.</S>

            <S><dfn><RegularExpression u/></dfn>: if a <String /> could be
            matched by <RegularExpression />, that <String /> is belonged to
            the language. <RegularExpression u /> is applied to define the
            language.</S>

            <S><dfn><DecisionProblem u/></dfn>: if a <String /> could be
            made with decision 'yes' by <DecisionProblem />, that <String /> is
            belonged to the language. <DecisionProblem u /> is applied to
            define the language.</S>

        </U></S>
    </U></S>
</U>


<U h="References" tag="h2">
    <S><U sub="b">
        <S><RefWikiFormalLanguage /></S>
    </U></S>
</U>


</IndexContext.Provider>
);


//https://github.com/phamsodiep/blogger/blob/master/huyj2ee/cs-formal-language.htm
//0.0.1
/*
            Scrum is an agile framework for developing, delivering, and
            sustaining complex products. It is designed for teams of ten or
            fewer members, who break their work into goals that can be
            completed within timeboxed iterations. The Scrum Team track
            progress in 15-minute time-boxed daily meetings. At the end of
            a iteration, the team holds review and retrospective to
            continuously improve.
            <br />
            <b>Audience</b>: software engineer
            - <b>Topic</b>: project management framework
*/

