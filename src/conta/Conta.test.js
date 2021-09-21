import {render} from "@testing-library/react";
import Conta from "./Conta";
import React from "react";

const realizaTransacao = (valores)=>{
    return valores
}

describe('Componente de conta', ()=>{
    it('Snaphot do componente deve permanecer sempre o mesmo', ()=>{
        const {container} = render(<Conta saldo={500} realizarTransacao={realizaTransacao}/>)

        expect(container.firstChild).toMatchSnapshot();
    })
})