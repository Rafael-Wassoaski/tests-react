import React from 'react';
import {fireEvent, getByLabelText, getByTestId, getByText, render, screen} from '@testing-library/react';

import App, {calcularNovoSaldo} from './app';

describe('Componente principal', () => {
  describe('Quando eu abro o app do banco', () => {
    test('o nome é exibido', () => {
      render(<App />);
  
      expect(screen.getByText('ByteBank')).toBeInTheDocument();
    })
    it('o saldo é exibido', () => {
      render(<App />);
    
      expect(screen.getByText('Saldo:')).toBeInTheDocument();
    })
    it('o botão de realizar transação é exibido', () => {
      render(<App />);
  
      expect(screen.getByText('Realizar operação')).toBeInTheDocument();
    })
  });

  describe('Quando realizo uma ação com o saldo', ()=>{
    it('como sacar dinheiro', ()=>{
      const valores={
        transacao: 'saque',
        valor: 80
      }

      const novoValor = calcularNovoSaldo(valores, 120);

      expect(novoValor).toBe(40);
    });

    it('como depositar dinheiro', ()=>{
      const valores = {
        transacao: 'deposito',
        valor: 50
      };

      const novoValor = calcularNovoSaldo(valores, 60);

      expect(novoValor).toBe(110);
    });

    it('como tentar sacar um valor que eu não tenho', ()=>{
      const valores = {
        transacao: 'deposito',
        valor: 50
      };

      const novoValor = calcularNovoSaldo(valores, 10);

      expect(novoValor).toBe(novoValor);
    });

    it('a transação de saque deve ser realizada', ()=>{
      render(<App/>);

      const saldo = screen.getByText('R$ 1000');
      const trasacao = screen.getByLabelText('Saque');
      const valor = screen.getByTestId('valor');
      const botaoTransacao = screen.getByText('Realizar operação');

      expect(saldo.textContent).toBe('R$ 1000');

      fireEvent.click(trasacao, {target: {value: 'saque'}});
      fireEvent.change(valor, {target: {value: 100}});
      fireEvent.click(botaoTransacao, {});

      expect(saldo.textContent).toBe('R$ 900');
    });

    it('a transação de saque com valor maior do que possuo não deve ser realizada', ()=>{
      render(<App/>);

      const saldo = screen.getByText('R$ 1000');
      const trasacao = screen.getByLabelText('Saque');
      const valor = screen.getByTestId('valor');
      const botaoTransacao = screen.getByText('Realizar operação');

      expect(saldo.textContent).toBe('R$ 1000');

      fireEvent.click(trasacao, {target: {value: 'saque'}});
      fireEvent.change(valor, {target: {value: 1100}});
      fireEvent.click(botaoTransacao, {});

      expect(saldo.textContent).toBe('R$ 1000');
    });
  });


})

