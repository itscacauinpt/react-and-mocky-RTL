import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import responseAPI  from './mocks';

describe('Test Rick & Morty API', () => {

  beforeEach(()=>{
    //Fazer o mock do fetch aqui
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(responseAPI)
    })

    render(<App/>)
  })

  test('Verifica se aparece o card com titulo de "Rick Sanchez"', async() => {
    const titleEl = await screen.findByRole('heading', {name: /Rick Sanchez/i})
    expect(titleEl).toBeInTheDocument()

  })

  test('Verifica se existem o input de texto e o botão "Buscar"', () => {
    const inputEl = screen.getByRole('textbox')
    const buttonEl = screen.getByRole('button', {name: /buscar/i})
    expect(inputEl && buttonEl).toBeInTheDocument()

  })

  test('Verifica se ao buscar por "Smith" aparecem 4 cards', () => {
    const inputEl = screen.getByRole('textbox')
    const buttonEl = screen.getByRole('button', { name: /Buscar/i })

    userEvent.type(inputEl, 'Smith')
    userEvent.click(buttonEl)

    const cards = screen.getAllByRole('article')
    expect(cards.length).toBe(4)
  })

})
