import React, { useState } from "react";
import { ErrorPopUp } from "./modals/ErrorPopUp";

const App = () => {
  const [showModal, setShowModal] = useState(true);

  return (
    <div>
      {showModal && (
        <ErrorPopUp onClose={() => setShowModal(false)} />
      )}

      <h1 className="text-3xl font-bold underline text-red-500">
        certificate-verification-system
      </h1>
    </div>
  );
};

export default App;
