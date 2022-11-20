import {
  Button,
  createStandaloneToast,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import { TransactionStatus } from "@usedapp/core";

import theme from "@styles/theme";

interface Description {
  exceptionDesc?: string;
  pendingSignatureDesc?: string;
  miningDesc?: string;
  successDesc?: string;
  failDesc?: string;
}

export const ToastTransactionStatus = (
  state: TransactionStatus,
  description?: Description
) => {
  const { toast } = createStandaloneToast({ theme });

  const linkButton = (hash: string | undefined) => (
    <Button
      as="a"
      variant="link"
      href={`https://testnet.aurorascan.dev/tx/${hash}`}
      target="_blank"
      color="gray.600"
    >
      View on Aurora Scan
    </Button>
  );

  if (state.status === "Exception" && !toast.isActive("Exception")) {
    toast({
      id: "Exception",
      title: "Error, transaction rejected.",
      description: description?.exceptionDesc,
      // variant: "left-accent",
      status: "error",
    });
  }

  if (
    state.status === "PendingSignature" &&
    !toast.isActive("PendingSignature")
  ) {
    toast({
      id: "PendingSignature",
      title: "Pending confirmation in wallet...",
      description: description?.pendingSignatureDesc,
      // variant: "left-accent",
      status: "info",
    });
  }

  if (state.status === "Mining" && !toast.isActive("Mining")) {
    toast({
      id: "Mining",
      title: "Transaction sent, please wait for it to be mined.",
      description: linkButton(state?.transaction?.hash),
      // variant: "left-accent",
      status: "info",
    });
  }

  if (state.status === "Success" && !toast.isActive("Success")) {
    toast({
      id: "Success",
      title: "Transaction successful!",
      description: linkButton(state?.transaction?.hash),
      // variant: "left-accent",
      status: "success",
    });
  }

  if (state.status === "Fail" && !toast.isActive("Fail")) {
    toast({
      id: "Fail",
      title: "Transaction unsuccessful! Please try again.",
      description: description?.failDesc,
      // variant: "left-accent",
      status: "error",
    });
  }
};
