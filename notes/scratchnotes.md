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

# Data input functionality
  Option:
    Row renders an <input>
    value is passed passed in from props
    onChange, call parent onChange
    Column replaces the item in the items state with the new value

  Option:
    Column doesn't need to know about the text value, except to be able to render the Row with floating props or not

    Change the items => Row mapping
    state.items could store an array of components
    state.draggedItem could change the props when moving in and out of the array
    Warning: need to preserve state when cloning a component?

  New strategy
    Rows should handle their own mouse events. This solves the problems of:
      listening to events on the whole window
      identifying cleanly which row is clicked
      encapsulating code
      PRIMARY: Not creating a new component when one is dragged. Only its css should change to move it somewhere. That way it can maintain its state.
    Rows get their own onMouseDown/Up methods
    Rows control their own css. Can position themselves absolutely
    Parent needs to know mousedown/up state so that it can render a spacer

    onmousedown, row calls parent function with its ID
    parent sends down an isDragging prop so the row knows how to render itself (floating or not)
    parent also renders a spacer
    onMouseup, row calls parent and parent state updates and propagates

  Problem with this new implementation:
    I can't render a Row once and save it in state, beacuse then it doesnt get updated
    Instead I need to render the Row only in Render
    What stays in state? Perhaps a sorted array of itemIds? Sorted by user-specified order
    ie: items: [1, 4, 3, 2]
    Is passing the key enough to prevent losing child state?
    Why am I doing all this? is it better to just store the values in parent state as I had before?
      Don't like that because updating that whole list on every key feels somehow awkward
      Do like it because the parent should have access to all the data to pass to the graph
      Gunna try it.
      Just need to sort out better keys. Items could be a list of {id, value} objects. IDs are unique for keys.

# TODOs
    More sensible Key for rows to avoid rerendering while allowing duplicate text content
    <Row> is rendered similarly 3 different times


# Cleanup notes
