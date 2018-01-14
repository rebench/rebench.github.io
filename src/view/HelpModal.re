open! Vrroom.Helpers;
module Styles = HelpModalStyles;

let content = {|
<p>
  <span class="brand">re:bench</span> is a benchmark playground primarily targeting Reason, but also supporting OCaml and JavaScript and comparison
  between test cases written in different languages.

<p>
  A <em>test</em> is a unit of code that will be measured while executed repeatedly. Anything you do not want to measure should be
  put in the <em>setup</em> block. Furthermore, setup code is toplevel, can include type and module defintions, and anything defined
  there will be available in every test. The tests on the other hand are isolated by being wrapped in a function.

<p>
  Change the <em>language</em> of a test by clicking on the langauge button in the top left of the test block, then select the desired
  language in the dropdown.

<p>
  Click the <em>output</em> button in the top right of the test block to see the generated javascript. Looking at this might make
  it easier to understand the perfomance characteristics of the code, as well as the test itself. The <code>__test__</code> function
  is the function that will be measured. Anything outside it will not be taken into account, unless it's used inside the
  <code>__test__</code> function.

<p>
  Click the <em>Add</em> button on the top toolbar to add a new test, and <em>Clear</em> to reset everything to scratch, or
  click <em>Remove</em> on an individual test to remove only that.

<p>
  <em>Run All</em> will run all the tests in sequence. Click the <em>Run</em> button on an individual test to run only that.
  By running tests individually you can run them in parallell, but make sure you have enough idle cores or the tests results
  will be negatively affected.

<p>
  Clicke the <em>Share</em> button to copy a shareable URL to the clipboard.

<p>
  That's about it. If you come across a bug, or something you don't understand, please let me know by
  <a href="https://github.com/rebench/rebench.github.io/issues/new">creating an issue</a>. Happy testing! :)

|};

let component = ReasonReact.statelessComponent("HelpPopup");
let make = (~onClose, _:array(unit)) => {
  ...component,
  render: _self =>
    <WidthContainer>
      <div className=(Styles.container |> TypedGlamor.toString)>
        <header>
          <h1>
            {"Help" |> text}
          </h1>
          <Button icon="close" label="" onClick=onClose/>
        </header>
        <main dangerouslySetInnerHTML={ "__html": content} />
      </div>
    </WidthContainer>
};
