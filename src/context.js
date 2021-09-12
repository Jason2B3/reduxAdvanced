import { useState, createContext, useContext } from "react"; // import useContext
const AAA = createContext();
export const useCustomHook = () => useContext(AAA); // export custom hook

export default function BBB(props) {
  const [navGlow, setNavGlow] = useState(false);
  const enableNavGlow = () => {
    if (!navGlow) setNavGlow(true);
  };
  const distribution = { navGlow, enableNavGlow };
  return <AAA.Provider value={distribution}>{props.children}</AAA.Provider>;
}
