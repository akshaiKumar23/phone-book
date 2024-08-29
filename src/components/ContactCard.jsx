
// eslint-disable-next-line react/prop-types
const ContactCard = ({ contactName, contactNumber, onDelete, onEdit }) => {
    return (
        <div className="bg-gray-800 text-white rounded-lg p-4 flex justify-between items-center mb-4 shadow-lg">
            <div>
                <h3 className="text-lg font-semibold">

                    <span > Name: </span>{contactName}</h3>
                <p className="text-sm text-gray-400">{contactNumber}</p>
            </div>
            <div className="flex space-x-2">
                <button
                    onClick={onEdit}
                    className="py-1 px-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold transition duration-300"
                >
                    Edit
                </button>
                <button
                    onClick={onDelete}
                    className="py-1 px-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-semibold transition duration-300"
                >
                    Delete
                </button>
            </div>
        </div>
    )
}

export default ContactCard