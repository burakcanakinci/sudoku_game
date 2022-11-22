### Guide:
- select cell
- select a value from the pad
  -- if candidate move is selected
    - get candidate values container of selected cell
    - get candidate values (if any), assign candidate values to a data structure that can easily toggle values (add / remove on repeated)
    - process candidate values ( add / remove )
    - assign values back to selected cell candidate values container
  -- if candidate move is not selected
    - assign value to cell

--------------------------------------------------------------

    - select a cell,
    - then click a number in the pad
    - then get the stored values from the span that is in the cell
    - parse that to a set
    - check if set has the value you pressed
    - if it has it set.delete(value)
    - if it doesn't set.add(value)
    - assign set values as string back to the span