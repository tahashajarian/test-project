
import cards from "./cards-reducer";

describe('cards reducer', () => {
  it('should return the initial state', () => {
    expect(cards(undefined, {})).toEqual({})
  })

  it('should handle LIST_CARDS', () => { 
    expect(
      cards([], {
        type: 'LIST_CARDS',
        payload: {
			allCards: []
		}
      })
	).toEqual({allCards: []});
	expect(
		cards([], {
		  type: 'LIST_CARDS',
		  payload: {
			  allCards: ['one', 'tow']
		  }
		})
	  ).toEqual({allCards: ['one', 'tow']});
	  expect(
		cards({state:['one', 'tow']}, {
		  type: 'LIST_CARDS',
		  payload: {
			  allCards: []
		  }
		})
	  ).toEqual({state:['one', 'tow'], allCards: []});
  })
})

describe('cards reducer', () => {
	it('should handle LOCAL_STORAGE', () => {
	  expect(cards([], {
		type: 'LOCAL_STORAGE',
		payload: ['three', 'four']
		})).toEqual({
		  localStorage: ['three', 'four']
	  })
	})
})