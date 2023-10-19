const db = require("../models");
const Contacts = db.contacts;
const Phones = db.phones;
const Op = db.Sequelize.Op;

// Create phone
exports.create = (req, res) => {
    if(!req.body.name) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
    }
    const phone={
        name: req.body.name,
        number: req.body.number,
        contactId: req.params.contactId,
    }
    Phones.create(phone)
    .then(data=>{
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while adding phone number"
        });
    });
};

// Get all phones
exports.findAll = (req, res) => {
    const contactId=req.query.contactId;
    var condition=contactId?{contactId: '${contactId}' }:null;
    Phones.findAll({where: condition})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Error occurred while fetching phone numbers"
        });
    });
};

// Get one phone by id
exports.findOne = (req, res) => {
    
    Phones.findOne({where: {contactId: req.params.contactId, id: req.params.phoneId}, include: ["contacts"]})
    .then(data => {
        res.send(data);
    })

    // Phones.findByPk(req.params.phoneId, {include: ["contacts"]})
    // .then(data => {
    //     res.send(data);
    // })
    .catch(err => {
        res.status(500).send({
            message: err.message || " Contact Not Found to add phone number"
        });
    });
};

// Update one phone by id
exports.update = (req, res) => {
    const id = req.params.phoneId;
    Phones.update(req.body, {
      where: {contactId:req.params.contactId, id: id }
    })
  .then(num => {
      if(num == 1) {
        res.send({
          message: "Phone Number was updated successfully."
        });
      } else {
        res.send({
          message: "Cannot update Phone Number with id="+id
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Phone Number"
      });
    });
    
};

// Delete one phone by id
exports.delete = (req, res) => {
    const id = req.params.phoneId;
    Contacts.findByPk(req.params.contactId)
    .then(c=>{
      Phones.destroy({
          where: { id: id }
      })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Phone Number was deleted successfully!"
        });
      } else {
        res.send({
          message: "Cannot delete Phone Number!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Phone Number!"
      });
    });
  })
  .catch(err => {
    res.status(500).send({
        message: err.message || " Contact Not Found to delete phone number"
    });
});
};