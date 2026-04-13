import { toast } from "react-toastify";

export class GlobalToast {
  constructor(
    readonly message: string,
    readonly type: "success" | "error" | "info",
  ) {}

  static success(message: string) {
    return toast.success(message, {
      style: {
        background: "#2C3E3A",
        width: "fit-content",
        maxWidth: "90vw",
        minWidth: "60vw",
        margin: "8px",
        wordBreak: "break-word",
      },
    });
  }

  static error(message: string) {
    return toast.error(message, {
      style: {
        width: "fit-content",
        maxWidth: "90vw",
        minWidth: "60vw",
        margin: "8px",
        wordBreak: "break-word",
      },
    });
  }

  static info(message: string) {
    return toast.info(message, {
      style: {
        width: "fit-content",
        maxWidth: "90vw",
        minWidth: "60vw",
        margin: "8px",
        wordBreak: "break-word",
      },
    });
  }
}
