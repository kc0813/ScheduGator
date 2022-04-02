import '@testing-library/jest-dom'
import { fireEvent } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { Container, render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import SelectedCourses from "../CourseListing/SelectedCourses";

let container: any = null


beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
  });
  
  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });


describe(SelectedCourses, () => {
    it('loads defaults', () => {
        act(() => {
            render(<SelectedCourses/>, container)
        })
        const selCourse: Element | null = document.getElementById('SelCourses')
        //check that the only child is the search bar
        expect(selCourse?.childElementCount).toBe(1)
        expect(selCourse?.firstElementChild?.className).toBe('inputBar')
    })

    it('input takes input and clears', () => {
      //mount component on DOM
      act(() => {
          render(<SelectedCourses/>, container)
      })
      //find input element
      const input: Element | null = document.getElementById('searchClasses')
      if (input == null) {
        throw new Error('input Element is null')
      }

      //add test to input field
      act(() => {
        userEvent.type(input, 'cis')
      });
      expect(input).toHaveValue('cis')
      
      //add more text
      act(() => {
        userEvent.type(input, '4301')
      });
      expect(input).toHaveValue('cis4301')

      //test enter keystroke to submit input
      //and clear input field
      act(() => {
        fireEvent.submit(input)
      });
      expect(input.textContent).toBe('')
  })
})