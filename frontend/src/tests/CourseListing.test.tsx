import '@testing-library/jest-dom'
import { fireEvent } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { Container, render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import CourseListing from '../CourseListing/CourseListing'

let container: any = null

const mockfn = jest.fn()
const courseListing = <CourseListing setRenderWin={mockfn} setCourseList={mockfn} courseList={[]}/>

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


describe(CourseListing, () => {
    it('loads defaults', () => {
        
        act(() => {
            render(courseListing, container)
        })
        const selCourse: Element | null = document.getElementById('SelCourses')
        //check that the only child is the course list
        expect(selCourse?.childElementCount).toBe(1)
        expect(selCourse?.firstElementChild?.id).toBe('CourseListButtons')

        //button list is empty
        const courseButtons: Element | null = document.getElementById('CourseListButtons')
        expect(courseButtons?.childElementCount).toBe(0)
    })

    it('input takes input and clears', () => {
        //mount component on DOM
        act(() => {
            render(courseListing, container)
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

    it('adds button to list', () => {
        const mockfn = jest.fn()
        act(() => {
            render(courseListing, container)
        })

        //find input element
        const input: Element | null = document.getElementById('searchClasses')
        if (input == null) {
            throw new Error('input Element is null')
        }

        //add 1 button
        act(() => {
            userEvent.type(input, 'cis4301')
            expect(input).toHaveValue('cis4301')
            userEvent.type(input, "{enter}")
            expect(input).toHaveValue('')
        })

        //button list increments by 1
        const courseButtons: Element | null = document.getElementById('CourseListButtons')
        expect(courseButtons?.childElementCount).toBe(1)
        const listElement: Element | null | undefined = courseButtons?.firstElementChild
        expect(listElement?.textContent).toContain('cis4301')

    })

    it('adds and removes button from list', () => {
        const mockfn = jest.fn()
        act(() => {
            render(courseListing, container)
        })
        const selCourse: Element | null = document.getElementById('SelCourses')

        //find input element
        const input: Element | null = document.getElementById('searchClasses')
        if (input == null) {
            throw new Error('input Element is null')
        }

        //add 1 button
        act(() => {
            userEvent.type(input, 'cis4301')
            expect(input).toHaveValue('cis4301')
            userEvent.type(input, "{enter}")
            expect(input).toHaveValue('')
        })

        const courseButtons: Element | null = document.getElementById('CourseListButtons')
        const button: Element | null | undefined = courseButtons?.firstElementChild?.firstElementChild?.firstElementChild


        act(() => {
            button?.dispatchEvent(new MouseEvent('click', {bubbles:true}))
        })

        expect(courseButtons?.childElementCount).toBe(0)
    })
})