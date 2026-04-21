const ConfirmModal = ({ open, onClose, onConfirm, title }) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-5 rounded text-white w-80">
                <h2 className="mb-4">{title} </h2>

                <div className="flex justify-end gap-2">

                    <button onClick={onClose} className="px-3 py-1 bg-gray-600">
                        Cancel
                    </button>

                    <button onClick={onConfirm} className="px-3 py-1 bg-red-600">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;