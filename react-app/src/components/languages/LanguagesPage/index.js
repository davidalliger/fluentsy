import { useLocation } from "react-router-dom";
import {useState} from 'react';
import './LanguagesPage.css'
import AddNativeLanguageModal from "../AddLanguage/AddNativeLanguage/AddNativeLanguageModal";
import { useSelector } from "react-redux";

const LanguagesPage = () => {
    const location = useLocation();
    const languages = useSelector(state => state.languages)
    const { userProfile } = location.state;
    const nativeLanguages = userProfile.languages.filter(language => language.native && !language.primary);
    const targetLanguages = userProfile.languages.filter(language => !language.native && !language.primary);
    const primaryNativeLanguage = userProfile.languages.filter(language => language.native && language.primary)[0];
    const primaryTargetLanguage = userProfile.languages.filter(language => !language.native && language.primary)[0];
    const [primaryNative, setPrimaryNative] = useState(primaryNativeLanguage.name);
    const [primaryTarget, setPrimaryTarget] = useState(primaryTargetLanguage.name);
    const [showAddNativeLanguageModal, setShowAddNativeLanguageModal] = useState(false);

    const handlePrimaryNative = () => {

    }

    const handlePrimaryTarget = () => {

    }

    return (
        <div id='languages-page'>
            <div id='languages-page-card'>
                <div id='languages-page-native-languages'>
                    <h2 className='languages-page-title'>My Native Languages</h2>
                    <p className='languages-page-description'>I grew up speaking these every day.</p>
                    <div className='languages-page-lower'>
                        <div id='languages-page-native-grid'>
                            <div className='languages-page-native-row'>
                                <div className='languages-page-grid-title'>
                                    Language
                                </div>
                                <div className='languages-page-grid-title'>
                                    Primary
                                </div>
                                <div></div>
                                <div className='languages-page-grid-hidden-title'></div>
                                <div className='languages-page-grid-hidden-title'></div>
                            </div>
                            <div className='languages-page-native-row'>
                                <div className='languages-page-native-name'>
                                    {primaryNativeLanguage.name}
                                </div>
                                <div className='languages-page-native-primary'>
                                    <input
                                        // className='languages-page-radio'
                                        type='radio'
                                        name='primary-native'
                                        checked={primaryNative === primaryNativeLanguage.name}
                                        onChange={handlePrimaryNative}
                                        value={primaryNative}
                                    />
                                </div>
                                <div></div>
                                <div className='languages-page-native-edit'>
                                    <i className="fa-solid fa-pen"></i>
                                </div>
                                <div className='languages-page-native-delete'>
                                    <i className="fa-solid fa-trash-can"></i>
                                </div>
                            </div>
                            {nativeLanguages.map((language, index) => (
                                <div className='languages-page-native-row' key={index}>
                                    <div className='languages-page-native-name'>
                                        {language.name}
                                    </div>
                                    <div className='languages-page-native-primary'>
                                    </div>
                                    <div className='languages-page-native-edit'>
                                        {/* button */}
                                    </div>
                                    <div className='languages-page-native-delete'>
                                        {/* button */}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div>
                            <button
                                className='languages-page-add-button'
                                onClick={() => setShowAddNativeLanguageModal(true)}
                            >
                                Add Language
                            </button>
                            <AddNativeLanguageModal setShowAddNativeLanguageModal={setShowAddNativeLanguageModal} showAddNativeLanguageModal={showAddNativeLanguageModal} userProfile={userProfile} />
                        </div>
                    </div>
                </div>
                <div id='languages-page-target-languages'>
                    <h2 className='languages-page-title'>My Target Languages</h2>
                    <p className='languages-page-description'>I'm still learning these.</p>
                    <div className='languages-page-lower'>
                        <div id='languages-page-target-grid'>
                            <div className='languages-page-target-row'>
                                <div className='languages-page-grid-title'>
                                    Language
                                </div>
                                <div className='languages-page-grid-title'>
                                    Level
                                </div>
                                <div className='languages-page-grid-title'>
                                    Primary
                                </div>
                                <div></div>
                                <div className='languages-page-grid-hidden-title'></div>
                                <div className='languages-page-grid-hidden-title'></div>
                            </div>
                            <div className='languages-page-target-row'>
                                <div className='languages-page-target-name'>
                                    {primaryTargetLanguage.name}
                                </div>
                                <div className='languages-page-target-level'>
                                    {primaryTargetLanguage.level}
                                </div>
                                <div className='languages-page-target-primary'>
                                    <input
                                        // className='languages-page-radio'
                                        type='radio'
                                        name='primary-target'
                                        checked={primaryTarget === primaryTargetLanguage.name}
                                        onChange={handlePrimaryTarget}
                                        value={primaryTarget}
                                    />
                                </div>
                                <div></div>
                                <div className='languages-page-target-edit'>
                                    <i className="fa-solid fa-pen"></i>
                                </div>
                                <div className='languages-page-target-delete'>
                                    <i className="fa-solid fa-trash-can"></i>
                                </div>
                            </div>
                            {targetLanguages.map((language, index) => (
                                <div className='languages-page-target-row' key={index}>
                                    <div className='languages-page-target-name'>
                                    {language.name}
                                </div>
                                <div className='languages-page-target-primary'>
                                    {/* radio button */}
                                </div>
                                <div className='languages-page-target-edit'>
                                    {/* button */}
                                </div>
                                <div className='languages-page-target-delete'>
                                    {/* button */}
                                </div>
                                </div>
                            ))}
                        </div>
                        <div>
                            <button className='languages-page-add-button'>Add Language</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LanguagesPage;
