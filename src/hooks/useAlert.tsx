import { Transition } from "@headlessui/react";
import { Alert as View } from "flowbite-react";
import { PropsWithChildren, createContext, useCallback, useContext, useState } from "react";
import { HiInformationCircle } from "react-icons/hi";

type Alert = {
  alert: (message: string) => void;
};

const AlertContext = createContext<Alert | null>(null);

export const AlertProvider = ({ children }: PropsWithChildren) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");

  const alert = useCallback((message: string) => {
    setMessage(message.toString());
    setVisible(true);
    setTimeout(() => setVisible(false), 5_000);
  }, []);

  return (
    <AlertContext.Provider value={{ alert }}>
      {children}
      <Transition
        className="fixed bottom-4 right-4 z-50"
        show={visible}
        enter="transition-transform duration-300"
        enterFrom="translate-y-10"
        enterTo="translate-y-0"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <View color="failure" icon={HiInformationCircle}>
          <p>{message}</p>
        </View>
      </Transition>
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be called within an AlertProvider");
  }
  return context;
};
