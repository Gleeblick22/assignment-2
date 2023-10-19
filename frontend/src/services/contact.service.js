import api from "../api-source";

class ContactDataService {
  getAll() {
    return api.get("/contacts");
  }

  get(contactId) {
    return api.get('/contacts/'+contactId);
  }

  create(data) {
    return api.post("/contacts", data);
  }

  update(contactId, data) {
    return api.put('/contacts/'+contactId, data);
  }

  delete(contactId) {
    return api.delete('/contacts/'+contactId);
  }
}

export default new ContactDataService();