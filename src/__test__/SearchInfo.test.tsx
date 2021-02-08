import SearchInfo from "../components/SearchInfo";
import React from "react";
import * as ReactDOM from "react-dom";
import { fireEvent, render } from "@testing-library/react";
import renderer from "react-test-renderer";


describe('SearchInfo component tests', ()=> {
    let container: HTMLDivElement;

    beforeEach(()=> {
        container = document.createElement('div');
        document.body.appendChild(container)
        ReactDOM.render(<SearchInfo />, container)
    })

    afterEach(()=> {
        document.body.removeChild(container)
        container.remove();
    })

    it('renders initial document correctly', ()=> {
        const inputs = container.querySelectorAll('input');
        expect(inputs).toHaveLength(1);
        expect(inputs[0].placeholder).toBe('Suchen...')
    })

    it('it passes credentials correctly',()=> {
        const inputs = container.querySelectorAll('input');
        const onChangrInput = inputs[0];
        fireEvent.change(onChangrInput, { target: { value:'something'}});
    })
})

    it('it matches snapshot', ()=> {
        const tree = renderer.create(<SearchInfo/>).toJSON();
        expect(tree).toMatchSnapshot();
    })



