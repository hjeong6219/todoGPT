function Modal({ children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50">
      {children}
    </div>
  );
}

export default Modal;
