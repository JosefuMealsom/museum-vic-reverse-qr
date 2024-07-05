import { ReactNode } from "react";
import { without } from "underscore";

type OnAddToastCallbackFunction = (contentId: number) => void;
type ToastCallbackDictionary = {
  id: string;
  callbackFunction: OnAddToastCallbackFunction;
};

class ToastCommunicator {
  toastCallbacks: ToastCallbackDictionary[] = [];

  addCallback(callback: OnAddToastCallbackFunction) {
    const id = crypto.randomUUID();
    this.toastCallbacks.push({
      callbackFunction: callback,
      id: id,
    });
    return id;
  }

  //   removeCallback(id: string) {
  // this.toastCallbacks = without
  //   }

  toast(contentId: number) {
    for (const t of this.toastCallbacks) {
      t.callbackFunction(contentId);
    }
  }
}

export default new ToastCommunicator();
