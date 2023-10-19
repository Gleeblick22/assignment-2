const db = require("../models");
const Contacts = db.contacts;
const Phones = db.phones;
const Op = db.Sequelize.Op;

// Create contact
exports.create = (req, res) => {
    if(!req.body.name) {
        res.status(400).send({
          message: "Name can not be empty!"
        });
        return;
    }
    const contact={
        name: req.body.name,
    }
    Contacts.create(contact)
    .then(data=>{
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating contact"
        });
    });
};

// Get all contacts
exports.findAll = (req, res) => {
  // var contacts= Contacts.findAll({ attributes: { include: [[Op.fn("COUNT", Op.col("contacts.id")), "contactCount"]] }  }).then(data=>{res.send(data)});
  
  // //   res.send(contacts.contactCount);
  // // var contacts_count=Contacts.findAll();
  // // console.log(contacts_count);
  

    const name=req.query.name;
    var condition=name?{name: { [Op.iLike]:'%${name}%' }}:null;
    Contacts.findAll({where: condition
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while fetching contacts."
        });
    });
};

// Get one contact by id
exports.findOne = (req, res) => {
    Contacts.findByPk(req.params.contactId, {include: ["phones"]})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while fetching contact."
        });
    });
};

// Update one contact by id
exports.update = (req, res) => {
    const id = req.params.contactId;
    Contacts.update(req.body, {
      where: { id: id }
    })
    .then(num => {
        if(num == 1) {
          res.send({
            message: "Contact was updated successfully.",
          });
        } else {
          res.send({
            message: "Cannot update Contact with id=${id}."
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Contact"
        });
      });
};

// Delete one contact by id
exports.delete = (req, res) => {
    const id = req.params.contactId;
    Contacts.destroy({
        where: { id: id }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Contact was deleted successfully!"
        });
      } else {
        res.send({
          message: "Cannot delete Contact!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Contact"
      });
    });
};
