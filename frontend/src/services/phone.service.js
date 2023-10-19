import api from "../api-source";

class PhoneDataService {
  getAll(contactId) {
    return api.get('/contacts/'+contactId+'/phones');
  }

  get(contactId, phoneId) {
    return api.get('/contacts/'+contactId+'/phones/'+phoneId);
  }

  create(contactId, data) {
    return api.post('/contacts/'+contactId+'/phones', data);
  }

  update(contactId, phoneId, data) {
    return api.put('/contacts/'+contactId+'/phones/'+phoneId, data);
  }

  delete(contactId, phoneId) {
    return api.delete('/contacts/'+contactId+'/phones/'+phoneId);
  }
}

export default new ContactDataService();