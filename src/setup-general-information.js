const appGeneralInfo = {
    appName: 'English Macchiato',
    appSlogan: 'Drink Your English Macchiato Now!',
    baseUrl: 'http://localhost:3000/',
    mainMenuItems: {
        homePage: 'homepage',
        languageLevel: 'languagelevel',
        mockTests: 'mocktests',
        vocabPractice: 'vocabpractice',
        listeningPractice: 'listeningpractice',
        readingPractice: 'readingpractice',
        writingPractice: 'writingpractice',
        speakingPractice: 'speakingpractice',
        slangPractice: 'slangpractice',
        reports: 'reports',
        account: 'account',
        wallet: 'wallet',
        messages: 'messages',
        about: 'about'
    },
    views: {
        sigin: 'signin',
        signup: 'signup',
        forgotPassword: 'forgotpassword',
        globalMessage: 'globalmessage',
        register: 'register',
        checkUserInformation: 'checkuserinformation',
        termOfUse: 'termofuse',
        aboutPersian: 'about_persian',
        aboutEnglish: 'about_english'
    },
    transactions: {
        functionalTransactions: {
            languageLevel: 'ftrn-1',
            mockTests: 'ftrn-2',
            vocabPractice: 'ftrn-3',
            listeningPractice: 'ftrn-4',
            readingPractice: 'ftrn-5',
            writingPractice: 'ftrn-6',
            speakingPractice: 'ftrn-7',
            slangPractice: 'ftrn-8',
        }
    }
}

module.exports.appGeneralInfo = appGeneralInfo;