import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import Teams from '../database/models/teams';
import { app } from '../app';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota GET "/teams"', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon.stub(Teams, 'findAll').resolves([
      { id: 1, teamName: 'Avaí/Kindermann' },
      { id: 2, teamName: 'Bahia' },
      { id: 3, teamName: 'Botafogo' },
      { id: 4, teamName: 'Corinthians' },
      { id: 5, teamName: 'Cruzeiro' },
      { id: 6, teamName: 'Ferroviária' },
      { id: 7, teamName: 'Flamengo' },
      { id: 8, teamName: 'Grêmio' },
      { id: 9, teamName: 'Internacional' },
      { id: 10, teamName: 'Minas Brasília' },
      { id: 11, teamName: 'Napoli-SC' },
      { id: 12, teamName: 'Palmeiras' },
      { id: 13, teamName: 'Real Brasília' },
      { id: 14, teamName: 'Santos' },
      { id: 15, teamName: 'São José-SP' },
      { id: 16, teamName: 'São Paulo' },
    ] as Teams[]);
  });

  after(() => {
    (Teams.findAll as sinon.SinonStub).restore();
  });

  describe('1) Ao realizar requisição com sucesso:', () => {
    it('Retorna status correto (200) e resultado esperado (array de times, com id e teamName)', async () => {
      chaiHttpResponse = await chai.request(app).get('/teams');
      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.be.deep.equal([
        { id: 1, teamName: 'Avaí/Kindermann' },
        { id: 2, teamName: 'Bahia' },
        { id: 3, teamName: 'Botafogo' },
        { id: 4, teamName: 'Corinthians' },
        { id: 5, teamName: 'Cruzeiro' },
        { id: 6, teamName: 'Ferroviária' },
        { id: 7, teamName: 'Flamengo' },
        { id: 8, teamName: 'Grêmio' },
        { id: 9, teamName: 'Internacional' },
        { id: 10, teamName: 'Minas Brasília' },
        { id: 11, teamName: 'Napoli-SC' },
        { id: 12, teamName: 'Palmeiras' },
        { id: 13, teamName: 'Real Brasília' },
        { id: 14, teamName: 'Santos' },
        { id: 15, teamName: 'São José-SP' },
        { id: 16, teamName: 'São Paulo' },
      ]);
    });
  });
});
describe('Rota GET "/teams/:id"', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon.stub(Teams, 'findByPk').resolves({
      id: 16,
      teamName: 'São Paulo',
    } as Teams);
  });

  after(() => {
    (Teams.findByPk as sinon.SinonStub).restore();
  });

  describe('1)Ao realizar requisição com sucesso', () => {
    it('Retorna status correto (200) e resultado esperado (id e teamName)', async () => {
      chaiHttpResponse = await chai.request(app).get('/teams/16').send();
      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.be.deep.equal({ id: 16, teamName: 'São Paulo' });
    });
  });
  // describe('2)Não é possível realizar requisição quando:', () => {
  //   it('Time inserido não existe (status: 404)', async () => {
  //     chaiHttpResponse = await chai.request(app).get('/teams/1h5uh').send();
  //     expect(chaiHttpResponse).to.have.status(404);
  //     expect(chaiHttpResponse.body.message).to.be.equal('There is no team with such id!');
  //   });
  // });
});
