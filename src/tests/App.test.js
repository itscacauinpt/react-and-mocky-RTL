import { render, screen } from '@testing-library/react';
import App from '../App';
import mockAPI from './mocks';
import userEvent from '@testing-library/user-event';

describe('Test Rick & Morty API', () => {

  beforeEach(()=>{
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockAPI)
    })
    // global.fetch.mockResolvedValue(responseAPI);    
    render(<App/>)
  })
  
  test('Verifica se aparece o card com titulo de "Rick Sanchez"', async () => {
    const titleEl = await screen.findByRole('heading', {name: /rick sanchez/i});
    
    expect(titleEl).toBeInTheDocument();
  })

  test('Verifica se existem o input de texto e o botão "Buscar"', () => {
    const inputEl = screen.getByRole('textbox');
    const buttonEl = screen.getByRole('button', {name: /buscar/i})

    expect(inputEl && buttonEl).toBeInTheDocument();
  })

  test('Verifica se ao buscar por "Smith" aparecem 4 cards', () => {
    const inputEl = screen.getByRole('textbox')
    const buttonEl = screen.getByRole('button', {name: /buscar/i})

    userEvent.type(inputEl, 'smith');
    userEvent.click(buttonEl);

    const cards = screen.getAllByRole('article')

    expect(cards.length).toBe(4);
  })

})
