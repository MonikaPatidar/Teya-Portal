/*
* Imported ar language
* Imported en language
*/ 
import React from 'react'
import { propTypes } from 'react-bootstrap/esm/Image';
import {ar} from './ar';
import {en} from './en';


export const dictionaryList = { en, ar};

export const languageOptions = {
  en: 'English',
  ar: 'arabic'
};

// export const setLanguage = async (language) => {
// 	if(language){debugger
// 		await localStorage.setItem('language', language);
// 		// window.location.reload();
// 	}
// 	else{
// 		var setLanguage = localStorage.getItem('language');
// 		if(!setLanguage){
// 			var userLanguage = navigator.language;
// 			setLanguage = userLanguage.substring(0, 2);
// 			await localStorage.setItem('language', setLanguage);
// 			return language;
		
// 		}
// 	}
// 	debugger
// 	getLanguage()
// 	debugger
// }

// export const getLanguage = () => {debugger
// 	var language = localStorage.getItem('language');
// 	switch(language){
// 		case 'en':
// 		default: 
// 			language = en;
// 			break;
// 		case 'ar':
// 			language = ar;
// 			break;			
// 	}
// 	if(language){
// 		return language;
// 	}
// 	else{
// 		setLanguage();
// 	}
// }