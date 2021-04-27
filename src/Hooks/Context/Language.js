import React,{ createContext, useState,useContext } from 'react'
import { languageOptions, dictionaryList } from '../Lang/Localization';

// create the language context with default selected language
export const LanguageContext = createContext({
    userLanguage: 'en',
    dictionary: dictionaryList.en
  });

// it provides the language context to app
export function LanguageProvider({ children}) {
    const defaultLanguage = window.localStorage.getItem('rcml-lang');
    const [userLanguage, setUserLanguage] = useState(defaultLanguage || 'en');
    
    const userLanguageChange=(selected)=>{
        const newLanguage = languageOptions[selected] ? selected : 'en'
        setUserLanguage(newLanguage);
        window.localStorage.setItem('rcml-lang', newLanguage);
        window.location.reload()
       
    }
  
    const provider = {
      userLanguage,
      dictionary: dictionaryList[userLanguage],
      userLanguageChange,
    //   userLanguageChange: selected => {
    //     const newLanguage = languageOptions[selected] ? selected : 'en'
    //     setUserLanguage(newLanguage);
    //     window.localStorage.setItem('rcml-lang', newLanguage);
    //   }
    };

    return (
      <LanguageContext.Provider value={provider}>
        {children}
      </LanguageContext.Provider>
    );
  };

  // export function Text({ tid }) {
  //   const languageContext = useContext(LanguageContext);
  // debugger
  //   return languageContext.dictionary[tid] || tid;
  // };





// const LangProvider=createContext([{},() => {}])
// const Language=(props)=>{debugger
//     var defaultLang=localStorage.getItem("language");
//     const [CurrentLanguage, setCurrentLang]=useState(defaultLang)

//     return(<> 
//     <LangProvider.Provider value={[CurrentLanguage, setCurrentLang]}>
// 		{props.children}
// 	</LangProvider.Provider>
//     </>)
// }
// export default Language;
// export {LangProvider}