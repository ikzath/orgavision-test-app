import SearchInfo from "../components/SearchInfo";
import React from "react";
import { cleanup, waitFor, getByTestId, render } from "@testing-library/react";
import axiosMock from "axios";
jest.mock('axios');

afterEach(cleanup);

it('fetches and displays an element property', async ()=> {
    const { getByTestId } = render(<SearchInfo />);
    expect(getByTestId('loading')).toHaveProperty('title');

});


it('fetches and displays async data', async ()=> {

    const { getByTestId } = render(<SearchInfo />);

    axiosMock.get.mockResolvedValueOnce({
        data: { greeting: 'Hello World'}
    });

    const resolvedData = await waitFor(()=> 
    getByTestId('loading'));

    expect(resolvedData).toHaveTextContent('Hello there');
    expect(axiosMock.get).toHaveBeenCalledTimes(1);
});