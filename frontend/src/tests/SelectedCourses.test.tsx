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
        expect(document.getElementById)
    })
})