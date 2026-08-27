import { useReducer } from 'react';
import { defaultCVData, defaultCustomization, defaultSectionVisibility } from '../data/defaults';

const initialState = {
  cvData: defaultCVData,
  customization: defaultCustomization,
  sectionVisibility: defaultSectionVisibility,
};

function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE_FIELD': {
      const { section, id, field, value } = action;
      const newData = { ...state.cvData };
      if (section === 'personalInfo') newData.personalInfo = { ...newData.personalInfo, [field]: value };
      else if (section === 'summary') newData.summary = value;
      else if (['workExperience','education','skills','languages','certifications','projects','volunteer','awards','interests','references'].includes(section)) {
        newData[section] = newData[section].map(item => item.id === id ? { ...item, [field]: value } : item);
      }
      return { ...state, cvData: newData };
    }
    case 'ADD_ITEM':
      return { ...state, cvData: { ...state.cvData, [action.section]: [...state.cvData[action.section], action.item] } };
    case 'REMOVE_ITEM':
      return { ...state, cvData: { ...state.cvData, [action.section]: state.cvData[action.section].filter(item => item.id !== action.id) } };
    case 'UPDATE_BULLET': {
      const { section, id, bulletIndex, value } = action;
      const updated = state.cvData[section].map(item => item.id === id ? { ...item, bullets: item.bullets.map((b,i) => i === bulletIndex ? value : b) } : item);
      return { ...state, cvData: { ...state.cvData, [section]: updated } };
    }
    case 'ADD_BULLET':
      return { ...state, cvData: { ...state.cvData, [action.section]: state.cvData[action.section].map(item => item.id === action.id ? { ...item, bullets: [...item.bullets, ''] } : item) } };
    case 'REMOVE_BULLET':
      return { ...state, cvData: { ...state.cvData, [action.section]: state.cvData[action.section].map(item => item.id === action.id ? { ...item, bullets: item.bullets.filter((_,i) => i !== action.bulletIndex) } : item) } };
    case 'SET_CV_DATA':
      return { ...state, cvData: action.cvData };
    case 'SET_CUSTOMIZATION':
      return { ...state, customization: action.customization };
    case 'SET_SECTION_VISIBILITY':
      return { ...state, sectionVisibility: action.sectionVisibility };
    case 'TOGGLE_SECTION_VISIBILITY':
      return { ...state, sectionVisibility: { ...state.sectionVisibility, [action.key]: !state.sectionVisibility[action.key] } };
    case 'RESET':
      return { ...initialState };
    default:
      return state;
  }
}

export default function useCvReducer() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return { state, dispatch };
}
