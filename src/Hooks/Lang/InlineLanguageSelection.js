import React, { useContext, useState } from 'react';
import { languageOptions } from '../Lang/Localization';
import { LanguageContext,Text } from '../Context/Language';

import {
	Icon
} from 'semantic-ui-react'
import {Form, Image} from 'react-bootstrap'

// export default function LanguageSelector() {
    
export default function LanguageSelector() {
    const { userLanguage, userLanguageChange,dictionary} = useContext(LanguageContext);
    // set selected language by calling context method
    const handleLanguageChange = e => userLanguageChange(e.target.value);
    var element = document.getElementById("root");
    // if(dictionary.dir==='rtl'){debugger
    //       element.classList.add("ltr-body");
    // }
    // else{
    //       element.classList.remove("ltr-body");
    // }
    return (
      <select
        onChange={handleLanguageChange}
        value={userLanguage}
      >
        {Object.entries(languageOptions).map(([id, name]) => (
          <option key={id} value={id}>{name}</option>
        ))}
      </select>
    );
  };
