import {render} from "@testing-library/react";
import React from "react";
import Transacao from "./Transacao";

describe('Componente de transacao do extrato', () => {
    it('Snaphot do componente deve permanecer sempre o mesmo', () => {
        const {container} = render(<Transacao data={'08/09/2021'} tipo={'saque'} valor={'20'}/>);

        expect(container.firstChild).toMatchSnapshot()
    })
})