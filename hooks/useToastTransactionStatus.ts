import { ToastTransactionStatus } from "@components/Shared/ToastTransactionStatus";
import { useEffect, useState } from "react";

export const useToastTransactionStatus = (state: any) => {
  // Toast transaction states
  const [stateStatus, setStakeStatus] = useState("");
  const [prevStatus, setPreviousStatus] = useState("");

  // To prevent re-toasts when no action is taken by user.
  useEffect(() => {
    if (stateStatus !== prevStatus) {
      ToastTransactionStatus(state);
    }

    setStakeStatus((prev) => {
      setPreviousStatus(prev);
      return state.status;
    });
  }, [state, stateStatus, prevStatus]);

  const isPending =
    state.status === "Mining" || state.status === "PendingSignature";
};
