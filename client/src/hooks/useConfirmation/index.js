import { useState } from "react";

export default function useConfirmation() {
  const [confirmation, setConfirmation] = useState(null);

  const closeDialog = () => setConfirmation(null);

  const confirm = (heading, message, callback = null, options = {}) => {
    const promise = new Promise((resolve, reject) => {
      const values = { reject, heading, message, options };
      if (callback) values.resolve = resolve;
      setConfirmation(values);
    });
    promise.then(
      () => {
        callback();
        closeDialog();
      },
      () => {
        closeDialog();
      }
    );
    return promise;
  };

  return { confirm, confirmation };
}
