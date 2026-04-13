import {toast} from "react-toastify";

export class GlobalToast {
  constructor(readonly message: string, readonly type: "success" | "error" | "info") {}

  static success(message: string) {
    return toast.success(message, {
      style: {
        background: "#2C3E3A",
        width: "fit-content",
        padding: "8px 16px",
      },
    });
  }
  static error(message: string) {
    return toast.error(message , {style : {
      width: "fit-content",
        padding: "8px 16px",
    }});
  }

  static info(message: string) {
    return toast.info(message, {
      style: {
        width: "fit-content",
        margin: "8px 16px",
      },
    });
  }
}