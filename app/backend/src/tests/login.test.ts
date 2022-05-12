import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import Users from '../database/models/users';
import { app } from '../app';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rotas de "/login"', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon.stub(Users, 'findOne').resolves({
      id: 1,
      username: 'Admin',
      role: 'admin',
      email: 'admin@admin.com',
      password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
    } as Users);
  });

  after (() => {
    (Users.findOne as sinon.SinonStub).restore();
  });

  describe('POST "/login" - 1) É possível efetuar login com sucesso', () => {
    it('Retorna status correto (200) e resultado esperado (objeto com chaves { id, usename, role, email } e token (string)', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: 'admin@admin.com',
        password: 'secret_admin',
      });
      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body.user).to.have.keys('id', 'username', 'role', 'email');
      expect(chaiHttpResponse.body.token).to.be.a.string;
    });
  });
  describe('POST "/login" - 2) Não é possível efetuar login, quando:', () => {
    it('E-mail informado for inválido (status: 401)', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: 'adminatadmindotcom',
        password: 'secret_sadmin',
      });
      expect(chaiHttpResponse).to.have.status(401);
      expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password');
    });
    it('Senha informada for inválida (status: 401)', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: 'admin@admin.com',
        password: 'secret_employee',
      });
      expect(chaiHttpResponse).to.have.status(401);
      expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password');
    });
    it('E-mail não é informado (status: 400)', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        password: 'secret_admin',
      });
      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
    });
    it('Senha não é informada (status: 400)', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: 'admin@admin.com',
      });
      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
    });
  });
  describe('GET "/login/validate" - 1) É possível realizar requisição com sucesso', () => {
    it('Retorna status correto (200) e role esperada', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: 'admin@admin.com',
        password: 'secret_admin',
      });
      const token = chaiHttpResponse.body.token;
      chaiHttpResponse = await chai.request(app).get('/login/validate').set('Authorization', token);
      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.be.equal('admin');
    });
  });
  describe('GET "/login/validate" - 2) Não é possível realizar requisição quando:', () => {
    it('Token não é informado (status: 401)', async () => {
      chaiHttpResponse = await chai.request(app).get('/login/validate').send();
      expect(chaiHttpResponse).to.have.status(401);
      expect(chaiHttpResponse.body.message).to.be.equal('Token not found');
    });
    it('Token informado é inválido (status: 500)', async () => {
      chaiHttpResponse = await chai.request(app).get('/login/validate').set({ authorization: 'notoken' });
      expect(chaiHttpResponse).to.have.status(500);
      expect(chaiHttpResponse.body.message).to.be.equal('jwt malformed');
    });
  });
});
