import { usePreferenceContext } from '../../contexts/preferences.context.jsx'

function PreferencesPage() {
    const { preferences: { theme }, toggleTheme } = usePreferenceContext();

    return (
        <div>
            <h3>Application Theme</h3>
            <p>Choose your preferred theme for the application</p>

            <div>
                <select name="theme" id="theme" value={theme} onChange={e => toggleTheme(e.target.value)}>
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                </select>
            </div>
        </div>
    )
}

export default PreferencesPage