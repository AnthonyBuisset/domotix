import classNames from "classnames";
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
      <View
        className={classNames("fixed bottom-4 right-4 z-50", { hidden: !visible })}
        color="failure"
        icon={HiInformationCircle}
      >
        <p>{message}</p>
      </View>
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
