import {fireEvent, render, screen} from "@testing-library/react";
import Conta from "./Conta";
import React from "react";

const realizaTransacao = (valores) => {
    return valores
}

describe('Componente de conta', () => {
    it('Snaphot do componente deve permanecer sempre o mesmo', () => {
        const {container} = render(<Conta saldo={500} realizarTransacao={realizaTransacao}/>)

        expect(container.firstChild).toMatchSnapshot();
    });

    it('Exibir saldo da conta como valor monetário', () => {
        render(<Conta saldo={1000} realizarTransacao={realizaTransacao()}/>);
        const saldo = screen.getByTestId('saldo-conta');
        expect(saldo.textContent).toBe('R$ 1000');
    });

    it('Chama a funcao de realizar transacao quano botão é clicado', ()=>{
        const funcaoRealizarTransacao = jest.fn()
        render(<Conta saldo = {1000} realizarTransacao={funcaoRealizarTransacao}/> );
        fireEvent.click(screen.getByText('Realizar operação'));

        expect(funcaoRealizarTransacao).toHaveBeenCalled();
    })
})