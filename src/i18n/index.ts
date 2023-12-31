import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './locale/en.json';
import zhTranslation from './locale/zh.json';
import vnTranslation from './locale/vn.json';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)

const resources = {
	en_US: {
		translation: enTranslation,
	},
	zh_CN: {
		translation: zhTranslation,
	},
	VN: {
		translation: vnTranslation,
	}
};
i18n.use(initReactI18next) // passes i18n down to react-i18next
	.init({
		resources,
		lng: localStorage.getItem('lang') || 'en_US', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
		// you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
		// if you're using a language detector, do not define the lng option
		fallbackLng: 'en_US',
		interpolation: {
			escapeValue: false, // react already safes from xss
		},
		debug: false,
	});

export default i18n;
