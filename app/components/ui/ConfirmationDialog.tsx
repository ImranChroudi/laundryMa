

type ConfirmationDialogProps = {
    isOpen: boolean;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}
const ConfirmationDialog = ({ isOpen, message, onConfirm, onCancel } : ConfirmationDialogProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 transform transition-transform  bg-black/50 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 sm:m-0 mx-auto rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Confirmation</h2>
        <p className="mb-6">{message}</p>
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
