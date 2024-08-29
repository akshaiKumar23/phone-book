import { useRef, useState } from "react";
import ContactCard from "./components/ContactCard";
import { useDispatch, useSelector } from "react-redux";
import { addContacts, deleteContact, editContact } from "./store/slices/contactsSlice";
import ReactPaginate from "react-paginate";

function App() {
  const contacts = useSelector((state) => state.contacts);
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const contactNameRef = useRef();
  const contactNumberRef = useRef();

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentItems = contacts.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(contacts.length / itemsPerPage);


  const handleSubmit = (e) => {
    const contactName = contactNameRef.current.value;
    const contactNumber = contactNumberRef.current.value;
    e.preventDefault();
    if (isEdit) {
      const upDatedContact = {
        id: editId,
        name: contactName,
        number: contactNumber,
      };
      dispatch(editContact(upDatedContact));
      setIsEdit(false);
      setEditId(null);
    } else {
      const newContact = {
        id: Math.random().toString(),
        name: contactName,
        number: contactNumber,
      };
      dispatch(addContacts(newContact));
    }
    contactNameRef.current.value = "";
    contactNumberRef.current.value = "";
  };

  const handleDelete = (contact) => {
    dispatch(deleteContact(contact));
  };

  const handleEdit = (contact) => {
    setIsEdit(true);
    setEditId(contact.id);
    contactNameRef.current.value = contact.name;
    contactNumberRef.current.value = contact.number;
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col justify-between p-8">
      <div className="absolute top-0 left-0 m-8">
        <h2 className="text-xl font-semibold mb-4">Phone Book</h2>
        <form className="flex space-x-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="contact-name"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Contact Name
            </label>
            <input
              ref={contactNameRef}
              type="text"
              id="contact-name"
              placeholder="Enter contact name"
              className="px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label
              htmlFor="contact-number"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Contact Number
            </label>
            <input
              ref={contactNumberRef}
              type="tel"
              pattern="[0-9]{10}"
              id="contact-number"
              placeholder="Enter contact number"
              className="px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div className="flex items-end">
            {!isEdit ? (
              <button
                type="submit"
                className="py-2 px-4 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold transition duration-300"
              >
                Add Contact
              </button>
            ) : (
              <button
                type="submit"
                className="py-2 px-4 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white font-semibold transition duration-300"
              >
                Update Contact
              </button>
            )}
          </div>
        </form>
      </div>
      <div className="mt-32 flex-grow">
        {currentItems.map((contact, index) => (
          <ContactCard
            key={index}
            contactName={contact.name}
            contactNumber={contact.number}
            onDelete={() => handleDelete(contact)}
            onEdit={() => handleEdit(contact)}
          />
        ))}
      </div>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName="bg-green-400"
        className="flex justify-center space-x-2 mt-8 sticky bottom-0 bg-gray-900 py-4"
        pageClassName="px-3 py-1 rounded-lg bg-gray-800 text-white hover:bg-gray-700"
        previousClassName="px-3 py-1 rounded-lg bg-gray-800 text-white hover:bg-gray-700"
        nextClassName="px-3 py-1 rounded-lg bg-gray-800 text-white hover:bg-gray-700"

      />
    </div>
  );
}

export default App;
