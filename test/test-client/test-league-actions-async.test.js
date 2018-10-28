/* eslint-disable no-unused-vars, no-undef */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import nock from 'nock';

import {
	setLeagueSuccess,
	selectLeague
} from '../../flow/subActions/userActions.js';

const middlewares = [thunk],
	mockStore = configureMockStore(middlewares),
	{
		testCurrentUser,
		fantasyLeagueId,
		fantasyLeagueName
	} = require('../common.js');

describe('League Setting Actions', () => {
	describe('set league sync action', () => {
		it('sets a league and dispatches the league id and name', () => {
			const expectedAction = {
				type: 'SET_LEAGUE_SUCCESS',
				fantasyLeagueId,
				fantasyLeagueName,
				statusCode: 200
			};

			expect(setLeagueSuccess(fantasyLeagueId, fantasyLeagueName, 200)).toEqual(
				expectedAction
			);
		});
	});

	describe('selectLeague async action', () => {
		it('should add league id and name to store', () => {
			const leagueNock = nock(
					'https://fantasy-soccer-leagues-jstrother.c9users.io',
					{
						reqheaders: {
							Authorization: `Bearer ${testCurrentUser.accessToken}`
						}
					}
				)
					.put('/user/selectLeague')
					.reply(200, function(uri, body) {
						return body;
					}),
				store = mockStore({ testCurrentUser });

			return store
				.dispatch(
					selectLeague(
						testCurrentUser.accessToken,
						fantasyLeagueId,
						fantasyLeagueName
					)
				)
				.then((fantasyLeagueId, fantasyLeagueName) => {
					expect(store.getState()).toHaveProperty(
						'fantasyLeagueId',
						fantasyLeagueId
					);
					expect(store.getState()).toHaveProperty(
						'fantasyLeagueName',
						fantasyLeagueName
					);
				});
		});
	});
});
