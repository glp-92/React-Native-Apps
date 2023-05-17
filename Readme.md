## Building a React Native APP First Time

1. [NodeJs](https://nodejs.org/en) must be installed
2. Run `npm install -g expo-cli` to install `Expo` platform. Is not official platform but simplifies some steps.
3. `expo init projectname`
4. `cd projectname`
5. To launch, `expo start`. Will ask you for ways to open the project. `w` to open web browser.
    - By scanning QR code on phone with `expo go` app on Android app can be launched directly on phone.
6. Main code is placed on `App.js`

## About React Native
- Like React, components can be created to make them reusable.
    - Props can be passed to componentes like `<Component text = "test"/>` and accesed by `{props.text}`
- `View` can be `divs` on React, and they must be imported from `react-native`
- Styles are created by using `Stylesheet` and must be imported from `react-native` too
