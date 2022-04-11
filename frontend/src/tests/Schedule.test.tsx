import '@testing-library/jest-dom'
import { fireEvent } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { Container, render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Schedule from '../Schedule/Schedule'

let container: any = null

const mockfn = jest.fn()

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