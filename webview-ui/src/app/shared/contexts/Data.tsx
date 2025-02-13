import React, { createContext, useCallback, useState } from "react";

interface IData {
  data: string;
  func: () => void;
};

interface IDataProviderProps {
  children: React.ReactNode;
}

export const DataContext = createContext<IData>({} as IData);

export const DataProvider: React.FC<IDataProviderProps> = ({children}) => {

  const [data, setData] = useState<string>('');
  const handleFunc = () => {console.log(data)};

  // Just for exclude the no use warning
  useCallback(()=>{
    setData('')
  },[]);

  return(
    <DataContext.Provider value={{data:"", func:handleFunc}}>
      {children}
    </DataContext.Provider>
  )
}