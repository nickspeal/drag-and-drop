## Timing Plan

15 min spec/definition
30 min prototype proof of concept validate
15 min refactor to be robust code
15 min tests
45 min next feature: accessibility
30 min styles and presentability
30 min buffer
--
3 hr

## Real Timing

9 spec start
9:15 spec Done
10 - perma-drag proof of concept done
10:40 - got actual drag and drop working


## Spec

Requirements: https://docs.google.com/document/d/e/2PACX-1vRQFoYQxGCG4NuIyEaOGqe9hGsFB89RXL8K74T3UDKwNyzAG9R2igzMgN_cOD1OuevKzM-5rdaKESqD/pub

### initial Dragdrop functionality

Column of constant number of divs
parent Column component renders each of the child Row components
Column state has a dragging property, stores which Row is being dragged if any
If not dragging, position all divs with flexbox
If dragging, position the dragging component with absolute positioning (relative to Column parent)
Column pass Style prop through Row to Div with a `top` property from state that is updated on mouse move.
If dragging, need to render a spacer div between the other Rows to indicate where the dragging Row would drop.
As implemented in desmos calculator: when the top of the dragging div crosses halfway above another row, the spacer moves up and the row moves down


### Additional considerations

Add new div is just a plus button

Write a readme!

How to test

Accessibility
  How to prompt with insructions
  How to read out audible words

styles
  blue border on select

Maybe fun
    Integrate an actual graph with the Desmos API
    spring-mass-damper drag mechanics

Deployment
  Write and validate instructions to run locally on a new machine
  Deploy with github pages
  Alternative consideration: Deploy with JSBin or something so that we can edit it in real time during code review.
    Downsides:
      No git
      Annoying to use React, which gives me duplicatable components in an easy way and a state/props model I'm familiar with


# Click to select functionality
  On click, a row needs to pop out of the static list
  State should store `items`: just a list of strings for all the rows
  When dragging, we should remove the relevant string from the `items` and set it to `draggedItem`
  In render,
    if no draggedItem, then just render items
    If draggedItem, then render a Row for each item, plus a placeholder, plus an absolutely positioned item
  On mouseup, move the draggedItem into items state


# TODOs
    More sensible Key for rows to avoid rerendering while allowing duplicate text content
    <Row> is rendered similarly 3 different times
