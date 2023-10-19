const db = require("../models");
const Phones = db.phones;
const Contacts = db.contacts;
const Op = db.Sequelize.Op;

// Calculate stats
exports.calculate = (req, res) => {
    // var count;
    // const run =async()=>{
    //      count= await Contacts.count({distinct: true, col: 'id'});
    //      res.send(count);
    // }
    // res.send(count);
   
    var number_of_contacts;
    var number_of_phones;
    var newest_contact_timestamp;
    var oldest_contact_timestamp;

    Contacts.findAndCountAll()
    .then(countContacts=>{
            number_of_contacts=countContacts.count;
    })
    Phones.findAndCountAll()
    .then(countPhones=>{
            number_of_phones=countPhones.count;
        
    })
    Contacts.findOne({order: [['createdAt','DESC']] })
    .then(latestContact=>{
      newest_contact_timestamp=latestContact.createdAt;
    })
    Contacts.findOne({order: [['createdAt','ASC']] })
    .then(oldestContact=>{
       oldest_contact_timestamp=oldestContact.createdAt;
       var stats={
            number_of_contacts: number_of_contacts,
            number_of_phones: number_of_phones,
            newest_contact_timestamp: newest_contact_timestamp,
            oldest_contact_timestamp: oldest_contact_timestamp,
        }
        res.send(stats); 
    })
    .catch(err => {
        res.status(500).send({
          message: err.message || "Error fetching Stats!"
        });
      });
};