import React from 'react';
import { render, screen } from '@testing-library/react';

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

  describe('Quando realizo uma ação com o salvo', ()=>{
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
    })
  })
})

