import React, { ReactElement } from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import { Function1, Function2 } from "./functions";

let container: any = null;
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


//Test Function 1
it("removes each vowel", () => {
    act(() => {
        render(<Function1 str={'beauty oil'}/>, container)
    })
    expect(container.textContent).toBe('bty l')
})

it("removes vowels when duplicates", () => {
    act(() => {
        render(<Function1 str={'carpenter apple'}/>, container)
    })
    expect(container.textContent).toBe('crpntr ppl')
})

it("leaves capital vowels", () => {
    act(() => {
        render(<Function1 str={'AugoEides'}/>, container)
    })
    expect(container.textContent).toBe('AgEds')
})

it("only vowels", () => {
    act(() => {
        render(<Function1 str={'aiueo'}/>, container)
    })
    expect(container.textContent).toBe('')
})

it("empty string", () => {
    act(() => {
        render(<Function1 str={''}/>, container)
    })
    expect(container.textContent).toBe('')
})



//Test Function 2
it("multiplies 1x1", () => {
    act(() => {
        render(<Function2 num1={1} num2={1}/>, container)
    })
    expect(container.textContent).toBe('1')
})

it("multiplies 2x5", () => {
    act(() => {
        render(<Function2 num1={2} num2={5}/>, container)
    })
    expect(container.textContent).toBe('10')
})

it("multiplies 0x0", () => {
    act(() => {
        render(<Function2 num1={0} num2={0}/>, container)
    })
    expect(container.textContent).toBe('0')
})

it("big num", () => {
    act(() => {
        render(<Function2 num1={1000000000} num2={1000000000}/>, container)
    })
    expect(container.textContent).toBe('1000000000000000000')
})

it("handles non-int nums", () => {
    expect(() => render(<Function2 num1={0.1} num2={0.2}/>, container))
        .toThrow()
})